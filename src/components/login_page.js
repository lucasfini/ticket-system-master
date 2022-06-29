
import React, { Component, useState } from "react";
import axios from "axios";

import { useNavigate } from "react-router-dom";

const roles = ["Admin", "Project Manager", "Developer", "Other"];

export default class CreateUser extends Component {
  constructor(props) {
    super(props);

    
    this.onChangeEmail = this.onChangeEmail.bind(this);
    this.onSubmit = this.onSubmit.bind(this);
    this.onChangePassword = this.onChangePassword.bind(this);


    this.state = {  
      email: "",
      password: "",
   
    };
  }

 

  onChangeEmail(e) {
    this.setState({
      email: e.target.value,
    });
  }

 

  onChangePassword(e) {
    this.setState({
      password: e.target.value,
    });
  }


  onSubmit(e) {
    e.preventDefault();
    let emailError ="";


    const user = {

      email: this.state.email,
      password: this.state.password,
    };

    if(this.state.email.includes('msu.mcmaster.ca' || this.state.email.endsWith('msu.mcmaster.ca')) === false){
    emailError = "Email Field Must End in @msu.mcmaster.ca ";
    } 
    if(emailError){
        this.setState({emailError});
        return false;
        }
 

    axios
      .post("http://localhost:8080/login", 
        user,
      )
      .then(function (res) {
          console.log(res.data.data);
        localStorage.setItem("token",res.data);
 



        window.location = "/";
        
      })
      .catch(function (error) {
     
        if (
          error.response &&
          error.response.status >= 400 &&
          error.response.status <= 500
        ) {
        console.log( error.message);
        }
      })
      
    // clear form
    this.setState({
      email: "",
      password: "",
    });

return true;
  }

  render() {
    return (
      <div>
        
        <div className="container">
        <h3>Login To View Tickets</h3>
        <form onSubmit={this.onSubmit}>
        
          <div className="form-group">
            <label>Email: </label>
            <input
              type="email"
              name="Email"
              autoComplete="username"
              className="form-control"
              value={this.state.email}
              onChange={this.onChangeEmail}
              required
            />
          </div>
          <span className=" text-danger">{this.state.emailError}</span>
          <div className="form-group">
            <label>Password: </label>
            <input
              type="password"
              name="Password"
              autoComplete="current-password"
              className="form-control"
              value={this.state.password}
              onChange={this.onChangePassword}
              required
            />
            <p>8 characters or more. 1 upercase, symbol, and number are required.</p>
          </div>


          <div className="form-group">
            <input
              type="submit"
              value="Sign In"
              className="btn btn-primary"
            />
          </div>
        </form>
      </div>
      </div>
    );
  }
}
