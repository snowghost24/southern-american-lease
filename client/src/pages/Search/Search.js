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
    results:[]

  }
  }
  // This function will be passed down into child components so they can change the "parent"
  // i.e we will pass this method to the query component that way it can change the main component
  // to perform a new search


  setQuery = ( newVin,newMake, newModel, newYear) => {
    helpers.runQuery(newVin,newMake, newModel, newYear)
    .then((data) => {
      //this clears the fields after the form has been submited
      // vin is cleared in the query component
      this.setState({
        vin:"",
        make:"",
        model:"",
        year:""
      })
      this.setState({ results: { docs: data.docs } });
    });
  }


   // this.setState(this.state)

  setAjax = (vinNumb) => {
    helpers.runQueryAjax(vinNumb)
    .then((response) => {
      //retrieved values from api
      this.setState({
        vin:response.data[0]['vin'],
        make:response.data[1]['make'],
        model:response.data[2]['model'],
        year:response.data[3]['year']
      })
      console.log("data",response.data[0]['make']);
      // this.setState(this.state)
    }).catch(error =>{
      console.log(error);
    })
  }

  // Render the component. Note how we deploy both the Query and the Results Components
  render() {

    return (
      <div className="main-container">
{/* vinSearchResults={this.state.results} */}
{/* results={this.state.results}  */}
{/* updateSearch={this.setQuery} */}
{/* sentDown = {results} */}
        {/* Note how we pass the setQuery function to enable Query to perform searches */}
        <Query  updateSearch={this.setQuery} vinSearch={this.setAjax}  make={this.state.make} model={this.state.model} year={this.state.year} vin={this.state.vin} />
        {/* Note how we pass in the results into this component */}
        {/* In order to pass down you have to save into a variable */}
        <Results />
      </div>
    );
  }
};

// Export the module back to the route
export default Search;