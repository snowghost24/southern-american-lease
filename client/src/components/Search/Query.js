// Include React as a dependency
import React, { Component } from 'react'

// Query Component Declaration
class Query extends Component {

  constructor(props){
    super(props)
    // API.changeBgc((err, data)=>this.getVehicleInfo(data));
    // Here we set initial variables for the component to be blanks 
}

 state = {
      vin: "",
      make:"",
      model:"",
      year:"",
      lastsix:""
    }
// come back and find a way to change the states all at once
  onVinChange = (e)=>{
    this.setState({
      vin: e.target.value,  
    })
  }
  onMakeChange = (e)=>{
    this.setState({
      make:e.target.value
    })
  }
  onModelChange = (e)=>{
    this.setState({
      model:e.target.value
      
    })
  }
  onYearChange = (e)=>{
    this.setState({
      year:e.target.value
      
    })
  }


// fires when props are passed down
  componentWillReceiveProps = (nextProps) =>{
    console.log("props received in query" , nextProps);
    this.setState({
      make:nextProps.vin,
      make:nextProps.make,
      model:nextProps.model,
      year:nextProps.year, 
      lastsix:nextProps.lastsix  
    })
  }



  // Whenever we detect ANY change in the textbox, we register it.
// this is not working figure out why
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
    this.props.enterVehicleData(this.state.vin, this.state.make, this.state.model,this.state.year,this.state.lastsix);
   this.setState({
     vin:""
   })
  }

  //handles ajax request on blur
  handleBlur = (event) => {
    event.preventDefault();

// Filter request conditions
    if ( this.state.vin.length > 17 ) {
      console.log("Vin number is too big");
    } else if (this.state.vin.length < 11){
      console.log("Vin number is too small");
    }else if (this.state.vin === ""){
      console.log("vin is empty");
    }else{
      this.props.vinSearchNHTSA(this.state.vin);
    }
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
                      onChange={this.onVinChange}
                      //triggers on blue push
                      onBlur={this.handleBlur}
                      required
                    />
                     {/* {this.renderResults()} */}
                     <h4><strong>Make</strong></h4>
                    <input
                      type="text"
                      value={this.state.make}
                      className="form-control"
                      id="start"
                      onChange={this.onMakeChange}
                      required
                    />
                    <h4><strong>Model</strong></h4>
                    <input
                      type="text"
                      value={this.state.model}
                      className="form-control"
                      id="end"
                      onChange={this.onModelChange}
                      required
                    />
                    <h4><strong>Year</strong></h4>
                    <input
                      type="number"
                      value={this.state.year}
                      className="form-control"
                      id="end"
                      onChange={this.onYearChange}
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