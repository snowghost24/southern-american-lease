import React, { Component } from "react";
import { Link } from "react-router-dom";
import { Col, Row, Container } from "../../components/Grid";
import Jumbotron from "../../components/Jumbotron";
import API from "../../utils/API";
import { Input, TextArea, FormBtn } from "../../components/Form";
import ToggleButton from 'react-toggle-button'
import helpers from "../../utils/helpers";
import Filter from "../../components/filter/filter";
import "./Leather.css";
class LeatherStatus extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      leatherStatus: '',
      location:'',     
     
    };
    this.handleChange = this.handleChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
    this.alsoChangeLocation = this.alsoChangeLocation.bind(this);
  }

  handleChange(event) {
  const target = event.target;
  const value = target.type === 'checkbox' ? target.checked : target.value;
  const name = target.name;
  this.setState({
    [name]: value
  });
  this.alsoChangeLocation(value)
  }

  alsoChangeLocation(value){
    console.log("Im in change location");
    if (value == "Processing"){
      this.setState({
        location:"Southern Leather"
      })
    }
  }

  handleSubmit(event) {
    event.preventDefault();
    console.log(this.state);
    var theVehicleId = this.props.theVehicle._id
    var newLeatherStatus = this.state.leatherStatus;
    var newLocation = this.state.location;
  
    var newChanges = {
      leatherStatus:newLeatherStatus,
      location:newLocation,
      
    }
    API.updateLeather(theVehicleId, newChanges)
    .then((res) => {
      this.props.theReload()
    }).catch(err => console.log(err));
  }

  componentDidMount = () => {
    var theStatus = this.props.theVehicle.location;
    var theLocation = this.props.theVehicle.location;
    var theNote = this.props.theVehicle.leatherNote
    console.log(theLocation,theStatus);
    this.setState({
      leatherStatus:theStatus,
      location:theLocation
    });

  }


  render() {
    return (
      <form  onSubmit={this.handleSubmit}>
      <Row>
        <Col size="md-12 md-offset-3">
        <Col size="md-3">
               <label>
                 Leather Status:
           <select type="string" name="leatherStatus" value={this.state.leatherStatus} onChange={this.handleChange} >
           <option value="Pending">Pending</option>
                   <option value="Processing">Processing</option>
                   <option value="Complete">Complete</option>
                   <option value="na">na</option>
                 </select>
               </label>
        </Col>
    
        <Col size="md-3">
               <label>
            Current Location:
          <select type="string" name="location" value={this.state.location} onChange={this.handleChange} >
              <option value="pending">Pending</option>
              <option value="Watson">Watson</option>
              <option value="High Standards">High Standards</option>
              <option value="Southern Leather">Southern Leather</option>
              <option value="Distinction Detail">Distinct Detials</option>
              <option value="WashBay">WashBay</option>
              <option value="Go">GO</option>
              <option value="Auction">Auction</option>
              <option value="body shop">Body Shop</option>
              <option value="delivered">Delivered to buyer</option>
              <option value="other">Other</option>
            </select>
          </label>
          </Col>
              
        <Col size="md-3">
        <input className="btn btn-danger" type="submit" value="Submit" />
        </Col>
          </Col>
         
          </Row>
    </form>
    );
  }
}







class LeatherOption extends React.Component {
  constructor(props) {
    super(props);
    this.state = {leatherColor: 'black',
    leatherNote: ""};
    this.handleChange = this.handleChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
  }

  handleChange(event) {
    const target = event.target;
    const value = target.type === 'checkbox' ? target.checked : target.value;
    const name = target.name;
    this.setState({
      [name]: value
    });
  }

  handleSubmit(event) {
    event.preventDefault();
    var theVehicleId = this.props.theVehicle._id
    
    var newChange =  {leatherColor:this.state.leatherColor,
    leatherNote:this.state.leatherNote}
    API.updateLeather(theVehicleId, newChange)
    .then((res) => {
      this.props.theReload()
    }).catch(err => console.log(err));
  }

  componentDidMount = () => {
    this.setState({leatherColor:this.props.theVehicle.leatherColor,
      leatherNote:this.props.theVehicle.leatherNote});

  }


  render() {
    return (
      <form  onSubmit={this.handleSubmit}>
      <label>
        Change Install:
         <select type="string"
          name="leatherColor" 
          value={this.state.leatherColor} 
          onChange={this.handleChange} >
          <option value="black">Black</option>
          <option value="black stone stone">Black/Stone/Stone</option>
          <option value="licore">Licore</option>
          <option value="barracuda">Barracuda</option>
          <option value="limited kit">Limited</option>
          <option value="stone">Stone</option>
          <option value="sandstone">Sandstone</option>
          <option value="black cardinal">black_cardinal</option>
          <option value="xtra woodland">Xtra Woodland</option>
          <option value="lightgrey">Light Grey</option>
          <option value="puddy">Puddy</option>
          <option value="shale">shale</option>
          <option value="none">None</option>
        </select>
      </label>
      <br />
      <label>
                Leather Notes:
        <TextArea className="leatherText" type="string" name="leatherNote" value={this.state.leatherNote} onChange={this.handleChange} />
              </label>
              <br />
      <input className="btn btn-danger" type="submit" value="Submit" />
    </form>
    );
  }
}







// Create the Main component
class Leather extends Component {
  state = {
    savedVehicles: [],
    arrayValue:[]
  }

  // gets all saved articles from our db
  componentDidMount() {
    helpers.getSavedLeather()
    .then((vehicleData) => {
      this.setState({ savedVehicles: vehicleData.data });
      console.log("saved results", vehicleData.data);
      console.log("The current state in leather", this.state);
    });
  }
// reloads data  from db after a submit
  reloadComponent (){
   helpers.getSavedLeather()
    .then((vehicleData) => {
      this.setState({ savedVehicles: vehicleData.data });
      console.log("saved results", vehicleData.data);
      console.log("The current state in leather", this.state);
    });
  }

  //Filters seach
  handleFilteredSearch =(searchType,searchItem)=>{ 
    console.log("Filtered Trigger"); 
    helpers.getFilteredSaved(searchType, searchItem)
    .then((vehicleData) => {
      this.setState({ savedVehicles: vehicleData.data });
      console.log("I filtered search", vehicleData.data);
      console.log("the filtered state is",this.state);
    });
  }
  // A helper method for rendering the HTML when we have no saved articles
  renderEmpty = () => {
    return (
      <li className="list-group-item">
        <h3>
          <span>
            <em>Save your first article...</em>
          </span>
        </h3>
      </li>
    );
  }


  //pushes object into the arrayValue state
  //the array value is unique key depending on the index 
  createNewState (index,theCheck){
    this.state.arrayValue.push({[theCheck]:false})
  }

  // A helper method for mapping through our articles and outputting some HTML
  renderArticles = () => {
    return this.state.savedVehicles.map((vehicle, index) => {

      //calls and sends the index value to the create New array function above
      //creates a varible called the check composed of the value and index
      var theCheck = "value"+index;
      this.createNewState(index,theCheck)

      return (
        <div key={index}>
          <li className="list-group-item">
            <span>
              <em>{vehicle.make}&nbsp;&nbsp;&nbsp;</em>
              <em>{vehicle.model}&nbsp;&nbsp;&nbsp;</em>
              <em>{vehicle.year}&nbsp;&nbsp;&nbsp;</em>
            </span>
            <span>
              <em>{vehicle.vin}</em>
            </span>
            <span className="btn-group pull-right">
              {/* <a href={vehicle.url} rel="noopener noreferrer" target="_blank">  </a> */}
              <LeatherStatus theVehicle={vehicle} theReload={this.reloadComponent.bind(this)}/>
              {/* <Link to={"/books/" + vehicle._id}>
                <button className="btn btn-info ">View Vehicle</button>
              </Link> */}
              {/* <button className="btn btn-primary" onClick={() => this.handleClick(vehicle)}>Delete</button> */}
            </span>
            <p>Date Entered: {vehicle.date}</p>
            <h4>Install Kit: <strong>{vehicle.leatherColor}</strong></h4>
            <h4>Vehicle Location: <strong>{vehicle.location}</strong></h4>
              {/* if note is empty do not show anything */}
            {vehicle.leatherNote != "" ? (<h4>Vehicle Note: <strong><span className="notes">{vehicle.leatherNote}</span></strong></h4>)  :( <p></p>) }
           
            <h4>Install Status: <span className={vehicle.leatherStatus}><strong>{vehicle.leatherStatus}</strong></span></h4>

            {/* here we change state of each togggle button */}
            <ToggleButton
              value={this.state.arrayValue[index][theCheck]}
              onToggle={(value) => {
                this.state.arrayValue[index][theCheck] = !value;
                this.setState(this.state)
               
              }} />
              {/* displays the leather options once the togggle button is true */}
            <div>
              {this.state.arrayValue[index][theCheck] ? (
                <LeatherOption theVehicle={vehicle} theReload={this.reloadComponent.bind(this)}/>
                // this.updateForm(vehicle)
              ) : (
                <p>Turn ON to change kit and add note</p>
              )}
            </div>
          </li>
        </div>
      );
    });
  }

  // A helper method for rendering a container and all of our artiles inside
  renderContainer = () => {
    return (
      <div className="main-container">
        <div className="row">
          <div className="col-lg-12">
            <div className="panel panel-primary">
              <div className="panel-heading">
                <h1 className="panel-title">
                  <strong>
                    <i className="fa fa-download" aria-hidden="true"></i> Leather Inventory</strong>
                </h1>
                <Filter filteredSearch={this.handleFilteredSearch} />
              </div>
              <div className="panel-body">
                <ul className="list-group">
                  {this.renderArticles()}
                </ul>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }
  // Our render method. Utilizing a few helper methods to keep this logic clean
  render() {
    // If we have no articles, we will return this.renderEmpty() which in turn returns some HTML
    if (!this.state.savedVehicles) {
      return this.renderEmpty();
    }
    // If we have articles, return this.renderContainer() which in turn returns all saves articles
    return this.renderContainer();
  }
};

// Export the module back to the route
export default Leather;
