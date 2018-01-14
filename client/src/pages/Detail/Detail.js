import React, { Component } from "react";
import { Link } from "react-router-dom";
import { Col, Row, Container } from "../../components/Grid";
import Jumbotron from "../../components/Jumbotron";
import API from "../../utils/API";
import { Input, TextArea, FormBtn } from "../../components/Form";
// import helpers from "../../utils/helpers";

class AutoDetailsForm extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      released: "pending released",
      doors:"4",
      price: "",
      textAreaValue:"",
      leatherColor: '',
      miles:"",
      location:"",
      liftrange:"",
      trim:"",
      drivetrain:"",
      keyfeatures:"",
      liftdetails:"",
      detail:"",
      bodywork:"not required",
      dentwork:"not required",
      bedliner:"not required",
      fuelType:"Gasoline",
      series:"",
      color:"",
      bodyCabType:"",
      bodyClass:"",
      liftNote:"",
      leatherNote:"",
      detailNote:"",
      leatherStatus:"",
      liftStatus:"",
      detailStatus:""
     
    };

    this.handleInputChange = this.handleInputChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
  }

  //brings values in from db after they have been saved
  componentWillReceiveProps =(props)=>{
    this.setState({
      released: props.sentDownStates.vehicle.released,
      doors:props.sentDownStates.vehicle.doors,
      price:props.sentDownStates.vehicle.price,
      textAreaValue:props.sentDownStates.vehicle.textAreaValue,
      leatherColor: props.sentDownStates.vehicle.leatherColor,
      miles:props.sentDownStates.vehicle.miles,
      location:props.sentDownStates.vehicle.location,
      liftrange:props.sentDownStates.vehicle.liftrange,
      trim:props.sentDownStates.vehicle.trim,
      drivetrain:props.sentDownStates.vehicle.drivetrain,
      keyfeatures:props.sentDownStates.vehicle.keyfeatures,
      liftdetails:props.sentDownStates.vehicle.liftdetails,
      detail:props.sentDownStates.vehicle.detail,
      bodywork:props.sentDownStates.vehicle.bodywork,
      dentwork:props.sentDownStates.vehicle.dentwork,
      bedliner:props.sentDownStates.vehicle.bedliner,
      fuelType:props.sentDownStates.vehicle.fuelType,
      series:props.sentDownStates.vehicle.series,
      color:props.sentDownStates.vehicle.color,
      bodyCabType:props.sentDownStates.vehicle.bodyCabType,
      bodyClass:props.sentDownStates.vehicle.bodyClass,
      liftNote:props.sentDownStates.vehicle.liftNote,
      leatherNote:props.sentDownStates.vehicle.leatherNote,
      detailNote:props.sentDownStates.vehicle.detailNote,
      leatherStatus:props.sentDownStates.vehicle.leatherStatus,
      liftStatus:props.sentDownStates.vehicle.liftStatus,
      detailStatus:props.sentDownStates.vehicle.detailStatus,
    })
    console.log("received states ->", props.sentDownStates.vehicle);

  }

  handleInputChange(event) {
    const target = event.target;
    const value = target.type === 'checkbox' ? target.checked : target.value;
    const name = target.name;

    this.setState({
      [name]: value
    });
  }

  handleSubmit(event) {
    event.preventDefault();
    console.log("the state of form", 
      this.state
    );
    console.log(this.props.id)
   
    
    API.dataEntryUpdateHelper(this.props.id,this.state)
    .then((res) => {
      console.log("API.get books res data from helper",res.data);
      this.props.loadVehicle()
    }
  )
    .catch(err => console.log(err));
  }

  render() {
    console.log(this.state);
    return (
      <fieldset disabled={this.props.editForm}>
      <form onSubmit={this.handleSubmit}>
       
        <label>
          Released Status:
          <select type="string" name="released" value={this.state.released} onChange={this.handleInputChange}>
            <option value="pending released">Pending Release</option>
            <option value="relased">Released</option>
            <option value="released intransit">Released Intransit</option>
            <option value="arrived">Arrived</option>
          </select>
        </label>
        
       
        <label>
          Current Location:
          <select type="string" name="location" value={this.state.location} onChange={this.handleInputChange}>
            <option value="Auction">Auction</option>
            <option value="Watson">Watson</option>
            <option value="High Standards">High Standards</option>
            <option value="Go">GO</option>
            <option value="Southern Leather">Southern Leather</option>
            <option value="Distinction Detail">Joes</option>
            <option value="body shop">Body Shop</option>
            <option value="delivered">Delivered to buyer</option>
            <option value="other">Other</option>
          </select>
        </label>
        <br/>

        <hr/>
        <label>
          Doors:
          <select type="number" name="doors" value={this.state.doors} onChange={this.handleInputChange}>
            <option value="4" >4</option>
            <option value="2">2</option>
            <option value="other">Other</option>
          </select>
        </label>

        <label>
          Fuel Type:
          <select type="string" name="fuelType" value={this.state.fuelType} onChange={this.handleInputChange}>
            <option value="Gasoline">Gas</option>
            <option value="Diesel">Diesel</option>
            <option value="Hybrid">Hybrid</option>
            <option value="Electric">Electric</option>
          </select>
        </label>

        <br />
        <label>
         Color:
          <Input
            name="color"
            type="string"
            value={this.state.color}
            onChange={this.handleInputChange} />
        </label>

        <label>
        Trim:
        <Input 
          type="string"
          name="trim" 
          value={this.state.trim}
          onChange={this.handleInputChange} />
        </label>
     
        <label>
        Miles:
        <Input 
          type="number"
          name="miles" 
          value={this.state.miles}
          onChange={this.handleInputChange} />
      </label>
     
      
        <label>
        Asking Price:
          <Input
            name="price"
            type="number"
            value={this.state.price}
            onChange={this.handleInputChange} />
        </label>

        <br />
        <label>
        Body Type:
          <Input
            name="bodyCabType"
            type="string"
            value={this.state.bodyCabType}
            onChange={this.handleInputChange} />
        </label>

        <label>
        Drive Train:
          <Input
            name="drivetrain"
            type="string"
            value={this.state.drivetrain}
            onChange={this.handleInputChange} />
        </label>

        <label>
        Key Features:
          <Input
            name="keyfeatures"
            type="string"
            value={this.state.keyfeatures}
            onChange={this.handleInputChange} />
        </label>

        <label>
        Lift Kit Details:
          <Input
            name="liftdetails"
            type="string"
            value={this.state.liftdetails}
            onChange={this.handleInputChange} />
        </label>
<hr/>
        <h3>Work Required</h3>
          <Row>
        <Col size="md-4">

        <label>
          Install Leather:
          <select type="string" name="leatherColor" value={this.state.leatherColor} onChange={this.handleInputChange}>
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
          <select type="string" name="leatherStatus" value={this.state.leatherStatus} onChange={this.handleInputChange}>
          <option value="Pending">Pending</option>
          <option value="In Progress">In Progress</option>
          <option value="Complete">Complete</option>
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
          <select type="string" name="liftrange" value={this.state.liftrange} onChange={this.handleInputChange}>
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
          <select type="string" name="liftStatus" value={this.state.liftStatus} onChange={this.handleInputChange}>
          <option value="Pending">Pending</option>
          <option value="In Progress">In Progress</option>
          <option value="Complete">Complete</option>
          </select>
        </label>
        <br />
        <label>
          Lift Notes
        <TextArea type="string" name="liftNote" value={this.state. liftNote} onChange={this.handleInputChange} />
        </label>
        </Col>
        <Col size="md-4">
        <label>
          Detail:
          <select type="string" name="detail" value={this.state.detail} onChange={this.handleInputChange}>
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
          <option value="Pending">Pending</option>
          <option value="In Progress">In Progress</option>
          <option value="Complete">Complete</option>
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
          <option value="not required">Not Required</option>
          <option value="required">Required</option>
          </select>
        </label>
        </Col>
        <Col size="md-3">
        <label>
          Dent Work:
          <select type="string" name="dentwork" value={this.state.dentwork} onChange={this.handleInputChange}>
          <option value="not required">Not Required</option>
          <option value="required">Required</option>
          </select>
        </label>
        </Col>
        <Col size="md-3">
        <label>
          BedLiner:
          <select type="string" name="bedliner" value={this.state.bedliner} onChange={this.handleInputChange}>
          <option value="not required">Not Required</option>
          <option value="required">Required</option>
          </select>
        </label>
        </Col>
        <Col size="md-3">
     
        </Col>
       

         </Row>
        <Input type="submit" value="Submit" />
        
      </form>
      </fieldset >
    );
  }
}

/////---------------------------------------------------------


class Detail extends Component {
  state = {
    vehicle: {},
    editForm:true
  };

  handleEditFormChange(event) {
   
      const target = event.target;
      const value = target.type === 'checkbox' ? target.checked : target.value;
      console.log(value);
      const name = target.name;
      console.log(name);
  
      this.setState({
        [name]: value
      });
    }    

  componentDidMount() {
    this.loadVehicle()
    }

    loadVehicle = () => {
      API.getBook(this.props.match.params.id)
      .then((res) => {
        console.log("API.get books res data from detail",res.data);
        this.setState({ 
            vehicle: res.data,
            editForm:true

         })
      }
    )
      .catch(err => console.log(err));
    };

  render() {
    return (
      <Container fluid>
        <Row>
          <Col size="md-12">
          <h3>Vehicle Information</h3>
            <hr/>
            {/* <Jumbotron> */}
            
            <Col size="md-4">
              
              
            <p><strong>Location:</strong> {this.state.vehicle.location}</p>
              <p><strong>VIN:</strong> {this.state.vehicle.vin}</p>
              <p><strong>Make:</strong>{this.state.vehicle.make}</p>
              <p><strong>Model:</strong>{this.state.vehicle.model}</p>
              <p><strong>Year:</strong>{this.state.vehicle.year}</p>
              <p><strong>Trim:</strong> {this.state.vehicle.trim}</p>
              </Col >
              <Col size="md-4">
             
              <p><strong>Miles:</strong>{this.state.vehicle.miles}</p>
              <p><strong>Asking Price:</strong>{this.state.vehicle.price}</p>
              <p><strong>Doors:</strong>{this.state.vehicle.doors}</p>
              <p><strong>Body Type:</strong>{this.state.vehicle.bodyCabType}</p>
              </Col >
              <Col size="md-4">
              <p><strong>Drivetrain:</strong> {this.state.vehicle.drivetrain}</p>
              <p><strong>Key Features:</strong>{this.state.vehicle.keyfeatures}</p>
              <p><strong>Lift Details:</strong>{this.state.vehicle.liftdetails}</p>
              <p><strong>Fuel Type:</strong>{this.state.vehicle.fuelType}</p>
              </Col >
              {/*
              <p>Year: {this.state.vehicle.year}</p>
              <p>Body: {this.state.vehicle.bodyCabType}</p>
              <p>Body Class: {this.state.vehicle.bodyClass}</p>
              <p>
                Drive Train:{this.state.vehicle.drivetrain}</p>
              <p> Fuel Type: {this.state.vehicle.fuelType}</p>
              <p> Released: {this.state.vehicle.released}</p> */}
    
          <form>
        <label>
          <strong>Form Locked:</strong>
          <input
            name="editForm"
            type="checkbox"
            checked={this.state.editForm}
            onChange={this.handleEditFormChange.bind(this)} />
        </label>
      </form>
            {/* </Jumbotron> */}
       
          </Col>
        </Row>
        <h3>Vehicle Jobs Status</h3>
         
        <Row>
          <Col size="md-3">
          <h4>Leather Kit Installation</h4>
          <p><strong>Leather Kit:</strong> {this.state.vehicle.leatherColor}</p>
          <p><strong>Status:</strong>{this.state.vehicle.leatherStatus} </p>
          </Col>
          <Col size="md-3">
          <h4>Lift Kit Installation</h4>
          <p><strong>Leather Kit:</strong> {this.state.vehicle.liftrange}</p>
          <p><strong>Status:</strong> {this.state.vehicle.liftStatus}</p>
          </Col>
          <Col size="md-3">
          <h4>Cleaning Detail</h4>
          <p><strong>Leather Kit:</strong> {this.state.vehicle.detail}</p>
          <p><strong>Status:</strong> {this.state.vehicle.detailStatus}</p>
          </Col>
          <Col size="md-3">
          <h4>Body Shop Work</h4>
          <p><strong>Body Shop:</strong> {this.state.vehicle.bodywork}</p>
          
          </Col>
        </Row>
        <Row>
          <Col size="md-10 md-offset-1">
          <hr/>
          <h1>Edit Vehicle Data</h1>
          {/* <h3>Vehicle Info</h3> */}
    <AutoDetailsForm loadVehicle={this.loadVehicle.bind(this)} id={this.props.match.params.id} sentDownStates={this.state} editForm={this.state.editForm}/>
          
            {/* <article>
              <h1>Features</h1>
              <p>
                {this.state.book.vin}
              </p>
            </article> */}
          </Col>
          <Col size="md-10 md-offset-1">
          
          {/* <Reservation /> */}
          
            {/* <article>
              <h1>Features</h1>
              <p>
                {this.state.book.vin}
              </p>
            </article> */}
          </Col>
        </Row>
        <Row>
          <Col size="md-2">
            <Link to="/">← Back to Inventory</Link>
          </Col>
        </Row>
      </Container>
    );
  }
}

export default Detail;
