
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

import Leather from "./pages/Leather";
import PdfCreate from "./pages/PdfCreate";
import JsPDF from "./components/JsPDF";
const App = () =>
  <Router>
    <div>
      <Main >
      <Switch>
        <Route exact path="/" component={Search} />
        {/* <Route exact path={`${process.env.PUBLIC_URL}/search`} component={Search} /> */}
        <Route path={`${process.env.PUBLIC_URL}/sell/:id`} component={Search} />
        <Route path={`${process.env.PUBLIC_URL}/leather`} component={Leather} />
        <Route path={`${process.env.PUBLIC_URL}/lift`} component={Leather} />
        <Route path={`${process.env.PUBLIC_URL}/detail`} component={Leather} />
        <Route path={`${process.env.PUBLIC_URL}/pdf`} component={PdfCreate} />
        <Route path={`${process.env.PUBLIC_URL}/JsPDF`} component={JsPDF} />

        <Route path="/saved" component={Inventory} />
        <Route exact path="/books" component={Books} />
        <Route path="/books/:id" component={Detail} />
        <Route exact path="/inventory" component={ClientInventory} />
        <Route path="/inventory/:id" component={ClientDetail} />
        {/* <Route component={NoMatch} /> */}
      </Switch>
      </Main>
    </div>
  </Router>;

export default App;





