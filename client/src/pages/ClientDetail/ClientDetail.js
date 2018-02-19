import React, { Component } from "react";
import { Link } from "react-router-dom";
import { Col, Row, Container } from "../../components/Grid";
import API from "../../utils/API";
import { Input, TextArea } from "../../components/Form";
import FileUploader from "../../components/FileUploader/FileUploader";
import AutoDetailsForm from "../../components/AutoDetailsForm/AutoDetailsForm";
import { Carousel } from 'react-bootstrap';
// import "./clientDetail.css";
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
    this.setState({
      index: selectedIndex,
      direction: e.direction
    });
  }

  // returns carousel items
  renderCarouselItem = () => {
    if (this.props.thePhotosUrls !== undefined){
      console.log(this.props.thePhotosUrls);
      return this.props.thePhotosUrls.map((thePhoto, index) => {
        return (
          <Carousel.Item  key={index} >
            <img  alt="900x500" src={thePhoto} />
          </Carousel.Item>
        );
      });
    }
  }

  render() {
    const { index, direction } = this.state;
    const {thePhotosUrls}=this.props;
    console.log(thePhotosUrls);
    return (
      <Carousel
        activeIndex={index}
        direction={direction}
        onSelect={this.handleSelect}
        indicators={true}
        wrap={true}
        className="carousel slide"
            >
      {this.renderCarouselItem()}
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
  
    // grabs all the vehicle available for marketing in inventory
  componentDidMount() {
    this.getSavedInventory()
  }


  getSavedInventory = () => {
    API.getSavedInventoryHandler()
      .then((res) => {
        var thePath = this.props.location.pathname;
        thePath = thePath.slice(11);
        res.data.forEach((element,index) => {
          console.log(element._id);
          if(thePath == element._id) {
            this.setState({
              vehicle: res.data[index]
            })
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
  this.getSavedInventory()
}

goToPrev(){
  var addressId = this.state.prevVehicle
  var path = `${addressId}`;
  this.props.history.push(path)
  this.getSavedInventory()
 console.log(this.props.history);
}

renderFeatureItem = () => {
  if (this.state.vehicle.feature !== undefined){
    return this.state.vehicle.feature.map((aFeature, index) => {
      return (
        <Col size="sm-6 md-3">
        <div  key={index} >
         <span className="check"> ☑ </span>{aFeature} 
        </div>
        </Col>
      );
    });
  }
}
  render() {
    console.log("state from detail", this.state.vehicle.feature);
    return (
      <Container fluid>
        <Row>
          <Col size="xs-4 md-4">
            <button type="button" className="navButtons center-bloc pull-right" onClick={this.goToPrev.bind(this)}>Prev Vehicle<i className="far fa-arrow-alt-circle-left"></i></button>
          </Col>
          <Col size="xs-4 md-4">
            <h3 className="center-text">{this.state.numbVehicle}/{this.state.inventoryLength}</h3>
          </Col>
          <Col size="xs-4 md-4">
            <button type="button" className="navButtons center-block" onClick={this.goToNext.bind(this)}>Next Vehicle</button>
          </Col>
        </Row>

        <Row>
            <h4 style={{fontSize:24}}>Vehicle Information</h4><hr />
            <Col size=" sm-6 md-3">
              <p className="veh-info-Key"><strong>VIN:</strong> {this.state.vehicle.vin}</p>
              <p className="veh-info-Key"><strong>Make:</strong> {this.state.vehicle.make}</p>
              <p className="veh-info-Key"><strong>Model:</strong> {this.state.vehicle.model}</p>
            
            </Col >

            <Col size="sm-6 md-3">
            <p className="veh-info-Key"><strong>Year:</strong> {this.state.vehicle.year}</p>
              <p className="veh-info-Key"><strong>Trim:</strong> {this.state.vehicle.trim}</p>
              <p className="veh-info-Key"><strong>Miles:</strong> {this.state.vehicle.miles}</p>
             
            </Col >

            <Col size=" sm-6 md-3">
            <p className="veh-info-Key"><strong>Asking Price:</strong> {this.state.vehicle.price}</p>
              <p className="veh-info-Key"><strong>Doors:</strong> {this.state.vehicle.doors}</p>
              <p className="veh-info-Key"><strong>Body Type:</strong> {this.state.vehicle.bodyCabType}</p>
            </Col >
            <Col size="sm-6 md-3">
            <p className="veh-info-Key"><strong>Drivetrain:</strong> {this.state.vehicle.drivetrain}</p>
              <p className="veh-info-Key"><strong>Lift Details:</strong> {this.state.vehicle.liftdetails}</p>
              <p className="veh-info-Key"><strong>Fuel Type:</strong> {this.state.vehicle.fuelType}</p>
              <p className="veh-info-Key"><strong>Key Features:</strong> {this.state.vehicle.keyfeatures}</p>
          
            </Col >
        </Row>
        <Row>
        <div className="container">
 <Row>
   <Col size="sm-4 sm-offset-4" >
   <button type="button" className="btn dropdown-toggle custom-drop" data-toggle="collapse" data-target="#demo" style={{marginTop:20, fontSize:20}}>Click To See More Features <span className="caret"></span></button>
   </Col>
   </Row>
  
  <div id="demo" className="collapse">
  <Row>
   <h4>List of Features</h4>
  {this.renderFeatureItem() }
  </Row>
  </div>
</div>
          </Row>
       
        <Row>
     <div className="carousel-spacing">
          <Col size="md-10 md-offset-1 "  >
          <div className="border-css">
            <ControlledCarousel thePhotosUrls={this.state.vehicle.photoArray} className="border-css"/>
            </div>
          </Col>
          </div>
       
        </Row>
        <hr/>

        <Row>
          <hr/>
          <Col size="md-2">
            <Link to="/inventory/">← Back to Inventory</Link>
          </Col>
        </Row>
      </Container>
    );
  }
}

export default ClientDetail;
