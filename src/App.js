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
// import FoodDetection from './components/FoodDetection/FoodDetection.js';
import './App.css';
import FoodDetection from './components/FoodDetection/FoodDetection';

/* TO DO LIST
  DONE ***Add additional APIs and the selecting drop-down box DONE
***Have the facerecognition component iterate over multiple faces
    being given back from Clarifai API
  DONE ***Make page scroll down when detect button pressed DONE
  DONE ***Change register component font colors DONE
  DONE ***Add Social Media and contact information DONE
  DONE ***Make the rank counter only increment upon finding a face DONE
  DONE ***Make General Model give back top 3 responses DONE
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
      }
    },
    modes: {
      bubble: {
        distance: 250,
        duration: 2,
        size: 1,
        opacity: 0,
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
    name: [],
    accuracy: [],
    displayNameAcc: 0
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
    var name = [];
    var accuracy = [];
    var clarifaiResponse = data.outputs[0].data.concepts

    for(let i = 0; i < 4; i++){
      name.push(clarifaiResponse[i].name);
      accuracy.push((clarifaiResponse[i].value * 100).toFixed(2));
    }

    return {
      name,
      accuracy,
      displayNameAcc: 1
    }
  }

  interpretFoodModelResponse = (data) => {
    var name = [];
    var accuracy = [];
    var clarifaiResponse = data.outputs[0].data.concepts

    for(let i = 0; i < 5; i++){
      name.push(clarifaiResponse[i].name);
      accuracy.push((clarifaiResponse[i].value * 100).toFixed(2));
    }

    return {
      name,
      accuracy,
      displayNameAcc: 2
    }
  }

  displayFaceBox = (box) => {
    this.setState({box: box})
  }

  onInputChange = (event) => {
    this.setState({input: event.target.value});
  }

  onDisplayNameAcc = (nameAcc) => {
    this.setState({model: nameAcc})
  }

  onButtonSubmit = () => {
    if(document.getElementById('generalModel').selected){
      this.onButtonGMSubmit();
    } else if (document.getElementById('faceDetection').selected){
      this.onButtonFDSubmit();
    } else if (document.getElementById('foodDetection').selected){
      this.onButtonFoodDSubmit();
    }
  }

  onButtonFDSubmit = () => {
    this.setState({
      imageUrl: this.state.input,
      model: {displayNameAcc: 0, name: [], accuracy: []},
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
        }
      })
      .catch(err => console.log(err));
  }

  onButtonGMSubmit = () => {
    this.setState({
      imageUrl: this.state.input,
      model: {displayNameAcc: 0, name: [], accuracy: []},
      box: {}
    })
      fetch('https://stormy-peak-63661.herokuapp.com/generalmodelurl', {
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
        this.onDisplayNameAcc(this.interpretGeneralModelResponse(response))
        }
      })
      .catch(err => console.log('Sorry, I could not recognize this image. \n', err));
  }

  onButtonFoodDSubmit = () => {
    this.setState({
      imageUrl: this.state.input,
      model: {displayNameAcc: 0, name: [], accuracy: []},
      box: {}
    })
      fetch('https://stormy-peak-63661.herokuapp.com/fooddetectionurl', {
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
        this.onDisplayNameAcc(this.interpretFoodModelResponse(response))
        }
      })
      .catch(err => console.log('Sorry, I could not recognize this image. \n', err));
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
            <FaceRecognition 
            box={box} 
            imageUrl={imageUrl} 
            />
            <GeneralModel 
            name={model.name} 
            accuracy={model.accuracy}
            imageUrl={imageUrl}
            displayNameAcc={model.displayNameAcc}
            />
            <FoodDetection
            name={model.name}
            accuracy={model.accuracy}
            imageUrl={imageUrl}
            displayNameAcc={model.displayNameAcc}
            />
            </div>
          : (
            route === 'signin' 
            ? <div>
              <SignIn 
              loadUser={this.loadUser} 
              onRouteChange={this.onRouteChange}/>
              </div>
            : <div>
              <Register 
              loadUser={this.loadUser} 
              onRouteChange={this.onRouteChange}
              />
              </div>
            )
        }
      <SocialMediaTags />
      </div>
    );
  }
}

export default App;
