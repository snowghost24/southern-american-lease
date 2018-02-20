// Include React as a dependency
import React, { Component } from 'react'
// Including the Link component from React Router to navigate within our application without full page reloads
// https://github.com/ReactTraining/react-router/blob/master/docs/API.md#link
import { NavLink } from "react-router-dom";
//  import { Input, TextArea, FormBtn } from "../../components/Form";
import SignOutButton from '../../components/SignOutButton/SignOutButton';
import Navigation from '../../components/Navigation';
// Create the Main component
class Main extends Component {
  constructor(props) {
    super(props);

  }
  buttonTest() {
  
  }

  render() {
    console.log("your props are", this.props)
    return (
      // We can only render a single div. So we need to group everything inside of this main-container one
      <div className="main-container">
        <div className="container">
          <nav className="navbar navbar-inverse">
            <div className="container-fluid">
              <div className="navbar-header">
                <button type="button" className="navbar-toggle" data-toggle="collapse" data-target="#myNavbar">
                  <span className="icon-bar"></span>
                  <span className="icon-bar"></span>
                  <span className="icon-bar"></span>
                </button>
                <a className="navbar-brand" href="#"><span className="glyphicon glyphicon-home"></span></a>
              </div>
              <Navigation authUser={this.props.authUser}/>
            </div>
          </nav>
          <div className="jumbotron hideJumbotron">
            <h2 className="text-center"><strong>CAN-AM AUTO</strong></h2>
            <h3 className="text-center">Vehicle Inventory</h3>
          </div>
          {this.props.children}
          <footer>
            <hr />
            <p className="pull-right">
              <i className="fa fa-github" aria-hidden="true"></i>
              Proudly built using React.js
            </p>
          </footer>
        </div>
      </div>
    );
  }
};

// Export the module back to the route
export default Main;