// Include React as a dependency
import React, { Component } from 'react'
import "./Filter.css";

class Filter extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
    value: 'lastsix', 
    searchText:'',
    searchLocation:'pending',
    searchedFrom:'',
    leatherStatus:''
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
    if (this.state.value == "location" ){
      searchItem = this.state.searchLocation;
      searchType = this.state.value;
    }
    else if (this.state.value == "jobStatus" && this.state.searchedFrom == 'leather' ){

      searchItem = this.state.leatherStatus;
      searchType = 'leatherStatus';
    } else {
       searchType = this.state.value;
       searchItem = this.state.searchText;
    }
    
    console.log("im submitting", searchType,searchItem);
    event.preventDefault();
    // console.log(this.state.searchText);
    this.props.filteredSearch(searchType,searchItem)
  }

  selectOne = () => {
    if (this.state.value == 'location'){
      return (
        <label>
        Current Location:
        <br/>
      <select className="form-control" type="string" name="searchText" value={this.state.searchLocation} onChange={this.handleLocation} >
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
    } else {
      return (
        <label>
        Leather Status:
    <select className="form-control" type="string" name="leatherStatus" value={this.state.leatherStatus} onChange={this.handleStatusChange} >
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



  render() {
    var displayedField;
    var theStateValue;
    if (this.state.value == "location" ){
      theStateValue = "location"
    }else if(this.state.value == "jobStatus" ){
      theStateValue = "jobStatus"
    }else{
      theStateValue = "other"
    }
console.log("from filter",this.state);

    return (
      <form onSubmit={this.handleSubmit}>
        <label>
          SEARCH BY:
          <select  className="form-control" value={this.state.value} onChange={this.handleChange}>
          <option value="last_six">Last six</option>
          <option value="vin">VIN</option>
           <option value="make">Make</option>
           <option value="model">Model</option>
           <option value="year">Year</option>
           <option value="location">Location</option>
           <option value="jobStatus">Job Status</option>
          </select>
        </label>

        {theStateValue == 'other'  ?
         this.searchInput() :this.selectOne()  }
     <label>
        <input className="form-control" type="submit" value="Submit"/>
     </label>
      </form>
    );
  }
}
export default Filter;