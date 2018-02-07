import React, { Component } from "react";
import { Link } from "react-router-dom";
import { Col, Row, Container } from "../../components/Grid";
import API from "../../utils/API";
import { Input, TextArea } from "../../components/Form";
// import axios from 'axios'
import FileUploader from "../../components/FileUploader/FileUploader";
import AutoDetailsForm from "../../components/AutoDetailsForm/AutoDetailsForm";
// import "./details.css";
// import Carousel from "../../components/Carousel/Carousel";
// import Slider from "react-slick"
import { Carousel } from 'react-bootstrap';

import "./clientDetail.css";


class ControlledCarousel extends React.Component {
  constructor(props, context) {
    super(props, context);
    this.handleSelect = this.handleSelect.bind(this);
    this.state = {
      index: 0,
      direction: null
    };
  }

  handleSelect(selectedIndex, e) {
    // alert(`selected=${selectedIndex}, direction=${e.direction}`);
    this.setState({
      index: selectedIndex,
      direction: e.direction
    });
  }

  render() {
    const { index, direction } = this.state;
    return (
      <Carousel
        activeIndex={index}
        direction={direction}
        onSelect={this.handleSelect}
        indicators={true}
        wrap={true}
        className="carousel slide"
            >
        <Carousel.Item   >
          <img  alt="900x500"src="http://st.motortrend.com/uploads/sites/10/2016/11/2017-Ford-F-150-XLT-front-three-quarter.jpg" />
        </Carousel.Item>
        <Carousel.Item>
          <img width={1200} height={500} alt="900x500" src="http://st.motortrend.com/uploads/sites/5/2017/01/2018-Ford-F-150-front-three-quarters.jpg"  />
        </Carousel.Item>
        <Carousel.Item>
          <img width={1200} height={500} alt="900x500" src="https://media.ed.edmunds-media.com/ford/f-150/2016/ot/2016_ford_f-150_LIFE2_ot_902161_1280.jpg"  />
        </Carousel.Item>
      </Carousel>
    );
  }
}

class ClientDetail extends Component {
  state = {
    vehicle: {},
    editForm: true,
    name: "",
    file: null,
    numbVehicle:'',
    inventoryLength:"",
    nextVehicle:"",
    prevVehicle:""
  };

  handleEditFormChange(event) {
    const target = event.target;
    const value = target.type === 'checkbox' ? target.checked : target.value;
    const name = target.name;
    this.setState({
      [name]: value
    });
  }

  // when component mounts call load vehicle function
  componentDidMount() {
    this.loadVehicle()
    this.getSavedInventory()
  }

  //goes to the db and grabs info of the paramater and makes dbrequest
  loadVehicle = () => {
    API.getVehicle(this.props.match.params.id)
      .then((res) => {
        console.log("API.get books res data from detail", res.data);
        this.setState({
          vehicle: res.data,
        })
      }).catch(err => console.log(err));
  };


  getSavedInventory = () => {
    API.getSavedInventoryHandler()
      .then((res) => {
        var thePath = this.props.location.pathname;
        thePath = thePath.slice(11);
        // console.log("the path is ",thePath);
        res.data.forEach((element,index) => {
          console.log(element._id);
          if(thePath == element._id) {
            this.setState({numbVehicle:index+1})
            if (index === 0){
              var prevAtZero = res.data.length - 1;
              this.setState({
                prevVehicle: res.data[prevAtZero]._id,
                nextVehicle:res.data[index+1]._id
              },this.consoleMe())
            }else if(index === res.data.length-1   ){
              // console.log(" in last item");
              this.setState({
                nextVehicle: res.data[0]._id,
                prevVehicle:res.data[index-1]._id
              })      
            }else{
              var next = index+1;
              var prev =  index-1;
              this.setState({
                nextVehicle: res.data[next]._id,
                prevVehicle: res.data[prev]._id}) 
            }
          } 
        });
        this.setState({
          inventoryLength: res.data.length,
        }, this.consoleMe())
      }).catch(err => console.log(err));
  };

consoleMe(){
  console.log("the state from console me",this.state);
}

goToNext(){
  var addressId = this.state.nextVehicle;
  var path = `${addressId}`;
  this.props.history.push(path)
  this.loadVehicle()
  this.getSavedInventory()

}

goToPrev(){
  var addressId = this.state.prevVehicle
  var path = `${addressId}`;
  this.props.history.push(path)
  this.loadVehicle()
  this.getSavedInventory()
 console.log(this.props.history);
}

  render() {
    console.log("state from detail", this.state);
    return (
      <Container fluid>
      <Row>
      <Col size="md-2 md-offset-3 ">
      {/* <Link to={"/inventory/" + this.state.prevVehicle} >prev</Link> */}
      <button type="button" className="btn btn-danger center-block" onClick={this.goToPrev.bind(this)}>Prev Vehicle<i className="far fa-arrow-alt-circle-left"></i></button>
      </Col>
      <Col size="md-2">
      <h3 className="center-text">{this.state.numbVehicle}/{this.state.inventoryLength}</h3>
      </Col>
      <Col size="md-2">
      {/* <Link to={"/inventory/" + this.state.nextVehicle}> Next */}
      <button type="button" className="btn btn-danger center-block" onClick={this.goToNext.bind(this)}>Next Vehicle</button>
      {/* </Link> */}
      </Col>
      
      </Row>
        <Row>
          <Col size="md-12">
            <h3>Vehicle Information</h3><hr />
            <Col size="md-4">
              <p><strong>VIN:</strong> {this.state.vehicle.vin}</p>
              <p><strong>Make:</strong>{this.state.vehicle.make}</p>
              <p><strong>Model:</strong>{this.state.vehicle.model}</p>
              <p><strong>Year:</strong>{this.state.vehicle.year}</p>
            </Col >

            <Col size="md-4">
              <p><strong>Trim:</strong> {this.state.vehicle.trim}</p>
              <p><strong>Miles:</strong>{this.state.vehicle.miles}</p>
              <p><strong>Asking Price:</strong>{this.state.vehicle.price}</p>
              <p><strong>Doors:</strong>{this.state.vehicle.doors}</p>
              <p><strong>Body Type:</strong>{this.state.vehicle.bodyCabType}</p>
            </Col >

            <Col size="md-4">
              <p><strong>Drivetrain:</strong> {this.state.vehicle.drivetrain}</p>
              <p><strong>Lift Details:</strong>{this.state.vehicle.liftdetails}</p>
              <p><strong>Fuel Type:</strong>{this.state.vehicle.fuelType}</p>
              <p><strong>Key Features:</strong>{this.state.vehicle.keyfeatures}</p>
            </Col >
          </Col>
        </Row>
       
        <Row>
        <Col size="md-10 md-offset-1">
        <ControlledCarousel />
        </Col>
        </Row>
        <Row>
          <Col size="md-2">
            <Link to="/inventory/">← Back to Inventory</Link>
          </Col>
        </Row>
      </Container>
    );
  }
}

export default ClientDetail;
