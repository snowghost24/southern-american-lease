import React, { Component } from "react";
import { Link } from "react-router-dom";
import { Col, Row, Container } from "../Grid";
import API from "../../utils/API";
import { Input, TextArea } from "../Form";

class AutoDetailsForm extends React.Component {
   constructor(props) {
     super(props);
     this.state = {
       released: "",
       doors: "",
       price: "",
       textAreaValue: "",
       leatherColor: '',
       miles: "",
       location: "",
       liftrange: "",
       trim: "",
       drivetrain: "",
       keyfeatures: "",
       liftdetails: "",
       detail: "",
       bodywork: "",
       dentwork: "",
       bedliner: "",
       graphics:'',
       fuelType: "",
       series: "",
       color: "",
       bodyCabType: "",
       bodyClass: "",
       liftNote: "",
       leatherNote: "",
       detailNote: "",
       leatherStatus: "",
       liftStatus: "",
       detailStatus: "",
       transitLink:'',
       leatherHide:'',
       liftHide:'',
       detailHide:'',
       vinImage:''
 
     };
 
     this.handleInputChange = this.handleInputChange.bind(this);
     this.handleSubmit = this.handleSubmit.bind(this);
     this.alterState = this.alterState.bind(this);
   }
 
   //brings values in from db after they have been saved
   //Set the form values to the values in DB
   componentWillReceiveProps = (props) => {
     this.setState({
       released: props.sentDownStates.vehicle.released,
       doors: props.sentDownStates.vehicle.doors,
       price: props.sentDownStates.vehicle.price,
       textAreaValue: props.sentDownStates.vehicle.textAreaValue,
       leatherColor: props.sentDownStates.vehicle.leatherColor,
       miles: props.sentDownStates.vehicle.miles,
       location: props.sentDownStates.vehicle.location,
       liftrange: props.sentDownStates.vehicle.liftrange,
       trim: props.sentDownStates.vehicle.trim,
       drivetrain: props.sentDownStates.vehicle.drivetrain,
       keyfeatures: props.sentDownStates.vehicle.keyfeatures,
       liftdetails: props.sentDownStates.vehicle.liftdetails,
       detail: props.sentDownStates.vehicle.detail,
       bodywork: props.sentDownStates.vehicle.bodywork,
       dentwork: props.sentDownStates.vehicle.dentwork,
       bedliner: props.sentDownStates.vehicle.bedliner,
       fuelType: props.sentDownStates.vehicle.fuelType,
       series: props.sentDownStates.vehicle.series,
       color: props.sentDownStates.vehicle.color,
       bodyCabType: props.sentDownStates.vehicle.bodyCabType,
       bodyClass: props.sentDownStates.vehicle.bodyClass,
       liftNote: props.sentDownStates.vehicle.liftNote,
       leatherNote: props.sentDownStates.vehicle.leatherNote,
       detailNote: props.sentDownStates.vehicle.detailNote,
       leatherStatus: props.sentDownStates.vehicle.leatherStatus,
       liftStatus: props.sentDownStates.vehicle.liftStatus,
       detailStatus: props.sentDownStates.vehicle.detailStatus,
       transitLink: props.sentDownStates.vehicle.transitLink,
       graphics: props.sentDownStates.vehicle.graphics,
       leatherHide:props.sentDownStates.vehicle.leatherHide,
       liftHide:props.sentDownStates.vehicle.liftHide,
       detailHide:props.sentDownStates.vehicle.detailHide,
       vinImage:props.sentDownStates.vehicle.vinImage
     })
     console.log("CWRP in details states ->", props.sentDownStates.vehicle);
   }
 
   handleInputChange(event) {
     const target = event.target;
     const value = target.type === 'checkbox' ? target.checked : target.value;
     const name = target.name;
 
     this.setState({
       [name]: value
     });
   }
 
   //alters states based on other states
   alterState() {
     if (this.state.leatherColor === "none") {this.setState({leatherStatus: "na"})} else {this.setState({leatherStatus: "Pending"})};
     if (this.state.liftrange === "none") {this.setState({liftStatus: "na"})} else {this.setState({liftStatus: "Pending"})};
     if (this.state.detail === "none") {this.setState({detailStatus: "na"})} else {this.setState({detailStatus: "Pending"})};
     if (this.state.relased !== "arrived") this.setState({location: "pending"});
   }
 
   handleSubmit(event) {
     event.preventDefault();
     // console.log("the state of form on submit",this.state);
 
     if (this.state.released === "arrived" && this.state.location === "pending" ){
       return alert('vehicle has arrived please update its location')
     } else {
       API.dataEntryUpdateHelper(this.props.id, this.state)
       .then((res) => {
         console.log("API.dataEntryUpdateHelper  res data from API", res.data);
         this.props.loadVehicle()
         this.alterState();
       }).catch(err => console.log(err));
   }
     }
 
 
 
 
   render() {
     // console.log(this.state);
     return (
       <fieldset disabled={this.props.editForm}>
         <form onSubmit={this.handleSubmit}>
           <Row>
             <Col size="md-3">
           <label>
             Released Status:
           <select  type="string" name="released" value={this.state.released} onChange={this.handleInputChange} onBlur={this.alterState}>
               <option value="">Select option</option>
               <option value="pending released">Pending Release</option>
               <option value="relased">Released</option>
               <option value="released intransit">Released Intransit</option>
               <option value="arrived">Arrived</option>
             </select>
           </label>
           </Col>
           <Col size="md-3">
           <label>
             Current Location:
           <select type="string" name="location" value={this.state.location} onChange={this.handleInputChange} >
               <option value="">Select option</option>
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
           </Col>
           <Col size="md-3">
           <label>
             Transit Link:
           <Input
               name="transitLink"
               type="string"
               value={this.state.transitLink}
               onChange={this.handleInputChange} />
           </label>
           </Col>
           <Col size="md-3">
           <label>
             VIN Image Link:
           <Input
               name="vinImage"
               type="string"
               value={this.state.vinImage}
               onChange={this.handleInputChange} />
           </label>
           </Col>
         </Row>
         <Row>
        
           <Col size="md-3">
           <label>
             Doors:
             <br />
           <select type="number" name="doors" value={this.state.doors} onChange={this.handleInputChange}>
           <option value="">Select option</option>
               <option value="4">4</option>
               <option value="2">2</option>
               <option value="other">Other</option>
             </select>
           </label>
           </Col>
           
           <Col size="md-3">
           <label>
             Fuel Type:
             <br />
           <select type="string" name="fuelType" value={this.state.fuelType} onChange={this.handleInputChange}>
           <option value="">Select option</option>
               <option value="Gasoline">Gas</option>
               <option value="Diesel">Diesel</option>
               <option value="Hybrid">Hybrid</option>
               <option value="Electric">Electric</option>
             </select>
           </label>
           </Col>
           </Row>
         
           <br />
           <Row>
          
           
           <Col size="md-3">
           <label>
             Color:
           <Input
               name="color"
               type="string"
               value={this.state.color}
               onChange={this.handleInputChange} />
           </label>
           </Col>
           <Col size="md-3">

           <label>
             Trim:
         <Input
               type="string"
               name="trim"
               value={this.state.trim}
               onChange={this.handleInputChange} />
           </label>
           </Col>
           
           <Col size="md-3">

           <label>
             Miles:
         <Input
               type="number"
               name="miles"
               value={this.state.miles}
               onChange={this.handleInputChange} />
           </label>
 </Col>

           <Col size="md-3">
           <label>
             Asking Price:
           <Input
               name="price"
               type="number"
               value={this.state.price}
               onChange={this.handleInputChange} />
           </label>
            </Col>
           </Row>
           <Row>
         
           <Col size="md-3">
          
           <label>
             Body Type:
           <Input
               name="bodyCabType"
               type="string"
               value={this.state.bodyCabType}
               onChange={this.handleInputChange} />
           </label>
   </Col>
 
           <Col size="md-3">
           <label>
             Drive Train:
           <Input
               name="drivetrain"
               type="string"
               value={this.state.drivetrain}
               onChange={this.handleInputChange} />
           </label>
   </Col>
           <Col size="md-3">
           <label>
             Key Features:
           <Input
               name="keyfeatures"
               type="string"
               value={this.state.keyfeatures}
               onChange={this.handleInputChange} />
           </label>
    </Col>
           <Col size="md-3">

           <label>
             Lift Kit Details:
           <Input
               name="liftdetails"
               type="string"
               value={this.state.liftdetails}
               onChange={this.handleInputChange} />
           </label>  
             </Col>

           </Row>
           <h3>Work Required</h3>
           <Row>
             <Col size="md-4">
 
               <label>
                 Install Leather:
           <select type="string" name="leatherColor" value={this.state.leatherColor} onChange={this.handleInputChange} onBlur={this.alterState}>
                   <option value="">Select option</option>
                   <option value="black">Black</option>
                   <option value="black stone stone">Black/Stone/Stone</option>
                   <option value="licore">Licore</option>
                   <option value="barracuda">Barracuda</option>
                   <option value="limited kit">Limited</option>
                   <option value="stone">Stone</option>
                   <option value="sandstone">Sandstone</option>
                   <option value="black cardinal">black_cardinal</option>
                   <option value="xtra woodland">Xtra Woodland</option>
                   <option value="lightgrey">Light Grey</option>
                   <option value="puddy">Puddy</option>
                   <option value="shale">shale</option>
                   <option value="none">None</option>
                 </select>
               </label>
               <br />
               <label>
                 Leather Status:
           <select type="string" name="leatherStatus" value={this.state.leatherStatus} onChange={this.handleInputChange} >
           <option value="">Select option</option>
           <option value="Pending">Pending</option>
                   <option value="Processing">Processing</option>
                   <option value="Complete">Complete</option>
                   <option value="na">na</option>
                 </select>
               </label>
               <br />
               <label>
                 Leather Notes:
         <TextArea type="string" name="leatherNote" value={this.state.leatherNote} onChange={this.handleInputChange} />
               </label>
             </Col>
             <Col size="md-4">
 
               <label>
                 Lift Kit Range:
           <select type="string" name="liftrange" value={this.state.liftrange} onChange={this.handleInputChange} onBlur={this.alterState}>
                   <option value="">Select option</option>
                   <option value="7000-6500">7000 - 6500</option>
                   <option value="6000-5500">6500 - 6000</option>
                   <option value="6000-5500">6000 - 5500</option>
                   <option value="5500-5000">5500 - 5000</option>
                   <option value="5000-4500">5000 - 4500</option>
                   <option value="4500-4000">4500 - 4000</option>
                   <option value="4000-3500">4000 - 3500</option>
                   <option value="3500-3000">3500 - 3000</option>
                   <option value="none">None</option>
                 </select>
               </label>
               <br />
               <label>
                 Lift Status:
           <select type="string" name="liftStatus" 
           value={this.state.liftStatus} onChange={this.handleInputChange}>
                   <option value="">Select option</option>
                   <option value="Pending">Pending</option>
                   <option value="Processing">Processing</option>
                   <option value="Complete">Complete</option>
                   <option value="na">na</option>
                 </select>
               </label>
               <br />
               <label>
                 Lift Notes
         <TextArea type="string" name="liftNote" value={this.state.liftNote} onChange={this.handleInputChange} />
               </label>
             </Col>
             <Col size="md-4">
               <label>
                 Detail:
           <select type="string" name="detail" value={this.state.detail} onChange={this.handleInputChange} onBlur={this.alterState}>
                   <option value="">Select option</option>
                   <option value="full detail">Full Detail</option>
                   <option value="washandvac">Wash and Vac</option>
                   <option value="spruce">Spruce</option>
                   <option value="none">None</option>
                 </select>
               </label>
               <br />
 
               <label>
                 Detail Status:
           <select type="string" name="detailStatus" value={this.state.detailStatus} onChange={this.handleInputChange}>
                   <option value="">Select option</option>
                   <option value="Pending">Pending</option>
                   <option value="Processing">Processing</option>
                   <option value="Complete">Complete</option>
                   <option value="na">na</option>
                 </select>
               </label>
               <br />
               <label>
                 Detail Notes
         <TextArea type="string" name="detailNote" value={this.state.detailNote} onChange={this.handleInputChange} />
               </label>
             </Col>
           </Row>
           <Row>
 
             <Col size="md-3">
               <label>
                 Body Work:
           <select type="string" name="bodywork" value={this.state.bodywork} onChange={this.handleInputChange}>
                   <option value="">Select option</option>
                   <option value="not required">Not Required</option>
                   <option value="required">Required</option>
                 </select>
               </label>
             </Col>
             <Col size="md-3">
               <label>
                 Dent Work:
           <select type="string" name="dentwork" value={this.state.dentwork} onChange={this.handleInputChange}>
                   <option value="">Select option</option>
                   <option value="not required">Not Required</option>
                   <option value="required">Required</option>
                 </select>
               </label>
             </Col>
             <Col size="md-3">
               <label>
                 BedLiner:
           <select type="string" name="bedliner" value={this.state.bedliner} onChange={this.handleInputChange}>
                   <option value="">Select option</option>
                   <option value="not required">Not Required</option>
                   <option value="required">Required</option>
                 </select>
               </label>
             </Col>
             <Col size="md-3">
             <label>
            Graphics:
           <select type="string" name="graphics" value={this.state.graphics} onChange={this.handleInputChange}>
                   <option value="">Select option</option>
                   <option value="not required">Not Required</option>
                   <option value="required">Required</option>
                 </select>
               </label>
             </Col>
           </Row>
           <Input  className="btn btn-danger btn-lg btn-block" type="submit" value="Submit" />
         </form>
       </fieldset >
     );
   }
 }
 
 export default AutoDetailsForm 