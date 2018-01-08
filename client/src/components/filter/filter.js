// Include React as a dependency
import React, { Component } from 'react'
import "./Filter.css";

// export default class Filter extends Component {
//   constructor(props) {
//     super();
//     this.state = {
//       value: '',
//       searchText: ''
//     };

//     this.handleChange = this.handleCatagoryChange.bind(this);
//     // this.handleSubmit = this.handleSubmit.bind(this);
//   }
  

//   handleCatagoryChange(event) {
//     this.setState({value: event.target.value});
//   }
  
  
//   onSearchChange = e => {
//     this.setState({ searchText: e.target.value });
//   }
  
//   handleSubmit = e => {
//     e.preventDefault();
//     this.props.onSearch(this.state.searchText);
//     e.currentTarget.reset();
//   }
  
//   render() {  
//     return (
//       <form className="search-form" onSubmit={this.handleSubmit} >
//        <label>
//           Search by
//         <select value={this.state.value} onChange={this.handleCatagoryChange}>
//             <option value="last_eight">Last 8</option>
//             <option value="vin">VIN</option>
//             <option value="make">Make</option>
//             <option value="model">Model</option>
//           </select>
//         </label>
//         <label className="is-hidden" htmlFor="search">Search</label>
       
//         <input type="search" 
//                onChange={this.onSearchChange}
//                name="search" 
//                placeholder="Search..." />
//         <button type="submit" id="submit" className="search-button"><i className="material-icons icn-search">search</i></button>
//       </form>      
//     );
//   }
// }


// class Filter extends React.Component {
//   constructor(props) {
//     super(props);
//     this.state = {
//       selectedValue: '', 
//       searchText: ''
//     };

//     this.handleInputChange = this.handleInputChange.bind(this);
//     this.typeChange = this.typeChange.bind(this);
//     this.handleSubmit = this.handleSubmit.bind(this);
//   }


//   handleInputChange(e) {
//     this.setState(this.state)
//     let value = e.target.type === 'checkbox' ? e.target.checked : e.target.value.toUpperCase();
//     let name = e.target.name;
//     this.setState({
//       [name]: value
//     })
//   }

//   typeChange = (e)=>{
//     this.setState({
//       searchText: e.target.value
      
//     })
//   }

//   handleSubmit(event) {
//     // alert('Your favorite flavor is: ' + this.state.selectedValue);
//     event.preventDefault();
//     console.log(this.state);
//   }

//   render() {
//     return (
//       <form onSubmit={this.handleSubmit}>
//         <label>
//           Search By:
//           <select className="form-control"  name="selectedValue" value="omg" onChange={this.handleInputChange}>
//             <option value="last_six">Last 6</option>
//             <option value="vin">VIN</option>
//             <option value="make">Make</option>
//             <option value="model">Model</option>
//           </select>
//         </label>
//         <label>
//           Search:
          
//           <input className="form-control" type="text" value={this.state.searchText} onBlur={this.handleInputChange} onChange={this.typeChange}/>
//         </label>
        
                      
//         <input className="form-control" type="submit" value="Submit" />
//       </form>
//     );
//   }
// }

class Filter extends React.Component {
  constructor(props) {
    super(props);
    this.state = {value: 'coconut', searchText: ''};

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
    alert('Your favorite flavor is: ' + this.state.value);
    event.preventDefault();
  }

  render() {
    return (
      <form onSubmit={this.handleSubmit}>
        <label>
          SEARCH BY:
          <select  className="form-control" value={this.state.value} onChange={this.handleChange}>
          <option value="last_six">Last 6</option>
          <option value="vin">VIN</option>
           <option value="make">Make</option>
           <option value="model">Model</option>
          </select>
        </label>
        <label>
          <input className="form-control" placeholder="search" type="text" value={this.state.searchText} onChange={this.typeChange}/>
     </label>
     <label>
        <input className="form-control" type="submit" value="Submit" />
     </label>
      </form>
    );
  }
}
export default Filter;