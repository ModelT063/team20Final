import Navbar from '../components/Navbar';
import { Auth } from 'aws-amplify';
import React, { Component } from 'react';

class Register extends Component {
    state = {
        username: "",
        email: "",
        password: "",
        confirmpassword: "",
        errors: {
          cognito: null,
          blankfield: false,
          passwordmatch: false
        }
    }

    handleSubmit = async event => {
        event.preventDefault();
    
        // AWS Cognito integration here
        const { email, password } = this.state; //username
        try {
          const signUpResponse = await Auth.signUp({
            username,
            password,
            attributes: {
              email: email
            }
          });
          console.log(signUpResponse);
        } catch (error) {
            console.log('error signing up:', error);
        }
    }

    onInputChange = event => {
        this.setState({
          [event.target.id]: event.target.value
        });
        //document.getElementById(event.target.id).classList.remove("is-danger");
    }

    render() {
        return (
          <section className="section auth">
            <div className="container">
              <h1>Register</h1>
    
              <form onSubmit={this.handleSubmit}>
                
                <div className="field">
                   <p className="control">
                    <input 
                      className="input" 
                      type="text"
                      id="username"
                      aria-describedby="userNameHelp"
                      placeholder="Enter username"
                      value={this.state.username}
                      onChange={this.onInputChange}
                    />
                  </p>
                </div>
                
                <div className="field">
                  <p className="control has-icons-left has-icons-right">
                    <input 
                      className="input" 
                      type="email"
                      id="email"
                      aria-describedby="emailHelp"
                      placeholder="Enter email"
                      value={this.state.email}
                      onChange={this.onInputChange}
                    />
                    <span className="icon is-small is-left">
                      <i className="fas fa-envelope"></i>
                    </span>
                  </p>
                </div>
                <div className="field">
                  <p className="control has-icons-left">
                    <input 
                      className="input" 
                      type="password"
                      id="password"
                      placeholder="Password"
                      value={this.state.password}
                      onChange={this.onInputChange}
                    />
                    <span className="icon is-small is-left">
                      <i className="fas fa-lock"></i>
                    </span>
                  </p>
                </div>
                <div className="field">
                  <p className="control has-icons-left">
                    <input 
                      className="input" 
                      type="password"
                      id="confirmpassword"
                      placeholder="Confirm password"
                      value={this.state.confirmpassword}
                      onChange={this.onInputChange}
                    />
                    <span className="icon is-small is-left">
                      <i className="fas fa-lock"></i>
                    </span>
                  </p>
                </div>
                <div className="field">
                  <p className="control">
                    <a href="/forgotpassword">Forgot password?</a>
                  </p>
                </div>
                <div className="field">
                  <p className="control">
                    <button className="button is-success">
                      Register
                    </button>
                  </p>
                </div>
              </form>
            </div>
          </section>
        );
    }
};

export default Register;


/*export default function Account() {
    return (
        <>
        <div>
            <Navbar/>
        </div>
        <h1>Create Account</h1>
        <button onClick={signUp}>Sign Up</button>
        
        </>
    );
}*/