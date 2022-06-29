import React, { Component } from "react";
import axios from "axios";

const priorities = ["Low", "Medium", "High"];
const statuses = ["Open", "In Progress", "Resolved"];
const types = ["Bug/Error", "Feature Request", "Security", "Other", "Not Sure"];



export default class CreateTicket extends Component {
  constructor(props) {
    super(props);

    this.onChangeTitle = this.onChangeTitle.bind(this);
    this.onChangeDescription = this.onChangeDescription.bind(this);

    // Add Email, First & Last name
    this.onChangefirstName = this.onChangefirstName.bind(this);
    this.onChangelastName = this.onChangelastName.bind(this);
    this.onChangeEmail = this.onChangeEmail.bind(this);

    this.onChangePriority = this.onChangePriority.bind(this);
    this.onChangeStatus = this.onChangeStatus.bind(this);
    this.onChangeType = this.onChangeType.bind(this);
    this.onSubmit = this.onSubmit.bind(this);

    this.state = {
      title: "",
      description: "",
      //Add Email, First, Last name
      firstName: "",
      lastName: "",
      email: "",
      count: [],
      priority: "",
      status: "",
      type: "",
      users: [],
      projects: [],
      emailError: null,
    };
  }

  componentDidMount() {
    // set default values for state properties
    this.setState({
      priority: priorities[0],
      status: statuses[0],
      type: types[0],
    });

    // get list of projects to set default project
  }

  onChangeTitle(e) {
    this.setState({
      title: e.target.value,
    });
  }

  onChangeDescription(e) {
    this.setState({
      description: e.target.value,
    });
  }

  // Add Email, First and Last name
  onChangefirstName(e) {
    this.setState({
      firstName: e.target.value,
    });
  }

  onChangelastName(e) {
    this.setState({
      lastName: e.target.value,
    });
  }

  onChangeEmail(e) {
    this.setState({
      email: e.target.value,
    });
  }

  onChangePriority(e) {
    this.setState({
      priority: e.target.value,
    });
  }

  onChangeStatus(e) {
    this.setState({
      status: e.target.value,
    });
  }

  onChangeType(e) {
    this.setState({
      type: e.target.value,
    });
  }

  validate() {
    let emailError = "";






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
    return true;
  }

  onSubmit(e) {
    e.preventDefault();

    if (this.validate()) {
      console.log("on Submit");
      const ticket = {
        firstName: this.state.firstName,
        lastName: this.state.lastName,
        email: this.state.email,
        title: this.state.title,
        description: this.state.description,
        // Need Email, First and Last name
        priority: this.state.priority,
        status: this.state.status,
        type: this.state.type,
      };

      axios
        
        .post("https://mcmasterstudentsunion.zendesk.com/api/v2/requests", ticket)
        .then((res) => console.log(res.data));

      alert("Successfully created.");

      // clear form
      this.setState({
        firstName: "",
        lastName: "",
        email: "",
        title: "",
        description: "",
        priority: "",
        status: "",
        type: "",
      
      });
    }
  }

  render() {
    return (
      <div className="container">
        <h3>Submit a Ticket</h3>
        <form onSubmit={this.onSubmit}>
          <div className="row">
            <div className="col-6">
              <input
                type="text"
                className="form-control"
                value={this.state.firstName}
                onChange={this.onChangefirstName}
                placeholder={"First Name"}
                required
              />
              <div className="invalid-feedback">
                Please choose a First name.
              </div>
            </div>
            <div className="col-6">
              <input
                type="text"
                className="form-control"
                value={this.state.lastName}
                onChange={this.onChangelastName}
                placeholder={"Last Name"}
                required
              />
            </div>
          </div>
          <div className="row pt-3">
            <div className="col-6">
              <input
                type="text"
                className="form-control"
                value={this.state.email}
                onChange={this.onChangeEmail}
                placeholder="Email"
                required
              />
              <span className="text-danger">{this.state.emailError}</span>
            </div>
            <div className="col-6">
              <input
                type="text"
                className="form-control"
                value={this.state.title}
                onChange={this.onChangeTitle}
                placeholder="Title"
                required
              />
            </div>
          </div>
          <div className="row pt-3">
            <div className="col-12">
              <textarea
                style={{ resize: "none" }}
                type="text"
                maxLength="250"
                rows="3"
                className="form-control"
                placeholder="Description"
                value={this.state.description}
                onChange={this.onChangeDescription}
                required
              ></textarea>
            </div>
          </div>
          <div className="row pt-1">
            <div className="col-4">
              <label>Priority: </label>
              <select
                className="form-control"
                value={this.state.priority}
                onChange={this.onChangePriority}
              >
                {priorities.map((priority) => {
                  return (
                    <option key={priority} value={priority}>
                      {priority}
                    </option>
                  );
                })}
              </select>
            </div>
            <div className="col-4">
              <label>Status: </label>
              <select
                className="form-control"
                value={this.state.status}
                onChange={this.onChangeStatus}
              >
                {statuses.map((status) => {
                  return (
                    <option key={status} value={status}>
                      {status}
                    </option>
                  );
                })}
              </select>
            </div>
            <div className="col-4">
              <label>Type: </label>
              <select
                className="form-control"
                value={this.state.type}
                onChange={this.onChangeType}
              >
                {types.map((type) => {
                  return (
                    <option key={type} value={type}>
                      {type}
                    </option>
                  );
                })}
              </select>
            </div>
          </div>

          <div className="row pt-2">
            <div className="col-12 ">
      
              <button
                type="submit"
                value="Submit Ticket"
                className="btn btn-primary"
              >Submit Ticket</button>
            </div>
          </div>
        </form>
      </div>
    );
  }
}
