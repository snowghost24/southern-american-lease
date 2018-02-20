
import React, { Component } from 'react';
import { BrowserRouter as Router, Route, Switch,Redirect } from "react-router-dom";
import Books from "./pages/Books";
import Detail from "./pages/Detail";
import ClientDetail from "./pages/ClientDetail";
import NoMatch from "./pages/NoMatch";
// import Nav from "./components/Nav";
import Main from "./pages/Main";
import Search from "./pages/Search";
import Inventory from "./pages/Inventory";
import ClientInventory from "./pages/ClientInventory";
import Lift from "./pages/Lift";
import Leather from "./pages/Leather";
import Details from "./pages/Details";
import PdfCreate from "./pages/PdfCreate";
import VehicleEntry from "./pages/VehicleEntry";
import Navigation from './components/Navigation';
import * as routes from './constants/routes';
import SignIn from './pages/SignIn.js';
import SignUpPage from './pages/SignUpPage.js';
import  {firebase}  from './firebase';

function AuthenticatedRoute({component: Component, authenticated, ...rest}) {
  return (
    <Route
      {...rest}
      render={(props) => authenticated === true
          ? <Component {...props} {...rest} />
          : <Redirect to={{pathname: routes.SIGN_IN, state: {from: props.location}}} /> } />
  )
}



class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      authenticated: false,
      currentUser: null,
    };
  }

  setCurrentUser(user) {
    if (user) {
      this.setState({
        currentUser: user,
        authenticated: true
      })
    } else {
      this.setState({
        currentUser: null,
        authenticated: false
      })
    }
  }

  componentWillMount() {
    this.removeAuthListener = firebase.auth.onAuthStateChanged((user) => {
      if (user) {
        this.setState({
          authenticated: true,
          currentUser: user,
          loading: false,
        })

      } else {
        this.setState({
          authenticated: false,
          currentUser: null,
          loading: false,
        })
      }
    })
  }


  render() {
    return (
      <Router>
        <div>
          <Main authUser={this.state.authenticated} >
            <Switch>
              <AuthenticatedRoute
                  exact
                  path={`${process.env.PUBLIC_URL}${routes.ENTRY}`} 
                  authenticated={this.state.authenticated}
                  component={VehicleEntry }
                 />

              <AuthenticatedRoute
                exact
                path={`${process.env.PUBLIC_URL}${routes.LEATHER}`}
                authenticated={this.state.authenticated}
                component={Leather}
              />

              <AuthenticatedRoute
                path={`${process.env.PUBLIC_URL}${routes.LIFT}`}
                authenticated={this.state.authenticated}
                component={Lift} />

              <AuthenticatedRoute 
               path={`${process.env.PUBLIC_URL}${routes.DETAIL}`}
               authenticated={this.state.authenticated} 
               component={Details} />

              <AuthenticatedRoute 
              path={`${process.env.PUBLIC_URL}${routes.PDF_ID}`} 
              authenticated={this.state.authenticated}
              component={PdfCreate} />

              <AuthenticatedRoute 
              path={`${process.env.PUBLIC_URL}${routes.SAVED}`} 
              authenticated={this.state.authenticated}
              component={Inventory} />
              <AuthenticatedRoute 
              exact 
              path={`${process.env.PUBLIC_URL}${routes.BOOKS}`}
              authenticated={this.state.authenticated}
              component={Books} />
              <AuthenticatedRoute 
              path={`${process.env.PUBLIC_URL}${routes.BOOKS_ID}`} 
              authenticated={this.state.authenticated}
              component={Detail} />
              <Route exact path={`${process.env.PUBLIC_URL}${routes.SIGN_UP}`} component={SignUpPage} />
              <Route exact path={`${process.env.PUBLIC_URL}${routes.SIGN_IN}`} component={SignIn} />
              <Route exact path={`${process.env.PUBLIC_URL}${routes.INVENTORY}`} component={ClientInventory} />
              <Route path={`${process.env.PUBLIC_URL}${routes.INVENTORY_ID}`} 
              component={ClientDetail} />
              <Route component={NoMatch} />
            </Switch>
          </Main>
        </div>
      </Router>
    );
  }
}



export default App;





