import React, { Component } from "react";
import { Link } from "react-router-dom";
import { Col, Row, Container } from "../../components/Grid";
import API from "../../utils/API";
import { Input, TextArea } from "../../components/Form";
// import axios from 'axios'
import FileUploader from "../../components/FileUploader/FileUploader";
import AutoDetailsForm from "../../components/AutoDetailsForm/AutoDetailsForm";
import "./details.css";
class Detail extends Component {
  state = {
    vehicle: {},
    editForm: true,
    name: "",
    file: null
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
  }


 //goes to the db and grabs info of the paramater and makes dbrequest
  loadVehicle = () => {
    API.getVehicle(this.props.match.params.id)
      .then((res) => {
        console.log("API.get books res data from detail", res.data);
        //edit form is the check that enables and disables the form fields
        this.setState({
          vehicle: res.data,
          editForm: true,
          showVinImage:false,
          uploadedFileCloudinaryUrl: ''
        })
      }).catch(err => console.log(err));
  };

//---------------------------------------------------------
// onDrop = async files => {
//   this.setState({ file: files[0] });
// };

vinImageMatch(){
  if(this.state.vehicle.vinConfirmed === false){
    return (
      <div>
        <p>Upload an image of the vin</p>
      </div>
    )
  } else{
    return (
      <div>
        <p>VIN and Image are a confirmed match</p>
      </div>
    )
  }


}

checkVinImgExists(){
  if(this.state.vehicle.vinImage==="" || this.state.vehicle.vinImage=== undefined){
    console.log("empty");
return(
  <FileUploader sentDownStates={this.state} checkVinImgExists={this.checkVinImgExists.bind(this)
  } loadVehicle ={this.loadVehicle.bind(this)
  }  /> 
)
  }else {
    console.log("not empty");
    return (
      <div><p>VIN Has been entered.</p>
      {this.vinImageMatch()}

      <button className="btn btn-danger"onClick={this.deleteVinImage.bind(this)}>Delete VIN image</button>
      {this.state.showVinImage ? (
        <div>
      <button className="btn btn-info" onClick={this.hideVinImage.bind(this)}>Hide Vin Image</button>
      <br/>
      <img className="vinImage"alt="vin number" src={this.state.vehicle.vinImage} />
      </div>
      ):(<button className="btn btn-info" onClick={this.showVinImage.bind(this)}>Show Vin Image</button>)}
      </div>
    )
  }
}

showVinImage (){
  this.setState({
    showVinImage:true
  })
}

hideVinImage (){
  this.setState({
    showVinImage:false
  })
}





deleteVinImage() {
  var theVin = this.state.vehicle.vin;
  var theItem = "vinImage"
  API.deleteFileCloud(theVin, theItem); 
  this.loadVehicle()
}



  render() {
    console.log("state from detail",this.state.vehicle);
    return (
      <Container fluid>
        <Row>
          <Col size="md-12">
            <h3>Vehicle Information</h3><hr />
            <Col size="md-4">
              <p><strong>Location:</strong> {this.state.vehicle.location}</p>
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
              <p><strong>Key Features:</strong>{this.state.vehicle.keyfeatures}</p>
              <p><strong>Lift Details:</strong>{this.state.vehicle.liftdetails}</p>
              <p><strong>Fuel Type:</strong>{this.state.vehicle.fuelType}</p>
              
              <a href={this.state.vehicle.transitLink} rel="noopener noreferrer" target="_blank">See Intransit Location </a>
              <br />

              <a href={this.state.vehicle.vinImage} rel="noopener noreferrer" target="_blank">See VIN image </a>
            </Col >
          </Col>
        </Row>

        <Row>
        <h3>Vehicle Jobs Status</h3>
          <Col size="md-4">
            <h4>Leather Kit Installation</h4>
            <p><strong>Leather Kit:</strong> {this.state.vehicle.leatherColor}</p>
            <p><strong>Status:</strong><span className={this.state.vehicle.leatherStatus}>{this.state.vehicle.leatherStatus}</span> </p>
          </Col>
          <Col size="md-4">
            <h4>Lift Kit Installation</h4>
            <p><strong>Lift Kit:</strong> {this.state.vehicle.liftrange}</p>
            <p><strong>Status:</strong> <span className={this.state.vehicle.liftStatus}>{this.state.vehicle.liftStatus}</span></p>
          </Col>
          <Col size="md-4">
            <h4>Cleaning Detail</h4>
            <p><strong>Detail:</strong> {this.state.vehicle.detail}</p>
            <p ><strong>Status:</strong> <span className={this.state.vehicle.detailStatus}>{this.state.vehicle.detailStatus}</span></p>
          </Col>
        </Row>

        <h4>Additional Work</h4>     
        <Row>
          <Col size="md-3">
            <p><strong>Body Work:</strong> {this.state.vehicle.bodywork}</p>   </Col>
          <Col size="md-3">
            <p><strong>Dent Work:</strong> {this.state.vehicle.dentwork}</p>   </Col>
          <Col size="md-3">
            <p><strong>BedLiner:</strong> {this.state.vehicle.bedliner}</p>   </Col>
            <Col size="md-3">
            <p><strong>Graphics:</strong> {this.state.vehicle.graphics}</p>   </Col>
        </Row>

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
        <Row>
          <Col size="md-10">
            {/* <Col size="md-10 md-offset-1"> */}
            <hr />
            <h1>Edit Vehicle Data</h1>

            <AutoDetailsForm loadVehicle={this.loadVehicle.bind(this)} id={this.props.match.params.id} sentDownStates={this.state} editForm={this.state.editForm} />
            {/* This is the image upload form */}

            {this.checkVinImgExists()}

            

            {/* <FileUploader sentDownStates={this.state}  /> */}
            {/* <FileInput sentDownStates={this.state} /> */}
          </Col>
        </Row>


        <Row>
          <Col size="md-2">
            <Link to="/">← Back to Inventory</Link>
          </Col>
          <Col size="md-2">
            {/* This link is to sell vehicle page */}
            <Link to={"/sell/" + this.state.vehicle._id}>Sell Vehicles →</Link>
          </Col>
        </Row>
      </Container>
    );
  }
}

export default Detail;
