import React, { Component } from "react";
// import { Link } from "react-router-dom";
import { Col, Row, Container } from "../../components/Grid";
// import Jumbotron from "../../components/Jumbotron";
import API from "../../utils/API";
import { Input, TextArea, FormBtn } from "../../components/Form";
import ToggleButton from 'react-toggle-button'
import helpers from "../../utils/helpers";
import Filter from "../../components/filter/filter";
import "./Lift.css";
import swal from 'sweetalert';
import { Button, ButtonGroup, } from 'reactstrap';


class LiftStatus extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      liftStatus: '',
      location: '',
    };
    this.handleChange = this.handleChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
    this.alsoChangeLocation = this.alsoChangeLocation.bind(this);
    this.hideVehicleDisplay = this.hideVehicleDisplay.bind(this)

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

  alsoChangeLocation(value) {
    if (value === "Processing") {
      this.setState({
        location: "High Standards"
      })
    }
  }

  handleSubmit(event) {
    event.preventDefault();
    console.log(this.state);
    var theVehicleId = this.props.theVehicle._id
    var newLiftStatus = this.state.liftStatus;
    var newLocation = this.state.location;

    var newChanges = {
      liftStatus: newLiftStatus,
      location: newLocation,

    }
    API.updateLift(theVehicleId, newChanges)
      .then((res) => {
        this.props.theReload()
      }).catch(err => console.log(err));
  }

  componentDidUpdate() {
    console.log("component updated");
  }
  componentDidMount = () => {
    var theStatus = this.props.theVehicle.location;
    var theLocation = this.props.theVehicle.location;
    this.setState({
      liftStatus: theStatus,
      location: theLocation
    });
  }

  hideVehicleDisplay() {
    API.hideLiftHandler(this.props.theVehicle._id)
      .then((res) => {
        this.props.theReload()
      }).catch(err => console.log(err));
  }



  render() {
    return (
      <Row>
        <form onSubmit={this.handleSubmit}>
          <Col size="md-3">
            <label>
              Lift Status:
           <select type="string" name="liftStatus" value={this.state.liftStatus} onChange={this.handleChange} >
                <option value="Pending">Pending</option>
                <option value="Processing">Processing</option>
                <option value="Complete">Complete</option>
                <option value="na">na</option>
              </select>
            </label>
          </Col>

          <Col size="md-4">
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

          <Col size="md-4">
            {/* <input className="btn btn-danger" type="submit" value="Submit" /> */}
            <ButtonGroup className="navbar-form navbar-right" >
              <Button className="btn btn-primary" type="submit" onClick={this.sendClearSearch}>Submit</Button>{' '}
              <Button className="btn btn-danger" value="Hide" onClick={this.hideVehicleDisplay}>Hide</Button>
            </ButtonGroup>
          </Col>
        </form>
      </Row>
    );
  }
}







class LiftOption extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      liftrange: '',
      liftNote: ""
    };
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

    var newChange = {
      liftrange: this.state.liftrange,
      liftNote: this.state.liftNote
    }
    API.updateLift(theVehicleId, newChange)
      .then((res) => {
        this.props.theReload()
      }).catch(err => console.log(err));
  }

  componentDidMount = () => {
    this.setState({
      liftrange: this.props.theVehicle.liftrange,
      liftNote: this.props.theVehicle.liftNote
    });

  }


  render() {
    return (
      <form onSubmit={this.handleSubmit}>
          <label>
                 Lift Kit Range:
           <select type="string" 
           name="liftrange" 
           value={this.state.liftrange} 
           onChange={this.handleChange} onBlur={this.alterState}>
                   <option value="">Select option</option>
                   <option value="7000-6500">7000 - 6500</option>
                   <option value="6000-5500">6500 - 6000</option>
                   <option value="6000-5500">6000 - 5500</option>
                   <option value="5500-5000">5500 - 5000</option>
                   <option value="5000-4500">5000 - 4500</option>
                   <option value="4500-4000">4500 - 4000</option>
                   <option value="4000-3500">4000 - 3500</option>
                   <option value="3500-3000">3500 - 3000</option>
                   <option value="none">None</option>
                 </select>
               </label>
        <br />
        <label>
          Lift Notes:
        <TextArea className="leatherText" type="string" name="liftNote" value={this.state.liftNote} onChange={this.handleChange} />
        </label>
        <br />
        <input className="btn btn-danger" type="submit" value="Submit" />
      </form>
    );
  }
}




// Create the Main component
class Lift extends Component {
  state = {
    savedVehicles: [],
    arrayValue: [],
    workFrom: "lift"
  }

  // gets all saved articles from our db
  componentDidMount() {
    this.getSavedLiftData()
  }

  getSavedLiftData() {
    helpers.getSavedLift()
      .then((vehicleData) => {
        this.setState({ savedVehicles: vehicleData.data });
      });

  }
  // reloads data  from db after a submit
  reloadComponent() {
    helpers.getSavedLift()
      .then((vehicleData) => {
        this.setState({ savedVehicles: vehicleData.data });
      });
  }

  //Filters seach
  handleFilteredSearch = (searchType, searchItem) => {
    helpers.getFilteredSaved(searchType, searchItem, this.state.workFrom)
      .then((vehicleData) => {


        if (vehicleData.data.name === "CastError") {
          swal({
            icon: "error",
            title: 'Sorry No Results Found!',
            text: 'Try Another Search',
          })
        } else if (vehicleData.data.length === 0) {
          swal({
            icon: "error",
            title: 'Sorry No Results Found!',
            text: 'Try Another Search',
          })
        } else {
          console.log("article data", vehicleData);
          this.setState({ savedVehicles: vehicleData.data });
        }
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
  createNewState(index, theCheck) {
    this.state.arrayValue.push({ [theCheck]: false })
  }

  // A helper method for mapping through our articles and outputting some HTML
  renderArticles = () => {
    return this.state.savedVehicles.map((vehicle, index) => {

      //calls and sends the index value to the create New array function above
      //creates a varible called the check composed of the value and index
      var theCheck = "value" + index;
      this.createNewState(index, theCheck);
      var linkTrigger;
      var noteTrigger

      if (vehicle.transitLink === "") {
        linkTrigger = 'Not Active'
      } else if (vehicle.transitLink === undefined) {
        linkTrigger = 'Not Active'
      } else if (vehicle.transitLink === null) {
        linkTrigger = 'Not Active'
      } else {
        linkTrigger = 'Active'
      }

      if (vehicle.liftNote === "") {
        noteTrigger = 'Not Active'
      } else if (vehicle.liftNote === undefined) {
        noteTrigger = 'Not Active'
      } else if (vehicle.liftNote === null) {
        noteTrigger = 'Not Active'
      } else {
        noteTrigger = 'Active'
      }

      return (
        <div key={index}>
          <li className="list-group-item">

          <Row>
            <Col size="sm-4">
            <span>
              <em>{vehicle.make}&nbsp;&nbsp;&nbsp;</em>
              <em>{vehicle.model}&nbsp;&nbsp;&nbsp;</em>
              <em>{vehicle.year}&nbsp;&nbsp;&nbsp;</em>
            </span>
            <span>
              <em>{vehicle.vin}</em>
            </span>
            </Col>
            <Col size="sm-8">
            <span className="btn-group">
              <LiftStatus theVehicle={vehicle} theReload={this.reloadComponent.bind(this)} />
            </span>
            </Col>
            </Row>
            <h4>Lift Range: <strong>{vehicle.liftrange}</strong></h4>
            <h4>Vehicle Location: <strong>{vehicle.location}
            </strong></h4>

            {linkTrigger === "Active" ? (<h4>Transport: <a href={vehicle.transitLink} rel="noopener noreferrer" target="_blank">See Intransit Location </a></h4>) : (<p></p>)}
            {noteTrigger === "Active" ? (<h4>Vehicle Note: <strong><span className="notes">{vehicle.liftNote}</span></strong></h4>) : (<p></p>)}

            <h4>Install Status: <span className={vehicle.liftStatus}><strong>{vehicle.liftStatus}</strong></span></h4>
            <ToggleButton
              value={this.state.arrayValue[index][theCheck]}
              onToggle={(value) => {
                this.state.arrayValue[index][theCheck] = !value;
                this.setState(this.state)
              }} />
            <div>
              {this.state.arrayValue[index][theCheck] ? (
                <LiftOption theVehicle={vehicle} theReload={this.reloadComponent.bind(this)} />
              ) : (
                  <p>Turn ON to change kit and add note</p>
                )}
            </div>
          </li>
        </div>
      );
    });
  }

  sendClearSearch() {
    this.getSavedLiftData();
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
                  <i className="fa fa-download" aria-hidden="true"></i> Lift Inventory</strong>
                </h1>
                <Filter filteredSearch={this.handleFilteredSearch} workFrom={this.state.workFrom} savedVehicles={this.state.savedVehicles} theReload={this.reloadComponent.bind(this)}
                  sendClearSearchLift={this.sendClearSearch.bind(this)} renderedFrom={this.props.location.pathname} />
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
export default Lift;
