// Include React as a dependency
import React, { Component } from 'react'
import "./Filter.css";
var pdfMake = require('pdfmake/build/pdfmake.js')
var pdfFonts = require('pdfmake/build/vfs_fonts.js');
pdfMake.vfs = pdfFonts.pdfMake.vfs; 
var docDefinition = { content: 'This is an sample PDF printed with pdfMake' };

class Filter extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
    value: 'lastsix', 
    searchText:'',
    searchLocation:'',
    searchedFrom:'',
    leatherStatus:'',
    releasedStatus:'' 
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


  openPDF(event){
    event.preventDefault()
    pdfMake.createPdf(docDefinition).open({}, window)

    return false;
      }

      consolee(){
        if (this.props.inventoryState){
          console.log("Inventory", this.props.inventoryState);
        } else if (this.props.savedVehicles){
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
      <button className="btn btn-danger"onClick={this.openPDF}>Print Results</button>
      <a href="/JsPDF" target='_blank' onClick={this.
      consolee.bind(this)}> Click to Open PDF</a>
      </div> 
    );
  }
}
export default Filter;


