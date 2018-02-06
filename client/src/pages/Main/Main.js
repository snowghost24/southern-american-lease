// Include React as a dependency
import React, { Component } from 'react'
// Including the Link component from React Router to navigate within our application without full page reloads
// https://github.com/ReactTraining/react-router/blob/master/docs/API.md#link
import { NavLink } from "react-router-dom";

// Create the Main component
class Main extends Component {

  render() {

    return (
      // We can only render a single div. So we need to group everything inside of this main-container one
      <div className="main-container">
        <div className="container">
          {/* Navbar */}
          <nav className="navbar navbar-default">
            <div className="container-fluid">
              <div className="navbar-header">
                <button
                  type="button"
                  className="navbar-toggle"
                  data-toggle="collapse"
                  data-target=".navbar-ex1-collapse"
                >
                  <span className="sr-only">Toggle navigation</span>
                  <span className="icon-bar"></span>
                  <span className="icon-bar"></span>
                  <span className="icon-bar"></span>
                </button>
                <NavLink className="navbar-brand" exact to="/">Dean Marco</NavLink>
              </div>

              <div className="collapse navbar-collapse navbar-ex1-collapse">
                <ul className="nav navbar-nav navbar-right">
                  {/* Using <NavLink> in place of <a> and "to" in place of "href" */}
                  <li><NavLink exact to="/">Add Vehicle</NavLink></li>
                  <li><NavLink to="/saved">Inventory</NavLink></li>
                  <li><NavLink to="/leather">Leather</NavLink></li>
                  <li><NavLink to="/lift">Lift</NavLink></li>
                  <li><NavLink to="/detail">Detail</NavLink></li>
                </ul>
              </div>
            </div>
          </nav>

          {/* Jumbotron */}
          <div className="jumbotron">
            <h2 className="text-center"><strong>CAN-AM AUTO</strong></h2>
            <h3 className="text-center">Vehicle Inventory</h3>
          </div>


          {/* Here we will deploy the sub components (Search or Saved */}
          {/* These sub-components are getting passed as this.props.children */}
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