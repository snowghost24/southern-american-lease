
import React, { Component } from 'react'
import axios from "axios"
import JsPDF from "../JsPDF";
import Modal from 'react-modal';
import API from "../../utils/API";
import { Input } from "../../components/Form";
import { Link } from "react-router-dom";
import ToggleButton from 'react-toggle-button'
import "./Filter.css";
import { Col, Row, Container } from "../../components/Grid";

// this is used to create pdfs
var pdfMake = require('pdfmake/build/pdfmake.js')
var pdfFonts = require('pdfmake/build/vfs_fonts.js')
pdfMake.vfs = pdfFonts.pdfMake.vfs;

// These are used to render buttons conditionally
function CreateButton(props) {
  return (
    <button className="btn btn-info" onClick={props.onClick}>
    Market Invertory
    </button>

  );
}

function CloseInventoryButton(props) {
  return (
    <div>
      <button className="btn btn-info" onClick={props.onClick}>
        Close Marketing
    </button>
    </div>
  );
}


function SendInventoryButton(props) {
  return (
    <button className="btn btn-danger" onClick={props.onClick}>
      Compose Emails
    </button>
  );
}


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

    };

    this.handleChange = this.handleChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
  }

  componentDidMount = () => {
    if (this.props.workFrom) {
      this.setState({
        searchedFrom: this.props.workFrom
      });
    }
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
    if (this.props.inventoryState) {
      var pdfData = [];
      var options = this.props.inventoryState.savedArticles;
      function Person(vin, make, model, year, days) {
        this.vin = vin;
        this.make = make;
        this.model = model;
        this.year = year;
        this.days = days
      }

      function daysEntered(passDate) {
        var dayEntered = new Date(passDate).getTime();
        var now = Date.now();
        var elapsedTime = now - dayEntered;
        var day = Math.floor(elapsedTime / 8.64e+7);
        return day
      }

      for (var i = 0; i < options.length; i += 1) {
        var newObj = new Person(options[i].vin, options[i].make, options[i].model, options[i].year, daysEntered(options[i].date))
        pdfData.push(newObj);
      }

      function buildTableBody(data) {
        var body = [];
        var columns = ['vin', 'make', 'model', 'year', 'days'];
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

      pdfMake.createPdf(dd).open({}, window);
    } else if (this.props.savedVehicles) {
      //set printing options for leather and others 
      console.log("Leather", this.props.savedVehicles);
    }
  }

  //--------------- ends making pdf Function---------------------

  // handles submit of search from 
  handleSubmit(event) {
    event.preventDefault();
    var searchItem;
    var searchType;
    if (this.state.value === "location") {
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
          <select className="form-control" type="string" name="searchText" value={this.state.searchLocation} onChange={this.handleLocation} >
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
     
      <input type="text" className="form-control" placeholder="Search for..." value={this.state.searchText} onChange={this.typeChange}/>
 

    )}



// used to togle modal 
  toggleModal = () => {
    this.setState({
      isActive: !this.state.isActive
    })
  }

  renderShowHide() {
    if (this.state.searchedFrom === 'leather') {
      return <button className="btn btn-info" onClick={() => this.toggleModal()}>Hidden Vehicles</button>
    }
  }

  bringBackLeather = () => {
    var bringBackVin = this.refs.newText.value;
    API.bringBackLeatherHandler(bringBackVin)
      .then(res => {
        if (res.data.leatherHide === false) {
          this.props.theReload()
        }
        console.log(res);
      })
      .catch(err => console.log(err));
  };


  // if the location viewed from is saved render the toggle delete button
  // then if toggle delete button is true then render the delete buttons 
  showDeleteButton() {
    return (
      <div>
        {this.props.renderedFrom === "/saved" ? (
      
          <div className="row" style={{marginLeft:5, marginTop:10}}>
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
              
            <p>Turn ON Delete Option</p>
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
  sendClearSearch() {
    if (this.props.renderedFrom === "/saved") {
      this.props.sendClearSearchInventory()
    } else if (this.props.renderedFrom === "/inventory/") {
      this.props.sendClearSearchInventoryClient()
    } else if (this.props.renderedFrom === "/leather") {
      this.props.sendClearSearchLeather()
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

    // if the location is saved show the create inventory button
    // if the create inventory is true then to display open model else close it
    let button = null;
    if (this.props.renderedFrom === "/saved") {
      if (this.props.isCreating) {
        button = <div><CloseInventoryButton onClick={this.props.handleCreateClick} />
          <SendInventoryButton onClick={this.props.toggleModalInventory} />
        </div>;
      } else {
        button = <CreateButton onClick={this.props.handleCreateClick} />;
      }
    }

    return (
      <div>
        <form onSubmit={this.handleSubmit}>
          <div className="row">
            <div className="col-lg-2">
              <div className="input-group" role="group" aria-label="...">
                <select className="form-control" value={this.state.value} onChange={this.handleChange}>
                  <option value="">Select Option</option>
                  <option value="lastsix">Last six</option>
                  <option value="vin">VIN</option>
                  <option value="make">Make</option>
                  <option value="model">Model</option>
                  <option value="year">Year</option>
                  <option value="location">Location</option>
                  <option value="released">Released Status</option>
                  <option value="jobStatus">Job Status</option>
                </select>

                   </div>
                </div>
              <div className="col-lg-4 ">    
              <div className="input-group">

                {theStateValue === 'other' ? this.searchInput() : this.selectOne()}
                <span className="input-group-btn">
        <button className="btn btn-success" type="submit">Submit</button>
                 </span>
              </div>
            </div>
            <div className="col-lg-6"> 
            <div className="btn-group pull-right" role="group" aria-label="...">
        <input className="btn btn-default" type="submit" value="Clear Search" onClick={this.sendClearSearch.bind(this)} />
        <button className="btn btn-danger" onClick={this.openPDF.bind(this)}>Print Inventory</button>
          {button}
          {this.renderShowHide()}
        </div>
            </div>
          </div>
        </form>
       
       
        
    

     
        <div>
          {this.showDeleteButton()}
        </div>
      
        <Modal className="modal-dialog" role="document" isOpen={this.state.isActive} ariaHideApp={false}>
          <div className="modal-content">
            <div className="modal-header">
              <h3 className="modal-title" id="exampleModalLabel">Use form to bring back a vehicle</h3>
            </div>
            <div className="modal-body">
              <p>Enter full VIN or Last six of Vehicle </p>
              <div id="addNote">
                <input className="form-control" ref="newText" type="text" />
              </div>
            </div>
            <div className="modal-footer">
              <button type="button" className="btn btn-primary" onClick={() => this.bringBackLeather()} >Bring It Back</button>
              <button type="button" onClick={() => this.toggleModal()} className="btn btn-secondary" data-dismiss="modal">Close</button>
            </div>
          </div>
        </Modal>
      </div>
    );
  }
}
export default Filter;


