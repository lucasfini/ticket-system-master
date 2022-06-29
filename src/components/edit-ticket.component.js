import React, { Component } from 'react';
import axios from 'axios';

const priorities = ['Low', 'Medium', 'High'];
const statuses = ['Open', 'In Progress', 'Resolved'];
const types = ['Bug/Error', 'Feature Request', 'Security', 'Other'];

export default class EditTicket extends Component {
    constructor(props) {
        super(props);

        this.onChangeTitle = this.onChangeTitle.bind(this);
        this.onChangeDescription = this.onChangeDescription.bind(this); 
        this.onChangeAssignee = this.onChangeAssignee.bind(this);
        this.onChangePriority = this.onChangePriority.bind(this);
        this.onChangeStatus = this.onChangeStatus.bind(this);
        this.onChangeType = this.onChangeType.bind(this);
        this.onChangeSolution = this.onChangeSolution.bind(this);
        this.onSubmit = this.onSubmit.bind(this);
    

        this.state = { 
      		title: '',
  		    description: '',
            assignee: '',
  		    priority: '',
  		    status: '',
  		    type: '',
          users: [],
          solution: '',
       
          
        };
    }

    componentDidMount() {

      
        // default state of ticket
        axios.get('http://localhost:8080/tickets/'+this.props.match.params.id)
            .then(res => {
                this.setState({
                    title: res.data.title,
                    description: res.data.description,
                    solution: res.data.solution,
                    assignee: res.data.assignee,
                    priority: res.data.priority,
                    status: res.data.status,
                    type: res.data.type
                })
            })
            .catch((error) => { console.log(error); })

            console.log("hi"+this.state.solution);

        // get list of users to select from
        axios.get('http://localhost:8080/users/')
        .then(res => {
            if(res.data.length > 0) {
                this.setState({
                    users: res.data.map(user => user.name)
                })
            }
        })
        .catch((error) => { console.log(error); })

 
     
    }

    onChangeTitle(e) {
        this.setState({
            title: e.target.value
        })
    }

    onChangeDescription(e) {
        this.setState({
            description: e.target.value
        })
    }

    onChangeAssignee(e) {
        this.setState({
            assignee: e.target.value
        })
    }

    onChangePriority(e) {
        this.setState({
            priority: e.target.value
        })
    }

    onChangeStatus(e) {
        this.setState({
            status: e.target.value
        })
    }

    onChangeType(e) {
        this.setState({
            type: e.target.value
        })
    }

    onChangeSolution(e) {
        this.setState({
            solution: e.target.value
        })
    }

    onSubmit(e) {
    	e.preventDefault();
        
    	const ticket = {
            title: this.state.title,
            description: this.state.description,
            assignee: this.state.assignee,
            priority: this.state.priority,
            status: this.state.status,
            type: this.state.type,
            solution: this.state.solution
        }

        console.log(this.state);

        axios.post('http://localhost:8080/tickets/update/' + this.props.match.params.id, ticket)
            .then(res => console.log(res.data));
            
        alert('Successfully updated.');
        console.log("updated")
        window.location = "/";
    }

	render() {
		return(
			<div>
				<h3>Edit Ticket</h3>
				<form onSubmit={this.onSubmit}>
                    <div className="form-group">
                        <label>Title: </label>
                        <input type="text"
                               required
                               className="form-control"
                               value={this.state.title}
                               onChange={this.onChangeTitle}
                        />
                    </div>
                    <div className="form-group">
                        <label>Description: </label>
                        <input type="text"
                               required
                               className="form-control"
                               value={this.state.description}
                               onChange={this.onChangeDescription}
                        />
                    </div>
                  
                    <div className="form-group">
                        <label>Assignee: </label>
                        <select required
                              className="form-control"
                              value={this.state.assignee}
                              onChange={this.onChangeAssignee}>
                              {
                                this.state.users.map((user) => {
                                return <option key={user}
                                               value={user}>{user}
                                       </option>;
                                })
                              }
                      </select>
                    </div>
                    <div className="form-group">
                        <label>Priority: </label>
                        <select required
                              className="form-control"
                              value={this.state.priority}
                              onChange={this.onChangePriority}>
                              {
                                  priorities.map((priority) => {
                                  return <option key={priority}
                                                 value={priority}>{priority}
                                         </option>;
                                  })
                              }
                      </select>
                    </div>
                    <div className="form-group">
                        <label>Status: </label>
                        <select required
                              className="form-control"
                              value={this.state.status}
                              onChange={this.onChangeStatus}>
                              {
                                  statuses.map((status) => {
                                  return <option key={status}
                                                 value={status}>{status}
                                         </option>;
                                  })
                              }
                      </select>
                    </div>
                    <div className="form-group">
                        <label>Type: </label>
                        <select required
                              className="form-control"
                              value={this.state.type}
                              onChange={this.onChangeType}>
                              {
                                  types.map((type) => {
                                  return <option key={type}
                                                 value={type}>{type}
                                         </option>;
                                  })
                              }
                      </select>
                    </div>
                    <div className="form-group">
                        <label>Solution: </label>
                        <input type="text"
                               className="form-control"
                               value={this.state.solution}
                               onChange={this.onChangeSolution}
                        />
                    </div>
					<div className="form-group">
                        <input type="submit" value="Update Ticket" className="btn btn-primary" />
                    </div>
				</form>
			</div>
		);
	}
}