// Include React as a dependency
import React, { Component } from 'react'
import axios from "axios";

// Query Component Declaration
class Query extends Component {

  constructor(props){
    super(props)
    // API.changeBgc((err, data)=>this.getVehicleInfo(data));
  
}
  // Here we set initial variables for the component to be blanks
  state = {
    vin: "",
    make: "",
    model: "",
    year: ""
  }

  onNameChange = (e)=>{
    this.setState({
      vin: e.target.value
    })
  }

  getVehicleInfo = ()=>{
    var vin = { vin: this.state.vin};
    console.log('postSaved', vin)
    // makes sure you dont submit empty values
      if (vin.vin !== "") {
        axios.post("/api/saving/saved", vin)
        .then(function(response) {
          if (response.data.data == "No results found for this vin"){
          }else{
           
            console.log(results);

          //   for (var key in results) {
          //     // skip loop if the property is from prototype
          //     if (!results.hasOwnProperty(key)) continue;
          //     var obj = results[key];
          //     for (var prop in obj) {
          //         // skip loop if the property is from prototype
          //         if(!obj.hasOwnProperty(prop)) continue;
          // console.log(prop);
          // console.log(obj[prop]);  
          //     }
          // }  
          
          
          }
          
        }).catch(function (error) {
          console.log(error);
          alert("Invalid vin");
        });
      }else{
        console.log("vin is empty");
      }
  }

  // onBlur = () => {
  //   console.log("I'm on Blur")
  // }
  // Whenever we detect ANY change in the textbox, we register it.
  handleChange = (event) => {
    // Here we create syntax to capture any change in text to the query terms (pre-search).
    // See this Stack Overflow answer for more details:
    // http://stackoverflow.com/questions/21029999/react-js-identifying-different-inputs-with-one-onchange-handler
    var newState = {};
    newState[event.target.id] = event.target.value;
    this.setState(newState);
  }

  // This code handles the sending of the search terms to the parent Search component
  handleSubmit = (event) => {
    event.preventDefault();
    this.props.updateSearch(this.state.search, this.state.start, this.state.end);
  }

  //handles ajax request on blur
  handleBlur = (event) => {
    event.preventDefault();
    this.props.vinSearch(this.state.vin);
  }

  // Here we render the Query component
  render() {

    return (
      <div className="main-container">

        <div className="row">
          <div className="col-lg-12">

            <div className="panel panel-primary">
              <div className="panel-heading">
                <h1 className="panel-title">
                  <strong>
                    <i className="fa fa-newspaper-o" aria-hidden="true"></i> Add Vehicle
                  </strong>
                </h1>
              </div>
              <div className="panel-body">

                {/* Note how we associate the text-box inputs with the state values */}
                <form onSubmit={this.handleSubmit}>
                  <div className="form-group">
                    <h4 className=""><strong>VIN Number</strong></h4>
                    <input
                      type="text"
                      value={this.state.vin}
                      className="form-control"
                      id="search"
                      onChange={this.onNameChange}
                      onBlur={this.handleBlur}
                      required
                    />

                    <h4><strong>Make</strong></h4>
                    <input
                      type="number"
                      value={this.state.make}
                      className="form-control"
                      id="start"
                      onChange={this.handleChange}
                      required
                    />

                    <h4><strong>Model</strong></h4>

                    <input
                      type="number"
                      value={this.state.model}
                      className="form-control"
                      id="end"
                      onChange={this.handleChange}
                      required
                    />

                    <h4><strong>Year</strong></h4>

                    <input
                      type="number"
                      value={this.state.year}
                      className="form-control"
                      id="end"
                      onChange={this.handleChange}
                      required
                    />

                  </div>

                  {/* Here we create the onClick event that triggers the HandleSubmit */}
                  <div className="pull-right">
                    <button
                      type="submit"
                      className="btn btn-danger">
                      <h4>Submit</h4>
                    </button>
                  </div>
                </form>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }
};

// Export the module back to the route
export default Query;