import React, { Component } from 'react';
import Navigation from './components/Navigation/Navigation';
import FaceRecognition from './components/FaceRecognition/FaceRecognition';
import Logo from './components/Logo/Logo';
import SignIn from './components/SignIn/SignIn';
import Register from './components/Register/Register';
import ImageLinkForm from './components/ImageLinkForm/ImageLinkForm';
import Rank from './components/Rank/Rank';
import SocialMediaTags from './components/SocialMediaTags/SocialMediaTags';
import Particles from 'react-particles-js';
import GeneralModel from './components/GeneralModel/GeneralModel';
import './App.css';

/* TO DO LIST
***Add additional APIs and the selecting drop-down box
  -Different handlings of outputs from different API calls
***Have the facerecognition component iterate over multiple faces
  being given back from Clarifai API
***Make page scroll down when detect button pressed
  DONE ***Change register component font colors DONE
  DONE ***Add Social Media and contact information DONE
  DONE ***Make the rank counter only increment upon finding a face DONE
*/

const particlesOptions = {
  particles: {
    color:{
      value: "#cacaca"
    },
    number:{
      value: 80,
      density: {
        enable: true,
        value_area:500,
      }
    },
    size: {
      value: 0.5
    },
    line_linked: {
      enable: true,
      opacity: 0.5,
      color: "#acacac"
    }
  },
  interactivity: {
    detect_on: "window",
    events: {
      onhover: {
        enable: true,
        mode: "bubble"
      },
      onclick: {
        enable: true,
        mode: "repulse"
      }
    },
    modes: {
      bubble: {
        distance: 250,
        duration: 2,
        size: 1,
        opacity: 0,
      },
      repulse: {
        distance: 200,
        duration: 1
      }
    }
  }
}

const initialState = {
  input: '',
  imageUrl: '',
  box: {},
  route: 'signin',
  isSignedIn: false,
  user: {
    id: '',
    name: '',
    email: '',
    entries: 0,
    joined: ''      
  },
  model: {
    name: '',
    accuracy: ''
  } 
}

class App extends Component {
  constructor() {
    super();
    this.state = initialState;
  }

  loadUser = (data) => {
    this.setState({user: {
      id: data.id,
      name: data.name,
      email: data.email,
      entries: data.entries,
      joined: data.joined 
    }})
  }

  calculateFaceLocation = (data) => {
    const clarifaiFace = data.outputs[0].data.regions[0].region_info.bounding_box;
    const image = document.getElementById('inputimage');
    const width = Number(image.width);
    const height = Number(image.height);
    return {
      leftCol: clarifaiFace.left_col * width,
      topRow: clarifaiFace.top_row * height,
      rightCol: width - (clarifaiFace.right_col * width),
      bottomRow: height - (clarifaiFace.bottom_row * height),
    }
  }

  interpretGeneralModelResponse = (data) => {
    const clarifaiResponse = data.outputs[0].data.concepts;
    this.setState({model: {
      name: clarifaiResponse.name,
      accuracy: clarifaiResponse.value
    }})
    return {
        name: clarifaiResponse.name,
        accuracy: clarifaiResponse.value
    }
  }

  displayFaceBox = (box) => {
    this.setState({box: box})
  }

  onInputChange = (event) => {
    this.setState({input: event.target.value});
  }

  onButtonSubmit = () => {
    this.setState({
      imageUrl: this.state.input,
      box: {}
    });
      fetch('https://stormy-peak-63661.herokuapp.com/imageurl', {
        method: 'post',
        headers: {'Content-Type': 'application/json'},
        body: JSON.stringify({
            input: this.state.input
        })
      })
      .then(response => response.json())
      .then(response => {
        if (response) {
          fetch('https://stormy-peak-63661.herokuapp.com/image', {
            method: 'put',
            headers: {'Content-Type': 'application/json'},
            body: JSON.stringify({
                id: this.state.user.id
            })
          })
            .then(response => response.json())
            .then(count => {
              this.setState(Object.assign(this.state.user, { entries: count }))
            })
            .catch(console.log)
        this.displayFaceBox(this.calculateFaceLocation(response))
        this.interpretGeneralModelResponse(response)
        }
      })
      .catch(err => console.log(err));
  }

  onRouteChange = (route) => {
    if(route === 'signout'){
        this.setState(initialState)
    } else if (route === 'home'){
      this.setState({isSignedIn: true})
    }
    this.setState({route: route})

  }

  render() {
    const { isSignedIn, imageUrl, route, box, model } = this.state;
    return (
      <div className="App">
        <Particles className='particles'
          params={particlesOptions}
        />
        <Navigation 
          isSignedIn={isSignedIn} 
          onRouteChange={this.onRouteChange}
          />
        { route === 'home' 
          ? <div>
          <Logo />
          <Rank 
          name={this.state.user.name} 
          entries={this.state.user.entries}
          />
          <ImageLinkForm 
          onInputChange={this.onInputChange} 
          onButtonSubmit={this.onButtonSubmit}
          />
          <FaceRecognition box={box} imageUrl={imageUrl} />
          <GeneralModel name={model.name} accuracy={model.value} />
        </div>
          : (
            route === 'signin' 
            ? <SignIn loadUser={this.loadUser} onRouteChange={this.onRouteChange}/>
            : <Register 
            loadUser={this.loadUser} 
            onRouteChange={this.onRouteChange}
            />
          )
    }
      <SocialMediaTags />
      </div>
    );
  }
}

export default App;
