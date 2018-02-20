import React from 'react';
import { Link ,NavLink } from "react-router-dom";
import * as routes from '../../constants/routes';
import SignOutButton from '../../components/SignOutButton/SignOutButton';

const Navigation = ({ authUser }) =>
  <div>
    { authUser
        ? <NavigationAuth />
        : <NavigationNonAuth />
    }
  </div>

const NavigationAuth = () => 
   <div className="collapse navbar-collapse" id="myNavbar">
      <ul className="nav navbar-nav">
         <li className="active"><NavLink exact to="/entry">Home</NavLink></li>
         <li className="dropdown">
            <a className="dropdown-toggle" data-toggle="dropdown" href="#">Shops <span className="caret"></span></a>
            <ul className="dropdown-menu">
               <li><NavLink to={routes.LEATHER}>Leather</NavLink></li>
               <li><NavLink to={routes.LIFT}>Lift</NavLink></li>
               <li><NavLink to={routes.DETAIL}>Detail</NavLink></li>
            </ul>
         </li>
         <li><NavLink to="/saved">Inventory</NavLink></li>
         <li><NavLink to="/inventory/">Marketing Inventory</NavLink></li>
      </ul>
      <ul className="nav navbar-nav navbar-right">
         <li><SignOutButton /></li>
      </ul>
   </div>





const NavigationNonAuth = () =>
   <div className="collapse navbar-collapse" id="myNavbar">
      <ul className="nav navbar-nav">
         <li className="active"><NavLink exact to="/entry">Vehicle Entry</NavLink></li>
         <li className="dropdown">
            <a className="dropdown-toggle" data-toggle="dropdown" href="#">Shops <span className="caret"></span></a>
            <ul className="dropdown-menu">
               <li><NavLink to={routes.LEATHER}>Leather</NavLink></li>
               <li><NavLink to={routes.LIFT}>Lift</NavLink></li>
               <li><NavLink to={routes.DETAIL}>Detail</NavLink></li>
            </ul>
         </li>
         <li><NavLink to="/saved">Inventory</NavLink></li>
         <li><NavLink to="/inventory/">Marketing Inventory</NavLink></li>
      </ul>
      <ul className="nav navbar-nav navbar-right">
         <li><Link to={routes.SIGN_IN}> <span className="glyphicon glyphicon-user"></span> Sign In</Link></li>
         <li><Link to={routes.SIGN_UP}><span className="glyphicon glyphicon-user"></span>Sign Up</Link></li>
      </ul>
   </div>



export default Navigation;