import React, { Component} from 'react';
import { Link } from 'react-router-dom';
import logo from '../assets/logo.png';
import { NavLink } from 'react-router-dom';

export default class Navbar extends Component {
	constructor(props) {
		super(props);
		this.state = { windowWidth: window.innerWidth };


		this.handleLogout = this.handleLogout.bind(this);
	  }
	
	  handleResize = (e) => {
	  this.setState({ windowWidth: window.innerWidth });
	 };

	  handleLogout = () => {
		 localStorage.removeItem("token");
		 window.location = '/tickets/create';
	 }
	
	 componentDidMount() {
	  window.addEventListener("resize", this.handleResize);
	 }
	
	 componentWillUnmount() {
	  window.addEventListener("resize", this.handleResize);
	 } 

    render() {

		
		const { windowWidth } = this.state;
		const user = window.localStorage.getItem("token");
	

	
	

		


        return (
            <nav className="navbar navbar-light  ml-auto sidebar">
            	<div className="container-fluid">		
				<div className="col-12 col-sm-12 col-md-12 col-lg-10 col-xl-4 col-xxl-4 p-0">
				<ul className="nav flex-row  align-items-center justify-content-center">
				<li className="nav-item">
				<center><img src={logo} className="navbar-brand" width="120" alt="Tech support" /></center>
				</li>

	    			<li className="nav-item">
	    				<NavLink to="/" exact={true} className="nav-link d-flex flex-row" activeClassName="active">
	    					<i className="fas fa-home"></i>
	    					<p className="nav-names m-0">home</p>
	    				</NavLink>
	    			</li>
	    			<li>
                		<NavLink to="/tickets/create" className="nav-link d-flex flex-row" activeClassName="active">
                			<i className="fas fa-ticket-alt"></i>
							<p className="nav-names m-0">ticket </p>
                		</NavLink>
            		</li>
            	<li>
                		<NavLink to="/manage-users" className="nav-link d-flex flex-row" activeClassName="active">
							
                			<i className="fas fa-users"></i>
							<p className="nav-names m-0">Users</p>
					
                		</NavLink>
            		</li>
	    		</ul>
				</div>
				{ (windowWidth > 1200) &&
				<div className=" col-12 col-sm-12 col-md-12 col-lg-12 col-xl-6 col-xxl-6 ">
					      <center>      <p className="ml-4 h6 mb-0 font-weight-bold nav-title" href="https://msumcmaster.ca/">Mcmaster Students Union</p></center>
				</div>
				
				}
			
				<div className=" col-12 col-sm-12 col-md-12 col-lg-12 col-xl-2 col-xxl-2 p-0"  id="navbarSupportedContent">
		                <ul className=" nav d-flex flex-row align-items-center justify-content-center ">  
		                	<li> 
							  
		                    	{!user && <Link to="/login" className="nav-link pr-2">Log In</Link>}
		                    </li>
		                    <li>
		                    	{user && <button onClick={this.handleLogout} className="nav-link pl-2">Sign Out</button>}
		                    </li>
		                </ul>
	                </div>
			 { (windowWidth < 1200) &&
				<div className=" col-12 col-sm-12 col-md-12 col-lg-12 col-xl-6 col-xxl-6">
					<center> <p className="ml-4 h6 mb-0 font-weight-bold nav-title" href="https://msumcmaster.ca/">Mcmaster Student Union</p></center>
				</div>
	}
	
	
	
                </div>
            </nav>
        );
    }
}
