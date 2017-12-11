
import React from "react";
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import Books from "./pages/Books";
import Detail from "./pages/Detail";
import NoMatch from "./pages/NoMatch";
// import Nav from "./components/Nav";
import Main from "./pages/Main";
import Search from "./pages/Search";
import Saved from "./pages/Saved";

const App = () =>
  <Router>
    <div>
      <Main />
      <Switch>
        <Route exact path="/" component={Search} />
        <Route exact path="/search" component={Search} />
            <Route exact path="/saved" component={Saved} />
        <Route exact path="/books" component={Books} />
        <Route exact path="/books/:id" component={Detail} />
        <Route component={NoMatch} />
      </Switch>
    </div>
  </Router>;

export default App;





