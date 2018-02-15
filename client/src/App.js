
import React from "react";
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
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
const App = () =>
  <Router>
    <div>
      <Main >
      <Switch>
        {/* <Route exact path="/" component={Access} /> */}
      <Route exact path={`${process.env.PUBLIC_URL}/entry`} component={VehicleEntry} />
        <Route path={`${process.env.PUBLIC_URL}/sell/:id`} component={Search} />
        <Route path={`${process.env.PUBLIC_URL}/leather`} component={Leather} />
        <Route path={`${process.env.PUBLIC_URL}/lift`} component={Lift} />
        <Route path={`${process.env.PUBLIC_URL}/detail`} component={Details} />
        <Route path={`${process.env.PUBLIC_URL}/pdf/:id`} component={PdfCreate} />
        <Route path="/saved" component={Inventory} />
        <Route exact path="/books" component={Books} />
        <Route path="/books/:id" component={Detail} />
        <Route exact path="/inventory" component={ClientInventory} />
        <Route path="/inventory/:id" component={ClientDetail} />
        <Route component={NoMatch} />
      </Switch>
      </Main>
    </div>
  </Router>;

export default App;





