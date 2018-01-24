
import React from "react";
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import Books from "./pages/Books";
import Detail from "./pages/Detail";
import NoMatch from "./pages/NoMatch";
// import Nav from "./components/Nav";
import Main from "./pages/Main";
import Search from "./pages/Search";
import Inventory from "./pages/Inventory";
import Leather from "./pages/Leather";
import PdfCreate from "./pages/PdfCreate";
import JsPDF from "./components/JsPDF";
const App = () =>
  <Router>
    <div>
      <Main >
      <Switch>
        <Route exact path="/" component={Search} />
        <Route exact path={`${process.env.PUBLIC_URL}/search`} component={Search} />
        <Route exact path={`${process.env.PUBLIC_URL}/sell/:id`} component={Search} />
        <Route exact path={`${process.env.PUBLIC_URL}/leather`} component={Leather} />
        <Route exact path={`${process.env.PUBLIC_URL}/lift`} component={Leather} />
        <Route exact path={`${process.env.PUBLIC_URL}/detail`} component={Leather} />
        <Route exact path={`${process.env.PUBLIC_URL}/pdf`} component={PdfCreate} />
        <Route exact path={`${process.env.PUBLIC_URL}/JsPDF`} component={JsPDF} />

        <Route exact path="/saved" component={Inventory} />
        <Route exact path="/books" component={Books} />
        <Route exact path="/books/:id" component={Detail} />
        {/* <Route component={NoMatch} /> */}
      </Switch>
      </Main>
    </div>
  </Router>;

export default App;





