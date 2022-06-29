import React, { Component } from "react";
import axios from "axios";
import { Link } from "react-router-dom";
import MarkButton from "./mark-button";
import {Button,Modal} from 'react-bootstrap';
var moment = require("moment");

let getPriorities = (lvl) => {
  switch (lvl) {
    case "Low":
      return <td className="low-priority">{lvl}</td>;
    case "Medium":
      return <td className="med-priority">{lvl}</td>;
    case "High":
      return <td className="high-priority">{lvl}</td>;
    default:
      return <td>{lvl}</td>;
  }
};

export default class Ticket extends Component {
  constructor(props) {
    super(props);

    this.state = {
      status: "",
      show: false
    };
  }

  handleClose = () => this.setState({show: false});


   handleShow = () => this.setState({show: true});


  componentDidMount() {
    // default state of ticket
    axios
      .get("http://localhost:8080/tickets/" + this.props.ticket._id)
      .then((res) => {
        this.setState({
          firstName: res.body.firstName,
          lastName: res.body.lastName,
          email: res.data.email,
          title: res.data.title,
          description: res.data.description,
          assignee: res.data.assignee,
          priority: res.data.priority,
          status: res.data.status,
          type: res.data.type,
          solution: res.data.solution,
        });
      })
      .catch((error) => console.log(error));
  }

  onChangeStatus(e) {
    // axios.post('http://localhost:8080/tickets/update/' + this.props.ticket._id, this.props.ticket)
    //     .then(res => console.log(res.data));
  }

  render() {
    return (
      <tr>
        <td>{this.props.ticket.firstName}</td>
        <td>{this.props.ticket.lastName}</td>
        <td>{this.props.ticket.email}</td>
        <td>{this.props.ticket.title}</td>
        <td>{this.props.ticket.description}</td>
        <td>{this.props.ticket.assignee}</td>
        {getPriorities(this.props.ticket.priority)}
        <td>{this.props.ticket.status}</td>
        <td>{this.props.ticket.type}</td>

        <td className="row ">
          <div className="col">
            <Link
              to={"/edit/" + this.props.ticket._id}
              className="badge bg-info"
            >
              Edit
            </Link>

            <a
              href="#"
              onClick={() => {
                if (
                  window.confirm("Are you sure you want to delete this ticket?")
                )
                  this.props.deleteTicket(this.props.ticket._id);
              }}
              className="badge bg-danger"
            >
              Delete
            </a>
          </div>
          <div className="col">

          <Button className="badge bg-primary "onClick={this.handleShow}>
      Solution
      </Button>

    
              
           

            {/* 
         
          <MarkButton
            mark={this.props.ticket.status}
            ticketID={this.props.ticket._id}
          />
       */}
            {
              /* *****
               *  FIX THIS TO UPDATE STATE
               * *****/
              this.props.ticket.status !== "Resolved" ? (
                <a
                
                  onClick={() => {
                    this.props.ticket.status = "Resolved";
                  }}
                  className="badge bg-success"
                >
                  Mark as Resolved
                </a>
              ) : (
                <a
                  
                  onClick={() => {
                    this.props.ticket.status = "Open";
                  }}
                  className="badge bg-secondary"
                >
                  Mark as Open
                </a>
              )
            }
          </div>
        </td>


        <td>{moment(this.props.ticket.createdAt).format("DD/mm/yyyy")}</td>

        <Modal show={this.state.show} onHide={this.handleClose}>
        <Modal.Header closeButton>
          <Modal.Title>{this.props.ticket.title}</Modal.Title>
        </Modal.Header>
        <Modal.Body>{this.props.ticket.solution}</Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={this.handleClose}>
            Close
          </Button>
        </Modal.Footer>
      </Modal>
      

      </tr>
    );
  }
}
