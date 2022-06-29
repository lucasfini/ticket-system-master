import React, { Component, useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";

const roles = ["Admin", "Project Manager", "Developer", "Other"];

export default class CreateUser extends Component {
  constructor(props) {
    super(props);

    this.onChangeName = this.onChangeName.bind(this);
    this.onChangeEmail = this.onChangeEmail.bind(this);
    this.onChangeRole = this.onChangeRole.bind(this);
    this.onSubmit = this.onSubmit.bind(this);
    this.onChangePassword = this.onChangePassword.bind(this);

    this.state = {
      name: "",
      email: "",
      role: "",
      password: "",
      error: "",
      show: false,
    };
  }

  componentDidMount() {
    // set default values for state properties
    this.setState({
      role: roles[0],
    });
  }

  onChangeName(e) {
    this.setState({
      name: e.target.value,
    });
  }

  onChangeEmail(e) {
    this.setState({
      email: e.target.value,
    });
  }

  onChangeRole(e) {
    this.setState({
      role: e.target.value,
    });
  }

  onChangePassword(e) {
    this.setState({
      password: e.target.value,
    });
  }

  onSubmit(e) {
    e.preventDefault();
    let emailError = "";

    const user = {
      name: this.state.name,
      email: this.state.email,
      role: this.state.role,
      password: this.state.password,
    };

    if (
      this.state.email.includes(
        "msu.mcmaster.ca" || this.state.email.endsWith("msu.mcmaster.ca")
      ) === false
    ) {
      emailError = "Email Field Must End in @msu.mcmaster.ca ";
    }
    if (emailError) {
      this.setState({ emailError });
      return false;
    }

    axios
      .post("http://localhost:8080/users/create", user)
      .then(function (res) {
        console.log(res.data);
      })
      .catch(function (error) {
        if (
          error.response &&
          error.response.status >= 400 &&
          error.response.status <= 500
        ) {
          console.log("HI" + error.message);
        }
      });

    // clear form
    this.setState({
      name: "",
      email: "",
      role: "",
      password: "",
    });

    return true;
  }

  render() {
    return (
      <div className="container">
        <h3>Create New User</h3>
        <form onSubmit={this.onSubmit}>
          <div className="row">
            <div className="col-6">
              <label>Name: </label>
              <input
                type="text"
                name="name"
                className="form-control"
                value={this.state.name}
                onChange={this.onChangeName}
                required
              />
            </div>
            <div className="col-6">
              <label>Email: </label>
              <input
                type="email"
                name="email"
                autoComplete="username"
                className="form-control"
                value={this.state.email}
                onChange={this.onChangeEmail}
                required
              />
                   <span className=" text-danger">{this.state.emailError}</span>
            </div>
       
          </div>
       
          <div className="row">
            <div className="col-6">
            <label>Role: </label>
            <select
              className="form-control"
              name="role"
              value={this.state.role}
              onChange={this.onChangeRole}
            >
              {roles.map((role) => {
                return (
                  <option key={role} value={role}>
                    {role}
                  </option>
                );
              })}
            </select>
         
         </div>
          <div className="col-6">
            <label>Password: </label>
            <input
              type="password"
              name="password"
              className="form-control"
              autoComplete="current-password"
              value={this.state.password}
              onChange={this.onChangePassword}
              required
            />
            <p>
              8 characters or more. 1 upercase, symbol, and number are required.
            </p>
          </div>
          </div>

          {this.state.error && (
            <div className="alert alert-danger">{this.state.error}</div>
          )}
          <div className="row">
            <div className="col-12">
            <input
              type="submit"
              value="Create User"
              className="btn btn-primary"
            />
          </div>
          </div>
        </form>
      </div>
    );
  }
}
