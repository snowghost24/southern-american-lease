// Include React as a dependency
import React, { Component } from 'react'

// Include the Query and Results components
import Query from "../../components/Search/Query";
import Results from "../../components/Search/Results";

// Include the helpers for making API calls
import helpers from "../../utils/helpers";

// Create the Search component
class Search extends Component {
  constructor(props) {
    super(props);
  // Here we set the initial state variables
  // (this allows us to propagate the variables for maniuplation by the children components
  // Also note the "resuls" state. This will be where we hold the data from our results
    this.state = { 
      vin:"",
      make :"",
      model:"",
      year:"",
      lastsix:"",
      results:[]
    }
  }
  // This function will be passed down into child components so they can change the "parent"
  // i.e we will pass this method to the query component that way it can change the main component
  // to perform a new search

 // here we combine front end and back end data to save vehicle
  enterVehicleData = ( newVin,newMake, newModel, newYear) => {
    var vin = newVin.trim().toUpperCase();
    var make = newMake.trim().toUpperCase();
    var model= newModel.trim().toUpperCase();
    var year = newYear.trim();
    var lastSix = this.state.results[4]['lastsix']
    var series = this.state.results[5]['series'];
    var bodyCabType = this.state.results[6]['bodyCabType'];
    var bodyClass = this.state.results[7]['bodyClass'];
    var trim = this.state.results[8]['trim'];
    var drivetrain = this.state.results[9]['driveType'];
    var doors = this.state.results[10]['doors'];
    var fuelType = this.state.results[11]['fuelType'];
    var entryData = [
      vin,
      make,
      model,
      year,
      lastSix,
      series,
      bodyCabType,
      bodyClass,
      trim,
      drivetrain,
      doors,
      fuelType
    ]

   
    helpers.enterVehicleDataHelper(entryData)
      .then((data) => {
        if (data.data === "duplicate vehicle entry") {
          alert("Denied: This vehicle exists in inventory")
          //once data is entered clear fields
          this.setState({
            vin: "",
            make: "",
            model: "",
            year: "",
            lastsix: ""
          })
        } else {
          //this clears the fields after the form has been submited
          // vin is cleared in the query component
          this.setState({
            vin: "",
            make: "",
            model: "",
            year: "",
            lastsix: ""
          })
          this.setState({ results: { docs: data.docs } });
        }
      });
  }

  vinSearchNHTSA = (vinNumb) => {
    helpers.vinSearchNHTSAHelper(vinNumb)
      .then((response) => {
        if (response.data.data === "No results found for this vin") {
          alert("VIN number is invalid")
        } else {
          //Here we split the data front end and back end
           // this.setState(this.state)
          this.setState({
            vin: response.data[0]['vin'],
            make: response.data[1]['make'],
            model: response.data[2]['model'],
            year: response.data[3]['year'],
            lastsix: response.data[4]['lastsix'],
            results: response.data
          })
        }}).catch(error =>{
      console.log(error);
    })
  }

  // Render the component. Note how we deploy both the Query and the Results Components
  render() {
    return (
      <div className="main-container">
        <Query  
        enterVehicleData={this.enterVehicleData} 
        vinSearchNHTSA={this.vinSearchNHTSA}  
        make={this.state.make} 
        model={this.state.model} 
        year={this.state.year} 
        vin={this.state.vin} 
        lastsix={this.state.lastsix}/>
        <Results />
      </div>
    );
  }
};

// Export the module back to the route
export default Search;