import Navbar from '../components/Navbar';
import { Auth } from "aws-amplify";
import React, { Component } from 'react';

class Register extends Component {
  state = {
    name: "",
    username: "",
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
    const { name, username, email, password } = this.state;
    try {
      const signUpResponse = await Auth.signUp({
        name,
        username,
        password
      });
      console.log(signUpResponse);

      /*
      // insert user into database
      const name = this.state.name.split(" ");
      const data = {
        User_ID: user.attributes.sub, Email: user.attributes.email,
        F_Name: name[0], L_Name: name[1]
      };
      fetch("http://localhost:3000/api/users/create/adduser", {
        method: "POST",
        headers: {
        "Content-Type": "application/json",
        },
        body: JSON.stringify(data)
      })
      .then((response) => response.json())
      .then((data) => {
        console.log("Success: ", data);
      })
      .catch((error) => {
        console.error("Error: ", error);
      });

    }
    */

    } catch (err) {
        console.log('error resending code: ', err);
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
                  placeholder="Enter email"
                  value={this.state.username}
                  onChange={this.onInputChange}
                />
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
}

export default Register;