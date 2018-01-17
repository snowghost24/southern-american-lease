// Include React as a dependency
import React, { Component } from 'react'
import "./Filter.css";

class Filter extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
    value: 'lastsix', 
    searchText:'',
    searchLocation:'pending'
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


  handleSubmit(event) {
    var searchItem;
    if (this.state.value == "location" ){
      searchItem = this.state.searchLocation;
    }else{
      searchItem = this.state.searchText;
    }
    var searchType = this.state.value;
    
    event.preventDefault();
    console.log(this.state.searchText);
    this.props.filteredSearch(searchType,searchItem)
  }

  selectLocation = () => {
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
  }



  render() {
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
          </select>
        </label>

        {this.state.value == "location" ? this.selectLocation() :  <label>
          <input className="form-control" placeholder="search" type="text" value={this.state.searchText} onChange={this.typeChange}/>
     </label> }

    

     <label>
        <input className="form-control" type="submit" value="Submit"/>
     </label>
      </form>
    );
  }
}
export default Filter;