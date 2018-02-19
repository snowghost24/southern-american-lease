
import React, { Component } from 'react'
import helpers from "../../utils/helpers";
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import swal from 'sweetalert';

// const Form = React.createClass({

//   getInitialState() {

  class Form extends Component {
    constructor(props) {
      super(props);
      this.state = {
          make: this.props.make || '',
          vin: this.props.vin || '',
          model: this.props.model || '',
          year: this.props.year || '',
          lastsix : this.props.lastsix || '',
          series : this.props.series,
          bodyCabType : this.props.bodyCabType || '',
          bodyClass : this.props.bodyClass || '',
          trim : this.props.trim || '',
          drivetrain : this.props.drivetrain || '',
          doors : this.props.doors || '',
          fuelType :this.props.fuelType || ''
      }
      this.handleVinChange=this.handleVinChange.bind(this)
      this.handleMakeChange=this.handleMakeChange.bind(this)
      this.handleModelChange=this.handleModelChange.bind(this)
      this.handleYearChange=this.handleYearChange.bind(this)
      this.handleBlur = this.handleBlur.bind(this);
      this.handleSubmit=this.handleSubmit.bind(this);
      this.cleanFormAfterSubmit = this.cleanFormAfterSubmit.bind(this);

  }

  componentWillReceiveProps (nextProps) {
    // console.log("props received in form" , nextProps);
    this.setState({
      make:nextProps.make,
      model:nextProps.model,
      year:nextProps.year, 
      lastsix : nextProps.lastsix,
      series : nextProps.series,
      bodyCabType : nextProps.bodyCabType ,
      bodyClass : nextProps.bodyClass ,
      trim : nextProps.trim ,
      drivetrain : nextProps.drivetrain ,
      doors : nextProps.doors ,
      fuelType :nextProps.fuelType 
    })
  }

  handleMakeChange(e) {
      this.setState({
          make: e.target.value
      });
  }

  handleVinChange(e) {
      this.setState({
          vin: e.target.value
      });
  }

  handleModelChange(e) {
    this.setState({
        model: e.target.value
    });
}

handleYearChange(e) {
  this.setState({
      year: e.target.value
  });
}

  handleSubmit(e) {
      e.preventDefault();
      // passes state and fuction to clear form up
      this.props.onSubmit(this.state, this.cleanFormAfterSubmit);
  }

  handleBlur(e) {
    this.setState({
      vin: e.target.value
  }, ()=>{this.sendUpVin()});
    // this.props.handleBlur(this.state);
}

sendUpVin(){
  this.props.handleBlur(this.state);
}

// send this function up on submit to clear form
cleanFormAfterSubmit(){
  this.setState({  
    vin:"",
    make :"",
    model:"",
    year:""
   });
}

  render() {
      return (
          <form name="blog_post" className="form-horizontal" onSubmit={this.handleSubmit}>
              <div id="blog_post">
                  <div className="form-group">
                      <label className="col-sm-2 control-label required" htmlFor="blog_post_title">VIN</label>
                      <div className="col-sm-10">
                          <input type="text"
                                 id="blog_post_title"
                                 required="required"
                                 value={this.state.vin}
                                 onChange={this.handleVinChange}
                                 onBlur={this.handleBlur}
                                 className="form-control"/>
                      </div>
                  </div>
                  <div className="form-group">
                      <label className="col-sm-2 control-label required" htmlFor="blog_post_body">Make</label>
                      <div className="col-sm-10">
                          <input type="text"
                                 id="blog_post_body"
                                 required="required"
                                 value={this.state.make}
                                 onChange={this.handleMakeChange}
                                 className="form-control"/>
                      </div>
                  </div>
                  <div className="form-group">
                      <label className="col-sm-2 control-label required" htmlFor="blog_post_model">Model</label>
                      <div className="col-sm-10">
                          <input type="text"
                                 id="blog_post_model"
                                 required="required"
                                 value={this.state.model}
                                 onChange={this.handleModelChange}
                                 className="form-control"/>
                      </div>
                  </div>
                  <div className="form-group">
                      <label className="col-sm-2 control-label required" htmlFor="blog_post_year">Make</label>
                      <div className="col-sm-10">
                          <input type="text"
                                 id="blog_post_year"
                                 required="required"
                                 value={this.state.year}
                                 onChange={this.handleYearChange}
                                 className="form-control"/>
                      </div>
                  </div>
                  <div className="form-group">
                      <div className="col-sm-2"></div>
                      <div className="col-sm-10">
                          <button type="submit"
                                  id="blog_post_submit"
                                  className="btn-default btn">
                              Submit
                          </button>
                      </div>
                  </div>
              </div>
          </form>
      );
  }
};






class VehicleEntry extends Component {
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
       lastsix :"",
       series:"", 
       bodyCabType:"", 
       bodyClass:"", 
       trim:"", 
       drivetrain:"", 
       doors:"", 
       fuelType:"",
     }
     this.handleBlur = this.handleBlur.bind(this);
 
   }


// handles the submitting of the form 
  handleSubmit(data,clearForm) {

    helpers.enterVehicleDataHelper(data,clearForm)
   
    .then(res => {
      clearForm()
          if (res.data === "duplicate vehicle entry") {
            swal({
              title: "Vehicle NOT entered!",
    text: "Vehicle is already in inventory!",
    icon: "warning",
    button: "close!",
            });  
         
      } else {
        swal({
          title: "Auto added Successfully. See inventory!",
          text: "reminder:upload image of vin for acccuracy",
          icon: "success",
          button: "close!",
        }); 
      }
      
    })
    
}



//handles making sure there is a valid Vin
handleBlur = (lowerData) => {
  var theVin = lowerData.vin.trim().toUpperCase();
  this.setState({})
   if ( theVin > 17 ) {
     console.log("Vin number is too big");
   } else if (theVin < 11){
     console.log("Vin number is too small");
   }else if (theVin === ""){
     console.log("vin is empty");
   }else{
    this.getVehicleDataFromAPI(theVin)
 }
}

// makes request to the api to retrieve vehicle data
getVehicleDataFromAPI (theVin) {
  helpers.vinSearchNHTSAHelper(theVin)
  .then(res=>{
    if (res.data === "No results found for this vin"){
      console.log("Bad results from api");
    } else {
      var vin = res.data[0]["vin"]
      var make = res.data[1]["make"].trim().toUpperCase();
      var model = res.data[2]["model"].trim().toUpperCase();
      var year = res.data[3]["year"].trim().toUpperCase();
      var lastsix = res.data[4]['lastsix']
      var series = res.data[5]['series'];
      var bodyCabType = res.data[6]['bodyCabType'];
      var bodyClass = res.data[7]['bodyClass'];
      var trim = res.data[8]['trim'];
      var drivetrain = res.data[9]['driveType'];
      var doors = res.data[10]['doors'];
      var fuelType =res.data[11]['fuelType'];
      this.setState({vin, make, model, model, year, lastsix, series, bodyCabType, bodyClass, trim, drivetrain, doors, fuelType })
    }

  })
  .catch(err=>{
    var vin = "";
    var make = "";
    var model = "";
    var year = "";
    var lastsix = "";
    var series = "";
    var bodyCabType = "";
    var bodyClass = "";
    var trim = "";
    var drivetrain = "";
    var doors = "";
    var fuelType = "";
    this.setState({vin, make, model, model, year, lastsix, series, bodyCabType, bodyClass, trim, drivetrain, doors, fuelType }) 
    swal({
      title: "VIN NOT FOUND BY API!",
text: "check vin number!",
icon: "warning",
button: "close!",
    });  
  
  })
}


 // Here we render the Query component
 render() { 
   var { vin, make, model, model, year, lastsix, series, bodyCabType, bodyClass, trim, drivetrain, doors, fuelType} = this.state;
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
               {/* inport form from component form component */}
               <Form onSubmit={this.handleSubmit} handleBlur={this.handleBlur}
                       vin={vin} make={make} model={model} year={year} lastsix={lastsix} series={series}
                       bodyCabType ={bodyCabType} bodyClass={bodyClass} trim={trim} drivetrain={drivetrain} doors={doors} fuelType={fuelType}
                       />
             </div>
           </div>
         </div>
       </div>
       <li className="list-group-item">
          <h3>
            <span>
              <em>Fill form to enter vehicle into inventory...</em>
            </span>
          </h3>
        </li>
     </div>
   );
 }
}


// Export the module back to the ro
export default VehicleEntry;


