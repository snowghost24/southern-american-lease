// Include React as a dependency
import React, { Component } from 'react'
import "./Filter.css";

class Filter extends React.Component {
  constructor(props) {
    super(props);
    this.state = {value: 'lastsix', searchText: ''};

    this.handleChange = this.handleChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
  }

  typeChange = (e)=>{
    this.setState({searchText: e.target.value})
  }

  handleChange(event) {
    this.setState({value: event.target.value});
  }

  handleSubmit(event) {
    var searchType = this.state.value;
    var searchItem = this.state.searchText;
    alert('Your favorite flavor is: ' + this.state.value);
    event.preventDefault();
    this.props.filteredSearch(searchType,searchItem)
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
          </select>
        </label>
        <label>
          <input className="form-control" placeholder="search" type="text" value={this.state.searchText} onChange={this.typeChange}/>
     </label>
     <label>
        <input className="form-control" type="submit" value="Submit"/>
     </label>
      </form>
    );
  }
}
export default Filter;