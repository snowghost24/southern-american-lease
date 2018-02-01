// Include React as a dependency
import React, { Component } from 'react'
import "./Filter.css";
import axios from "axios"
import JsPDF from "../JsPDF";
import Modal from 'react-modal';
var pdfMake = require('pdfmake/build/pdfmake.js')
var pdfFonts = require('pdfmake/build/vfs_fonts.js')
pdfMake.vfs = pdfFonts.pdfMake.vfs; 


class Filter extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
    value: 'lastsix', 
    searchText:'',
    searchLocation:'',
    searchedFrom:'',
    leatherStatus:'',
    releasedStatus:'',
    isActive: false 
  };
    this.handleChange = this.handleChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
  }

  typeChange = (e)=>{
    this.setState({searchText: e.target.value})
  }

  handleChange(event) {
    this.setState({value: event.target.value});
  }

  handleLocation = (e)=>{
    this.setState({searchLocation: e.target.value})
  }

  handleStatusChange = (e)=>{
    this.setState({leatherStatus: e.target.value})
  }
  
  handleReleaseChange = (e)=>{
    this.setState({releasedStatus: e.target.value})
  }

  componentDidMount = ()=>{
    if (this.props.workFrom){
      this.setState({
        searchedFrom:this.props.workFrom
      });
    }
  }

// showing hidden items per page

showHiddenLeather(){
  console.log("ready");

}

toggleModal = () => {
  this.setState({
   isActive: !this.state.isActive
  })

 }

  renderShowHide(){
    if (this.state.searchedFrom === 'leather'){
      return   <button className="btn btn-info" onClick={() => this.toggleModal()}>Add Note</button>
      
      // <button className="btn btn-info"onClick={this.showHiddenLeather.bind(this)}>Find Hidden Vehicle</button>
    }
  }



 


  handleSubmit(event) {
    var searchItem;
    var searchType ;
    if (this.state.value === "location" ){
      searchItem = this.state.searchLocation;
      searchType = this.state.value;
    }
    else if (this.state.value === "jobStatus" && this.state.searchedFrom === 'leather' ){

      searchItem = this.state.leatherStatus;
      searchType = 'leatherStatus';
    } else if (this.state.value === "released" ){
       searchType = this.state.value;
       searchItem = this.state.releasedStatus;
    } else {
      searchType = this.state.value;
      searchItem = this.state.searchText;
   }
    // console.log("im submitting", searchType,searchItem);
    event.preventDefault();
    // console.log(this.state.searchText);
    this.props.filteredSearch(searchType,searchItem)
  }

  selectOne = () => {
    if (this.state.value === 'location'){
      return (
        <label>
        Current Location:
        <br/>
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
      </label>
      );
    }else if (this.state.value === 'released'){
      return (
      <label>
      Released Status:
    <select className="form-control" type="string" name="searchText" value={this.state.releasedStatus} onChange={this.handleReleaseChange} >
        <option value="">Select Option</option>
        <option value="pending released">Pending Release</option>
        <option value="relased">Released</option>
        <option value="released intransit">Released Intransit</option>
        <option value="arrived">Arrived</option>
      </select>
    </label>
      )
    } else {
      return (
        <label>
        Leather Status:
    <select className="form-control" type="string" name="leatherStatus" value={this.state.leatherStatus} onChange={this.handleStatusChange} >
    <option value="">Select Option</option>
          <option value="Pending">Pending</option>
          <option value="Processing">Processing</option>
          <option value="Complete">Complete</option>
          <option value="na">na</option>
        </select>
      </label>)
    }
  }

  searchInput = () => {
    return (
        <label>
          <input className="form-control" placeholder="search" type="text" value={this.state.searchText} onChange={this.typeChange}/>
        </label>)
  }


  

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
      //  pdfMake.createPdf(dd).download();

      pdfMake.createPdf(dd).open({}, window);
    } else if (this.props.savedVehicles) {
      //set printing options for leather
      console.log("Leather", this.props.savedVehicles);
    }

  }

  render() {
    var theStateValue;
    if (this.state.value === "location" ){
      theStateValue = "location"
    }else if(this.state.value === "jobStatus" ){
      theStateValue = "jobStatus"
    }else if(this.state.value === "released" ){
      theStateValue = "released"
    }else{
      theStateValue = "other"
    }
// console.log("from filter",this.state);

    return (
      <div>
      <form onSubmit={this.handleSubmit}>
        <label>
          SEARCH BY:
          <select  className="form-control" value={this.state.value} onChange={this.handleChange}>
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
        </label>

        {theStateValue === 'other'  ?
         this.searchInput() :this.selectOne()  }
     <label>
        <input className="form-control" type="submit" value="Submit"/>
     </label>
      </form>
      <button className="btn btn-danger"onClick={this.openPDF.bind(this)}>Download to Print Results</button>
      {this.renderShowHide()}


      {/* <a href="/JsPDF" target='_blank' onClick={this.
      consolee.bind(this)}> Click to Open PDF</a> */}
      <div>
     
      </div>

      <Modal className="modal-dialog" role="document" isOpen={this.state.isActive} ariaHideApp={false}>
       <div className="modal-content">
        <div className="modal-header">
         <h1 className="modal-title" id="exampleModalLabel">Notes For Article</h1>
         <button type="button" className="close" data-dismiss="modal" aria-label="Close">
          <span aria-hidden="true">&times;</span>
         </button>
        </div>
        <div className="modal-body">
         <p>Enter Note Here</p>
         <div id="addNote">
          <input ref="newText" type="text" />
         </div>
        </div>
        <div className="modal-footer">
         {/* <button type="button" className="btn btn-primary" onClick={() => this.noteBook(book._id)} >Save changes</button> */}
         <button type="button" onClick={() => this.toggleModal()} className="btn btn-secondary" data-dismiss="modal">Close</button>
        </div>
       </div>
      </Modal>
      </div> 
    );
  }
}
export default Filter;


