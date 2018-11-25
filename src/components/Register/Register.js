import React from 'react';

class Register extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            name: '',
            email: '',
            password: '',
        }
    }
    onNameChange = (event) => {
        this.setState({name: event.target.value})
    }
    onEmailChange = (event) => {
        this.setState({email: event.target.value})
    }
    onPasswordChange = (event) => {
        this.setState({password: event.target.value})
    }

    onSubmitSignIn = () => {
        fetch('https://stormy-peak-63661.herokuapp.com/register', {
            method: 'post',
            headers: {'Content-Type': 'application/json'},
            body: JSON.stringify({
                name: this.state.name,
                email: this.state.email,
                password: this.state.password
            })
        })
            .then(response => response.json())
            .then(user => {
                if (user.id){
                    this.props.loadUser(user);
                    this.props.onRouteChange('home')
            }
        })
    }

    render() {
        return (
            <article className="br3 ba mv4 w-100 w-50-m w-25-l mw6 shadow-5 center moon-gray b--moon-gray">
                <main className="pa4">
                    <div className="measure">
                        <fieldset id="sign_up" className="ba b--transparent ph0 mh0">
                            <legend className="f1 fw6 ph0 mh0 center">Register</legend>
                            <div className="mt3">
                                <label className="db lh-copy f4" htmlFor="name">Name</label>
                                <input 
                                className="pa2 br3 input-reset ba bg-transparent hover-white w-100" 
                                type="text" 
                                name="name"  
                                id="name" 
                                onChange={this.onNameChange}
                                />
                            </div>
                            <div className="mt3">
                                <label className="db lh-copy f4" htmlFor="email-address">Email</label>
                                <input 
                                className="pa2 br3 input-reset ba bg-transparent hover-white w-100" 
                                type="email" 
                                name="email-address"  
                                id="email-address" 
                                onChange={this.onEmailChange}
                                />
                            </div>
                            <div className="mv3">
                                <label className="db lh-copy f4" htmlFor="password">Password</label>
                                <input 
                                className="b br3 pa2 input-reset ba bg-transparent hover-white w-100" 
                                type="password" 
                                name="password"  
                                id="password" 
                                onChange={this.onPasswordChange}
                                />
                            </div>
                        </fieldset>
                        <div>
                            <input 
                                onClick={this.onSubmitSignIn}
                                className="b br3 pointer ph3 pv2 input-reset ba bg-transparent grow pointer f5 dib moon-gray" 
                                type="submit" 
                                value="Register"
                                />
                        </div>
                    </div>
                </main>
            </article>

        );
    }
}

export default Register;