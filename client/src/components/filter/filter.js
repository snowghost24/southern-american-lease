
import React, { Component } from 'react'
import axios from "axios"
import Modal from 'react-modal';
import API from "../../utils/API";
import { Input } from "../../components/Form";
import { Link } from "react-router-dom";
import ToggleButton from 'react-toggle-button'
import "./Filter.css";
import { Col, Row, Container } from "../../components/Grid";
import { FormGroup, FormControl } from 'react-bootstrap';
import { ButtonDropdown, DropdownToggle, DropdownMenu, DropdownItem } from 'reactstrap';
import { Button, ButtonGroup,Collapse, CardBody, Card , Alert } from 'reactstrap';
import swal from 'sweetalert';

// this is used to create pdfs
var pdfMake = require('pdfmake/build/pdfmake.js')
var pdfFonts = require('pdfmake/build/vfs_fonts.js')
pdfMake.vfs = pdfFonts.pdfMake.vfs;

const customStyles = {
  content : {
    top                   : '50%',
    left                  : '50%',
    right                 : 'auto',
    bottom                : 'auto',
    marginRight           : '-50%',
    transform             : 'translate(-50%, -50%)'
  }
};



class Filter extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      value: 'lastsix',
      searchText: '',
      searchLocation: '',
      searchedFrom: '',
      leatherStatus: '',
      releasedStatus: '',
      isActive: false,
      toggleButtonValue: false,
      savedVehicles:[]

    };

    this.handleChange = this.handleChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
    this.sendClearSearch = this.sendClearSearch.bind(this);
    this.openPDF = this.openPDF.bind(this);
  }

  componentDidMount = () => {
    if (this.props.workFrom) {
      this.setState({
        searchedFrom: this.props.workFrom
      });
    }
    console.log("the props in filter are",this.props);
  }

  componentWillReceiveProps(props){
   this.setState({
     savedArticles:props.savedVehicles
   })
  }


  typeChange = (e) => {
    this.setState({ searchText: e.target.value })
  }

  handleChange(event) {
    this.setState({ value: event.target.value });
  }

  handleLocation = (e) => {
    this.setState({ searchLocation: e.target.value })
  }

  handleStatusChange = (e) => {
    this.setState({ leatherStatus: e.target.value })
  }

  handleReleaseChange = (e) => {
    this.setState({ releasedStatus: e.target.value })
  }

  //------------- This function handles making pdfs ------------------
  openPDF() {
    if (this.props.renderedFrom === "/saved") {
      var pdfData = [];
      var options = this.props.inventoryState.savedArticles;
      function Person(vin, make, model, year,miles, trim, price , days, location) {
        this.vin = vin;
        this.make = make;
        this.model = model;
        this.year = year;
        this.miles = miles
        this.trim = trim;
        this.price = price;
        this.days = days;
        this.location = location
      }

      function daysEntered(passDate) {
        var dayEntered = new Date(passDate).getTime();
        var now = Date.now();
        var elapsedTime = now - dayEntered;
        var day = Math.floor(elapsedTime / 8.64e+7);
        return day
      }

      function convertNumbersToStrings(theString) {
        var theStringParsed;
        if (theString == undefined){
           theStringParsed = "" 
          console.log("undefined price", theString);
        } else{
          theString = `${theString}`
          var frontLenght = theString.length - 3;
          var front = theString.slice(0,frontLenght);
          var back = theString.slice(frontLenght);
           theStringParsed = `${front},${back}`
        }
        return theStringParsed; 
      }

      function stringConstructor(theLocation){
        var fixedLocation;

        if (theLocation === undefined){
          fixedLocation = ""; 
        } else {
          var fixedLocation = theLocation;
        }
        return fixedLocation;
      
      }


      for (var i = 0; i < options.length; i += 1) {
        var newObj = new Person(options[i].vin, options[i].make, options[i].model,options[i].year,convertNumbersToStrings(options[i].miles),  options[i].trim, convertNumbersToStrings(options[i].price) , daysEntered(options[i].date), stringConstructor(options[i].location))
        pdfData.push(newObj);
      }

      function buildTableBody(data) {
        var body = [];
        var columns = ['vin', 'make', 'model', 'year','miles','trim', 'price','days','location'];
        body.push(columns);
        data.forEach(function (row) {
          var dataRow = [];
          columns.forEach(function (column) {
            dataRow.push(row[column].toString());
            console.log(dataRow);
          })
          body.push(dataRow);
        });
        return body;
      }

      buildTableBody(pdfData)
      var dd = {
        pageOrientation: 'landscape',
        content: [
          { text: 'Vehicle Invertory', margin: [0, 20, 0, 8], style: 'header' },
          {
            style: 'tableExample',
            table: {
              headerRows: 1,
              body: buildTableBody(pdfData)
            },
            layout: {
              fillColor: function (row, col, node) { return row > 0 && row % 2 ? '#CCCCCC' : null; }
            }
          }
        ], styles: {
          header: {
            fontSize: 18,
            bold: true,
            margin: [0, 0, 0, 10]
          },
          subheader: {
            fontSize: 16,
            bold: true,
            margin: [0, 10, 0, 5]
          },
          tableExample: {
            margin: [0, 5, 0, 15]
          },
          tableHeader: {
            bold: true,
            fontSize: 13,
            color: 'black'
          }
        },
      }
      pdfMake.createPdf(dd).download();
      // pdfMake.createPdf(dd).open({}, window);
    } else if (this.props.renderedFrom === "/inventory/" ) {
      console.log('rendered from inventory');
      console.log("Leather", this.props.inventoryState.savedArticles);
      var pdfData = [];
      var options = this.props.inventoryState.savedArticles;
      function Person(vin, make, model, year,miles, trim, color , fuelType, keyfeatures
      ) {
        this.vin = vin;
        this.make = make;
        this.model = model;
        this.year = year;
        this.miles = miles
        this.trim = trim;
        this.color = color;
        this.fuelType = fuelType;
        this.keyfeatures = keyfeatures;
      }

      function daysEntered(passDate) {
        var dayEntered = new Date(passDate).getTime();
        var now = Date.now();
        var elapsedTime = now - dayEntered;
        var day = Math.floor(elapsedTime / 8.64e+7);
        return day
      }

      function convertNumbersToStrings(theString) {
        var theStringParsed;
        if (theString == undefined){
           theStringParsed = "" 
          console.log("undefined price", theString);
        } else{
          theString = `${theString}`
          var frontLenght = theString.length - 3;
          var front = theString.slice(0,frontLenght);
          var back = theString.slice(frontLenght);
           theStringParsed = `${front},${back}`
        }
        return theStringParsed; 
      }

      function stringConstructor(theLocation){
        var fixedLocation;

        if (theLocation === undefined){
          fixedLocation = ""; 
        } else {
          var fixedLocation = theLocation;
        }
        return fixedLocation;
      
      }


      for (var i = 0; i < options.length; i += 1) {
        var newObj = new Person(options[i].vin, options[i].make, options[i].model,options[i].year,convertNumbersToStrings(options[i].miles), options[i].trim, stringConstructor(options[i].color) ,stringConstructor(options[i].fuelType) , stringConstructor(options[i].keyfeatures
        ))
        pdfData.push(newObj);
      }

      function buildTableBody(data) {
        var body = [];
        var columns = ['vin', 'make', 'model', 'year','miles','trim', 'color','fuelType','keyfeatures'];
        body.push(columns);
        data.forEach(function (row) {
          var dataRow = [];
          columns.forEach(function (column) {
            dataRow.push(row[column].toString());
            console.log(dataRow);
          })
          body.push(dataRow);
        });
        return body;
      }

      buildTableBody(pdfData)
      var dd = {
        pageOrientation: 'landscape',
        content: [
          { text: 'Vehicle Invertory', margin: [0, 20, 0, 8], style: 'header' },
          {
            style: 'tableExample',
            table: {
              headerRows: 1,
              body: buildTableBody(pdfData)
            },
            layout: {
              fillColor: function (row, col, node) { return row > 0 && row % 2 ? '#CCCCCC' : null; }
            }
          }
        ], styles: {
          header: {
            fontSize: 18,
            bold: true,
            margin: [0, 0, 0, 10]
          },
          subheader: {
            fontSize: 16,
            bold: true,
            margin: [0, 10, 0, 5]
          },
          tableExample: {
            margin: [0, 5, 0, 15]
          },
          tableHeader: {
            bold: true,
            fontSize: 13,
            color: 'black'
          }
        },
      }
      pdfMake.createPdf(dd).download();


    }else if (this.props.renderedFrom === "/leather" ) {
      console.log("saved vehicle props", this.state.savedArticles);

      var pdfData = [];
      var options = this.state.savedArticles;
      function Person(vin, make, model, year,miles, trim, color , leatherStatus, location) {
        this.vin = vin;
        this.make = make;
        this.model = model;
        this.year = year;
        this.miles = miles
        this.trim = trim;
        this.color = color;
        this.leatherStatus = leatherStatus;
        this.location = location
      }

      function daysEntered(passDate) {
        var dayEntered = new Date(passDate).getTime();
        var now = Date.now();
        var elapsedTime = now - dayEntered;
        var day = Math.floor(elapsedTime / 8.64e+7);
        return day
      }

      function convertNumbersToStrings(theString) {
        var theStringParsed;
        if (theString == undefined){
           theStringParsed = "" 
          console.log("undefined price", theString);
        } else{
          theString = `${theString}`
          var frontLenght = theString.length - 3;
          var front = theString.slice(0,frontLenght);
          var back = theString.slice(frontLenght);
           theStringParsed = `${front},${back}`
        }
        return theStringParsed; 
      }

      function stringConstructor(theLocation){
        var fixedLocation;

        if (theLocation === undefined){
          fixedLocation = ""; 
        } else {
          var fixedLocation = theLocation;
        }
        return fixedLocation;
      
      }


      for (var i = 0; i < options.length; i += 1) {
        var newObj = new Person(options[i].vin, options[i].make, options[i].model,options[i].year,convertNumbersToStrings(options[i].miles),  options[i].trim, stringConstructor(options[i].color) , stringConstructor(options[i].leatherStatus), stringConstructor(options[i].location))
        pdfData.push(newObj);
      }

      function buildTableBody(data) {
        var body = [];
        var columns = ['vin', 'make', 'model', 'year','miles','trim', 'color','leatherStatus','location'];
        body.push(columns);
        data.forEach(function (row) {
          var dataRow = [];
          columns.forEach(function (column) {
            dataRow.push(row[column].toString());
            console.log(dataRow);
          })
          body.push(dataRow);
        });
        return body;
      }

      buildTableBody(pdfData)
      var dd = {
        pageOrientation: 'landscape',
        content: [
          { text: 'Vehicle Invertory', margin: [0, 20, 0, 8], style: 'header' },
          {
            style: 'tableExample',
            table: {
              headerRows: 1,
              body: buildTableBody(pdfData)
            },
            layout: {
              fillColor: function (row, col, node) { return row > 0 && row % 2 ? '#CCCCCC' : null; }
            }
          }
        ], styles: {
          header: {
            fontSize: 18,
            bold: true,
            margin: [0, 0, 0, 10]
          },
          subheader: {
            fontSize: 16,
            bold: true,
            margin: [0, 10, 0, 5]
          },
          tableExample: {
            margin: [0, 5, 0, 15]
          },
          tableHeader: {
            bold: true,
            fontSize: 13,
            color: 'black'
          }
        },
      }
      pdfMake.createPdf(dd).download();


    }
  }

  //--------------- ends making pdf Function---------------------

  // handles submit of search from 
  handleSubmit(event) {
    event.preventDefault();
    var searchItem;
    var searchType;
    if (this.state.value === " ") { 
    }
    else if (this.state.value === "location") {
      searchItem = this.state.searchLocation;
      searchType = this.state.value;
    }
    else if (this.state.value === "jobStatus" && this.state.searchedFrom === 'leather') {
      searchItem = this.state.leatherStatus;
      searchType = 'leatherStatus';
    } else if (this.state.value === "released") {
      searchType = this.state.value;
      searchItem = this.state.releasedStatus;
    } else {
      searchType = this.state.value;
      searchItem = this.state.searchText;
    }

    this.props.filteredSearch(searchType, searchItem)
  }

  selectOne = () => {
    if (this.state.value === 'location') {
      return (
        <select className="form-control input-group" type="string" name="searchText" value={this.state.searchLocation} onChange={this.handleLocation} >
          <option value="">Select Option</option>
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
      );
    } else if (this.state.value === 'released') {
      return (

        <select className="form-control" type="string" name="searchText" value={this.state.releasedStatus} onChange={this.handleReleaseChange} >
          <option value="">Select Option</option>
          <option value="pending released">Pending Release</option>
          <option value="relased">Released</option>
          <option value="released intransit">Released Intransit</option>
          <option value="arrived">Arrived</option>
        </select>

      )
    } else {
      return (

        <select className="form-control" type="string" name="leatherStatus" value={this.state.leatherStatus} onChange={this.handleStatusChange} >
          <option value="">Select Option</option>
          <option value="Pending">Pending</option>
          <option value="Processing">Processing</option>
          <option value="Complete">Complete</option>
          <option value="na">na</option>
        </select>
      )
    }
  }

  searchInput = () => {
    return (
      <input type="text" className="form-control" placeholder="Search for..." value={this.state.searchText} onChange={this.typeChange} />
    )
  }



  // used to togle modal 
  toggleModal = () => {
    this.setState({
      isActive: !this.state.isActive
    })
  }

  renderShowHide() {
    if (this.state.searchedFrom === 'leather') {
      return <Button className="btn btn-info" onClick={() => this.toggleModal()}>Hidden Vehicles</Button>
    }
      // <Button className="btn btn-info" onClick={this.openPDF.bind(this)}>Print</Button>{
  }

  bringBackItem = () => {
    if (this.props.renderedFrom === "/leather"){
      console.log(this.props.renderedFrom);
      var bringBackVin = this.refs.newText.value;
      API.bringBackLeatherHandler(bringBackVin)
        .then(res => {
          if (res.data.leatherHide === false) {
            swal({
              icon: "success",
              title: `Success`,
              text: `Vehicle ${res.data.vin} is back in inventory`,
            })
            this.props.theReload()
          }else{
            swal({
              icon: "error",
              title: 'Sorry system was unable to find this vehicle!',
              text: 'Try Another Search',
            })
          }
        })
        .catch(err => console.log(err));
    } else if (this.props.renderedFrom === "/lift"){
      var bringBackVin = this.refs.newText.value;
      API.bringBackLiftHandler(bringBackVin)
        .then(res => {
          if (res.data.liftHide === false) {
            swal({
              icon: "success",
              title: `Success`,
              text: `Vehicle ${res.data.vin} is back in inventory`,
            })
            this.props.theReload()
          } else{
            swal({
              icon: "error",
              title: 'Sorry system was unable to find this vehicle!',
              text: 'Try Another Search',
            })
          }
        })
        .catch(err => console.log(err));
    } else if (this.props.renderedFrom === "/detail"){
      var bringBackVin = this.refs.newText.value;
      API.bringBackDetailHandler(bringBackVin)
        .then(res => {
          if (res.data.detailHide === false) {
            swal({
              icon: "success",
              title: `Success`,
              text: `Vehicle ${res.data.vin} is back in inventory`,
            })
            this.props.theReload()
          } else{
            swal({
              icon: "error",
              title: 'Sorry system was unable to find this vehicle!',
              text: 'Try Another Search',
            })
          }
        })
        .catch(err => console.log(err));
    }
  
  };

  // bringBackLift = () => {
  //   var bringBackVin = this.refs.newText.value;
  //   API.bringBackLiftHandler(bringBackVin)
  //     .then(res => {
  //       if (res.data.liftHide === false) {
  //         this.props.theReload()
  //       }
  //       console.log(res);
  //     })
  //     .catch(err => console.log(err));
  // };

  // if the location viewed from is saved render the toggle delete button
  // then if toggle delete button is true then render the delete buttons 
  showDeleteButton() {
    return (
      <div>
        {this.props.renderedFrom === "/saved" ? (

          <div className="row" style={{ marginLeft: 5, marginTop: 15 }}>
            <Row>
              <Col size="sm-1">
                <ToggleButton
                  value={this.state.toggleButtonValue || false}
                  onToggle={(value) => {
                    this.setState({
                      toggleButtonValue: !value,
                    }, () => { this.sendUpToggleButtonValue() })
                  }} />
              </Col>
              <Col size="sm-10">
                <p>Turn ON Delete Option</p>
              </Col>
            </Row>
          </div>) : null
        }
      </div>
    )
  }

  // allows you to togle between rendering delete and not
  sendUpToggleButtonValue() {
    this.props.toggleButtonEditor(this.state.toggleButtonValue)
  }

  // clears form depending on the location 
  sendClearSearch(e) {
    e.preventDefault()
    if (this.props.renderedFrom === "/saved") {
      this.props.sendClearSearchInventory()
    } else if (this.props.renderedFrom === "/inventory/") {
      this.props.sendClearSearchInventoryClient()
    } else if (this.props.renderedFrom === "/leather") {
      this.props.sendClearSearchLeather()
    }else if (this.props.renderedFrom === "/lift") {
      this.props.sendClearSearchLift()
    }else if (this.props.renderedFrom === "/detail") {
      this.props.sendClearSearchDetail()
    }
  }



  displayMakertingButton() {
    if (this.props.renderedFrom === "/saved") {
      if (this.props.isCreating) {
        return (
          <span>
            <Button className="btn btn-warning" onClick={this.props.handleCreateClick}> Close Market </Button>
            <Button className="btn btn-info" onClick={this.props.toggleModalInventory}>Email </Button>
          </span>
        );
      } else {
        return (
          <Button className="btn btn-info" onClick={this.props.handleCreateClick}> Edit Market </Button>
        );
      }
    }
  }

  searchSelectConditional() {
    if (this.props.renderedFrom === "/saved") {
return (
  <FormControl componentClass="select" placeholder="select" value={this.state.value} onChange={this.handleChange}>
  <option value="">Select Option</option>
  <option value="lastsix">Last six</option>
  <option value="vin">VIN</option>
  <option value="make">Make</option>
  <option value="model">Model</option>
  <option value="year">Year</option>
  <option value="location">Location</option>
  <option value="released">Released Status</option>
</FormControl>
)
    } else if (this.props.renderedFrom === "/inventory/"){
      return(
        <FormControl componentClass="select" placeholder="select" value={this.state.value} onChange={this.handleChange}>
        <option value="">Select Option</option>
        <option value="lastsix">Last six</option>
        <option value="vin">VIN</option>
        <option value="make">Make</option>
        <option value="model">Model</option>
        <option value="year">Year</option>
      </FormControl>
      )
    } else {
      return(
        <FormControl componentClass="select" placeholder="select" value={this.state.value} onChange={this.handleChange}>
        <option value="">Select Option</option>
        <option value="lastsix">Last six</option>
        <option value="vin">VIN</option>
        <option value="make">Make</option>
        <option value="model">Model</option>
        <option value="year">Year</option>
        <option value="location">Location</option>
        <option value="released">Released Status</option>
        <option value="jobStatus">Job Status</option>
      </FormControl>
      )
    }
  }


  render() {
    var theStateValue;
    if (this.state.value === "location") {
      theStateValue = "location"
    } else if (this.state.value === "jobStatus") {
      theStateValue = "jobStatus"
    } else if (this.state.value === "released") {
      theStateValue = "released"
    } else {
      theStateValue = "other"
    }


    return (
      <div>
        <nav className="navbar navbar-default">
          <div className="container-fluid">
            <div className="navbar-collapse" id="bs-example-navbar-collapse-1">
              <form className="navbar-form navbar-left" role="search" onSubmit={this.handleSubmit}>
                <FormGroup controlId="formControlsSelect">
                {this.searchSelectConditional()}
                </FormGroup>
                <div className="form-group">
                  {theStateValue === 'other' ? this.searchInput() : this.selectOne()}
                </div>
                <button type="submit" className="btn btn-success form-control">Submit</button>
              </form>
              <ButtonGroup className="navbar-form navbar-right" style={{ marginTop: 9 }}>
                <Button className="btn btn-default" onClick={this.sendClearSearch}>Clear</Button>{' '}
                <Button className="btn btn-danger" onClick={this.openPDF}>Print</Button>{' '}
                {this.displayMakertingButton()}
              </ButtonGroup>
            </div>
          </div>
        </nav>

        <div>         
          {this.showDeleteButton()}
        </div>
        {this.state.searchedFrom === 'leather' ? <Button className="btn btn-info form-control" onClick={() => this.toggleModal()}>Hidden Vehicles</Button> : null}
        {this.state.searchedFrom === 'lift' ? <Button className="btn btn-info form-control" onClick={() => this.toggleModal()}>Hidden Vehicles</Button> : null}
        {this.state.searchedFrom === 'detail' ? <Button className="btn btn-info form-control" onClick={() => this.toggleModal()}>Hidden Vehicles</Button> : null}

        

        <Modal style={{
          overlay: {
            position: 'fixed',
            top: 0,
            left: 0,
            right: 0,
            bottom: 0,
            backgroundColor: 'rgba(255, 255, 255, 0.75)'
          },
          content: {
            position: 'absolute',
            top: '40px',
            left: '40px',
            right: '40px',
            bottom: '40px',
            border: '1px solid #ccc',
            background: '#fff',
            // overflow: 'auto',
            WebkitOverflowScrolling: 'touch',
            borderRadius: '4px',
            outline: 'none',
            padding: '20px'
          }
        }} className="modal-dialog" role="document" isOpen={this.state.isActive} ariaHideApp={false}>
          <div className="modal-header">
            <h3 className="modal-title" id="exampleModalLabel">Use form to bring back a vehicle</h3>
            <div className="modal-content">
            </div>
            </div>
            <div className="modal-body">
              <p>Enter full VIN or Last six of Vehicle </p>
              <div id="addNote">
                <input className="form-control" ref="newText" type="text" />
              </div>            </div>
            <div className="modal-footer">
              <button type="button" className="btn btn-primary" onClick={() => this.bringBackItem()} >Bring It Back</button>
              <button type="button" onClick={() => this.toggleModal()} className="btn btn-secondary" data-dismiss="modal">Close</button>
            </div>
        
        </Modal>
      </div>
    );
  }
}
export default Filter;


