import React from 'react';
import { BrowserRouter as Router, Route  } from "react-router-dom";
import "bootstrap/dist/css/bootstrap.min.css";

// import components
import Navbar from "./components/navbar.component";
import Dashboard from "./components/dashboard.component";
import CreateTicket from "./components/create-ticket.component";
import CreateUser from "./components/create-user.component";
import ManageUsers from "./components/manage-users.component";
import ManageProjects from "./components/manage-projects.component";
import EditTicket from "./components/edit-ticket.component";
import Login from "./components/login_page";
import Footer from "./components/footer_page";
import CoverPage from "./components/coverpage";

const user = localStorage.getItem("token");

export default function App() {
  return (
    <Router>
        <Navbar /> 
            <div id="content">
                {user && <Route path="/" exact component={Dashboard}  />}
                {!user && <Route path="/" exact component={CoverPage}  />}
                <Route path="/tickets/create" component={CreateTicket} />
                {user && <Route path="/manage-users" component={ManageUsers} />}
                {!user && <Route path="/manage-users" exact component={CoverPage}  />}
                {user && <Route path="/users/create" component={CreateUser} />}
                {!user && <Route path="/users/create" exact component={CoverPage}  />}

                {user && <Route path="/edit/:id" component={EditTicket} />}
                {!user && <Route path="/edit/:id" exact component={CoverPage}  />}
                <Route path="/login" component={Login} />
                
            </div>
       <Footer/>
    </Router>
  );
}


//<Route path="/manage-projects" component={ManageProjects} />