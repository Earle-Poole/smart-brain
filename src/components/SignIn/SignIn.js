import React from 'react';

class SignIn extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            signInEmail: '',
            signInPassword: '',
        }
    }

    onEmailChange = (event) => {
        this.setState({signInEmail: event.target.value})
    }
    
    onPasswordChange = (event) => {
        this.setState({signInPassword: event.target.value})
    }

    onSubmitSignIn = () => {
        fetch('https://stormy-peak-63661.herokuapp.com/signin', {
            method: 'post',
            headers: {'Content-Type': 'application/json'},
            body: JSON.stringify({
                email: this.state.signInEmail,
                password: this.state.signInPassword
            })
        })
            .then(response => response.json())
            .then(user => {
                if (user.id){
                    this.props.loadUser(user)
                    this.props.onRouteChange('home')
            }
        })
    }

    

    render() {
        const { onRouteChange } = this.props;
        return (
            <article className="br3 ba mv4 w-100 w-50-m w-25-l mw6 shadow-5 center moon-gray b--moon-gray">
                <main className="pa4">
                    <div className="measure">
                        <fieldset id="sign_up" className="ba b--transparent ph0 mh0">
                        <legend className="f1 ph0 mh0 center ">Sign In</legend>
                        <div className="mt3">
                            <label className="db lh-copy f4" htmlFor="email-address">Email</label>
                            <input 
                                className="pa2 br3 input-reset ba b--moon-gray moon-gray bg-transparent w-100" 
                                type="email" 
                                name="email-address"  
                                id="email-address"
                                onChange={this.onEmailChange}
                                />
                        </div>
                        <div className="mv3">
                            <label className="db lh-copy f4" htmlFor="password">Password</label>
                            <input 
                                className="pa2 br3 input-reset ba b--moon-gray moon-gray bg-transparent w-100" 
                                type="password" 
                                name="password"  
                                id="password"
                                onChange={this.onPasswordChange}
                                onSubmit={this.onSubmitSignIn}
                                />
                        </div>
                        </fieldset>
                        <div className="">
                        <input 
                            onClick={this.onSubmitSignIn}
                            className="ph3 br3 pv2 input-reset ba bg-transparent grow pointer f4 dib moon-gray"
                            type="submit" 
                            value="Sign in"
                            />
                        </div>
                        <div className="lh-copy mt3">
                        <p onClick={() => onRouteChange('register')} className="f4 pointer link grow db">Register</p>
                        </div>
                    </div>
                </main>
            </article>
        );
    }
}
export default SignIn;