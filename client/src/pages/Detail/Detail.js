import React, { Component } from "react";
import { Col, Row, Container } from "../../components/Grid";
import API from "../../utils/API";
import { Link } from "react-router-dom";
import { Input, TextArea } from "../../components/Form";
import FileUploader from "../../components/FileUploader/FileUploader";
// import AutoDetailsForm from "../../components/AutoDetailsForm/AutoDetailsForm";
// import Dropzone from "react-dropzone";
import "./details.css";
import DefaultUpload from '../../components/DefaultUpload/DefaultUpload';
import swal from 'sweetalert';

class AutoDetailsForm extends React.Component {
  constructor(props) {
    super(props);
    console.log("inside super",this.props);
    this.state = {
      released: this.props.sentDownStates.vehicle.released || "",
      doors:  this.props.sentDownStates.vehicle.doors || "",
      price: this.props.sentDownStates.vehicle.price || "",
      textAreaValue:this.props.sentDownStates.vehicle.textAreaValue || "",
      leatherColor: this.props.sentDownStates.vehicle.leatherColor || '',
      miles:this.props.sentDownStates.vehicle.miles || "",
      location: this.props.sentDownStates.vehicle.location ||"",
      liftrange: this.props.sentDownStates.vehicle.liftrange || "",
      trim: this.props.sentDownStates.vehicle.trim || "",
      drivetrain: this.props.sentDownStates.vehicle.drivetrain || "",
      keyfeatures: this.props.sentDownStates.vehicle.keyfeatures || "",
      liftdetails: this.props.sentDownStates.vehicle.liftdetails || "",
      detail: this.props.sentDownStates.vehicle.detail || "",
      bodywork: this.props.sentDownStates.vehicle.bodywork ||"",
      dentwork: this.props.sentDownStates.vehicle.dentwork || "",
      bedliner: this.props.sentDownStates.vehicle.bedliner || "",
      fuelType: this.props.sentDownStates.vehicle.fuelType || "",
      series: this.props.sentDownStates.vehicle.series || "",
      color: this.props.sentDownStates.vehicle.color || "",
      bodyCabType: this.props.sentDownStates.vehicle.bodyCabType || "",
      bodyClass: this.props.sentDownStates.vehicle.bodyClass || "",
      liftNote: this.props.sentDownStates.vehicle.liftNote || "",
      leatherNote: this.props.sentDownStates.vehicle.leatherNote || "",
      detailNote: this.props.sentDownStates.vehicle.detailNote || "",
      leatherStatus: this.props.sentDownStates.vehicle.leatherStatus || "",
      liftStatus: this.props.sentDownStates.vehicle.liftStatus || "",
      detailStatus: this.props.sentDownStates.vehicle.detailStatus || "",
      transitLink: this.props.sentDownStates.vehicle.transitLink || "",
      graphics: this.props.sentDownStates.vehicle.graphics || "",
      leatherHide:this.props.sentDownStates.vehicle.leatherHide || "",
      liftHide:this.props.sentDownStates.vehicle.liftHide || "",
      detailHide:this.props.sentDownStates.vehicle.detailHide || "",
      vinImage:this.props.sentDownStates.vehicle.vinImage || "",
      vinConfirmed:this.props.sentDownStates.vehicle.vinConfirmed || "",
    };

    this.handleInputChange = this.handleInputChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
    // this.alterState = this.alterState.bind(this);
  }

  //brings values in from db after they have been saved
  // Set the form values to the values in DB
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
      vinImage:props.sentDownStates.vehicle.vinImage,
      vinConfirmed:props.sentDownStates.vehicle.vinConfirmed
    })
    console.log("Component will revieve props ->", props.sentDownStates.vehicle);
  }

  handleInputChange(event) {
    const target = event.target;
    const value = target.type === 'checkbox' ? target.checked : target.value;
    const name = target.name;

    this.setState({
      [name]: value
    });
  }

  // alters states based on other states
  // alterState() {
  //   if (this.state.leatherColor !== "none"|| this.state.leatherColor !== "" ) {this.setState({leatherStatus: "Pending"})} else {this.setState({leatherStatus: "na"})};
  //   if (this.state.liftrange === "none"|| this.state.liftrange !== "") {this.setState({liftStatus: "Pending"})} else {this.setState({liftStatus: "na"})};
  //   if (this.state.detail !== "none"|| this.state.detail !== "") {this.setState({detailStatus: "Pending"})} else {this.setState({detailStatus: "na"})};
  //   if (this.state.relased !== "arrived") this.setState({location: "pending"});
  // }

  handleSubmit(event) {
    event.preventDefault();
    // console.log("the state of form on submit",this.state);

    if (this.state.released === "arrived" && this.state.location === undefined ){
      return    swal({
        title: "Update Vehicle Location!",
  text: "Vehicle has arrived please update its location!",
  icon: "warning",
  button: "close!",
      });  
      // return alert('vehicle has arrived please update its location')
    }   else if (this.state.leatherColor !== "none" && this.state.leatherStatus === undefined ){
      return    swal({
        title: "Update Leather Status!",
  text: "Leather Assigned. Update Status to Pending!",
  icon: "warning",
  button: "close!",
      });  
      // return alert('vehicle has arrived please update its location')
    }  else if (this.state.liftrange !== "none" && this.state.liftStatus === undefined ){
      return    swal({
        title: "Update Lift Status!",
  text: "Lift Assigned. Update Status to Pending!",
  icon: "warning",
  button: "close!",
      });  
      // return alert('vehicle has arrived please update its location')
    }  else if (this.state.detail !== "none" && this.state.detailStatus === undefined ){
      return    swal({
        title: "Update Detail Status!",
  text: "Detail Assigned. Update Status to Pending!",
  icon: "warning",
  button: "close!",
      });  
      // return alert('vehicle has arrived please update its location')
    } 
    
    
    
    else {
      API.dataEntryUpdateHelper(this.props.id, this.state)
      .then((res) => {
        console.log("API.dataEntryUpdateHelper  res data from API", res.data);
        this.props.loadVehicle()
        // this.alterState();
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
          <select  type="string" name="released" value={this.state.released} onChange={this.handleInputChange} 
          // onBlur={this.alterState}
          >
              <option value="">Select option</option>
              <option value="pending release">Pending Release</option>
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
          <h3>Assign Work</h3>
          <Row>
            <Col size="md-4">

              <label>
                Install Leather:
          <select type="string" name="leatherColor" value={this.state.leatherColor} onChange={this.handleInputChange} 
          // onBlur={this.alterState}
          >
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
          <select type="string" name="liftrange" value={this.state.liftrange} onChange={this.handleInputChange}
          //  onBlur={this.alterState}
           >
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
          <select type="string" name="detail" value={this.state.detail} onChange={this.handleInputChange} 
          // onBlur={this.alterState}
          >
                  <option value="">Select option</option>
                  <option value="Full detail">Full Detail</option>
                  <option value="Wash and Vac">Wash and Vac</option>
                  <option value="Spruce">Spruce</option>
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
                  <option value="complete">Complete</option>
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
                  <option value="complete">Complete</option>
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
                  <option value="complete">Complete</option>
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
                  <option value="complete">Complete</option>
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





class Detail extends Component {
  state = {
    vehicle: {},
    editForm: true,
    name: "",
    file: null,
    feature:'',
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

  // if the Vehicle id is not found in db redirect
  renderRedirect = () => {
    var path = "/"
    this.props.history.push(path)
  }


  loadVehicle = () => {
    API.getVehicle(this.props.match.params.id)
      .then((res) => {
        console.log(res.data);
        this.setState({
          vehicle: res.data,
          editForm: true,
          showVinImage: false,
          uploadedFileCloudinaryUrl: ''
        })
      }).catch(err =>{
        console.log('redirecting');
        this.renderRedirect();
        });
  };

  //---------------------------------------------------------

  vinImageMatch() {
    if (this.state.vehicle.vinConfirmed === false && this.state.vehicle.vinImage === "") {
      return (
        <div>
          <p>Please Upload VIN image </p>
        </div>
      )
    } else if (this.state.vehicle.vinConfirmed === false && this.state.vehicle.vinImage != "") {
      return (
        <div>
          <p>AI CANNOT confirm match VIN and image </p>
        </div>
      )
    } else if (this.state.vehicle.vinConfirmed === true) {
      return (
        <div>
          <p>VIN and Image are a confirmed match</p>
        </div>
      )
    }
  }


  checkVinImgExists() {
    if (this.state.vehicle.vinImage === "" || this.state.vehicle.vinImage === undefined) {
      return (
        <FileUploader sentDownStates={this.state} checkVinImgExists={this.checkVinImgExists.bind(this)
        } loadVehicle={this.loadVehicle.bind(this)
        } />
      )
    } else {
      return (
        <div><p>VIN Has been entered.</p>
          {this.vinImageMatch()}
          <button className="btn btn-danger" onClick={this.deleteVinImage.bind(this)}>Delete VIN image</button>
          {this.state.showVinImage ? (
            <div>
              <button className="btn btn-info" onClick={this.hideVinImage.bind(this)}>Hide Vin Image</button>
              <br />
              <img className="vinImage" alt="vin number" src={this.state.vehicle.vinImage} />
            </div>
          ) : (<button className="btn btn-info" onClick={this.showVinImage.bind(this)}>Show Vin Image</button>)}
        </div>
      )
    }
  }

  showVinImage() {
    this.setState({
      showVinImage: true
    })
  }

  hideVinImage() {
    this.setState({
      showVinImage: false
    })
  }

  deleteVinImage() {
    var theVin = this.state.vehicle.vin;
    var theItem = "vinImage"
    API.deleteFileCloud(theVin, theItem);
    this.loadVehicle()
  }

  upLoadInventoryPhotos(){
return(
  <DefaultUpload theVehicleId={this.state.vehicle.vin} loadVehicle={this.loadVehicle}/>
)
  }

  deletePhoto(theVin,linkToRemove) {
    // console.log(linkToRemove.slice(44));
    var deleteName = linkToRemove.slice(44);
    API.deletePhotosDbHandler(theVin,linkToRemove,deleteName)
      .then((res) => {
        this.loadVehicle()
        // console.log("delete photo detail", res.data);
      }).catch(err => console.log(err));
  }


  deleteFeature(theId,featureToRemove) {
    API.deleteFeatureDbHandler(theId,featureToRemove)
      .then((res) => {
        console.log(res.data)
        this.loadVehicle()
      }).catch(err => console.log(err));
  }
  managePhotoLInks(){
    if (this.state.vehicle.photoArray !== undefined){
      // console.log("the photo array",this.state.vehicle.photoArray);
      return this.state.vehicle.photoArray.map((thePhoto, index) => {
        return (
          <div  key={index} >
            <a href={thePhoto} >{thePhoto}</a>
            <button className="btn btn-dark" type='button' onClick={()=>{ this.deletePhoto(this.state.vehicle.vin,thePhoto)}}>
            <span className="ex"> ✘</span>
            </button>
         </div>  
        );
      });
    }
  }

  addFeatureFunction(e){
    console.log(this.state.vehicle._id);
    e.preventDefault()
    API.addFeatureFunctionHandler(this.state.feature, this.state.vehicle._id)
    .then((res)=>{
      this.loadVehicle()
      this.setState({feature:""})
      console.log(res.data.feature);
    }).catch(err=>{console.log(err);})
  }
  
  manageFeatures(){
    if (this.state.vehicle.feature !== undefined){
      // console.log("the photo array",this.state.vehicle.photoArray);
      return this.state.vehicle.feature.map((theFeature, index) => {
        return (
          <div  key={index} style={{float:'left'}}>
            <span>{theFeature}</span>
            <button className="btn btn-dark" type='button' onClick={()=>{ this.deleteFeature(this.state.vehicle._id,theFeature)}}>
            <span className="ex"> ✘</span>
            </button>
         </div>  
        );
      });
    }
  }


  
  renderFeaturesTextArea() {
    return (

      <form className="commentForm" onSubmit={this.addFeatureFunction.bind(this)} >
      <div className="row">
  <div className="col-lg-6">
    <div className="input-group">
      <span className="input-group-btn">
        <button className="btn btn-primary" type="submit">Add Feature</button>
      </span>
      <input name="feature" onChange={this.handleEditFormChange.bind(this)} value ={this.state.feature} name='feature' type="text" className="form-control" required='true' placeholder="Add Feature ONE AT A TIME...(You can hit enter to submit)"  />
    </div>
  </div>
  </div>
  </form> 
    )
   
  }
  
  render() {
    // console.log("state from detail second", this.state.vehicle);
    return (
      <Container fluid>
      <h3>Vehicle Information</h3><hr />
        <Row>
          <Col size="sm-6 md-3">
            <p><strong>Location:</strong> {this.state.vehicle.location}</p>
            <p><strong>VIN:</strong> {this.state.vehicle.vin}</p>
            <p><strong>Make:</strong> {this.state.vehicle.make}</p>
            <p><strong>Model:</strong> {this.state.vehicle.model}</p>
          </Col >

          <Col size="sm-6 md-3">
            <p><strong>Year:</strong> {this.state.vehicle.year}</p>
            <p><strong>Trim:</strong> {this.state.vehicle.trim}</p>
            <p><strong>Miles:</strong> {this.state.vehicle.miles}</p>
            <p><strong>Asking Price:</strong> {this.state.vehicle.price}</p>
          </Col >

          <Col size="sm-6 md-3">
            <p><strong>Doors:</strong> {this.state.vehicle.doors}</p>
            <p><strong>Body Type:</strong> {this.state.vehicle.bodyCabType}</p>
            <p><strong>Drivetrain:</strong> {this.state.vehicle.drivetrain}</p>
            {this.state.vehicle.vinImage ? (<a href={this.state.vehicle.vinImage} rel="noopener noreferrer" target="_blank">See VIN image </a>) : null}
          </Col >

          <Col size="sm-6 md-3">
            <p><strong>Key Features:</strong> {this.state.vehicle.keyfeatures}</p>
            <p><strong>Lift Details:</strong> {this.state.vehicle.liftdetails}</p>
            <p><strong>Fuel Type:</strong> {this.state.vehicle.fuelType}</p>

            {this.state.vehicle.transitLink ? <a href={this.state.vehicle.transitLink} rel="noopener noreferrer" target="_blank">See Intransit Location </a> : null}
          </Col >
        </Row>
<hr/>
        <Row>
          <Col size="sm-4 centered">
            <p><strong>Leather Kit:</strong> {this.state.vehicle.leatherColor}</p>
            <p><strong>Status:</strong><span className={this.state.vehicle.leatherStatus}>{this.state.vehicle.leatherStatus}</span> </p>
          </Col>
          <Col size="sm-4 centered">
            <p><strong>Lift Kit:</strong> {this.state.vehicle.liftrange}</p>
            <p><strong>Status:</strong> <span className={this.state.vehicle.liftStatus}>{this.state.vehicle.liftStatus}</span></p>
          </Col>
          <Col size="sm-4 centered">
            <p><strong>Detail Type:</strong> {this.state.vehicle.detail}</p>
            <p ><strong>Status:</strong> <span className={this.state.vehicle.detailStatus}>{this.state.vehicle.detailStatus}</span></p>
          </Col>
        </Row>

<hr/>
        <Row>
          <Col size="sm-3">
            <p><strong>Body Work:</strong> {this.state.vehicle.bodywork}</p>   </Col>
          <Col size="sm-3">
            <p><strong>Dent Work:</strong> {this.state.vehicle.dentwork}</p>   </Col>
          <Col size="sm-3">
            <p><strong>BedLiner:</strong> {this.state.vehicle.bedliner}</p>   </Col>
          <Col size="sm-3">
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
          {/* <Col size="md-10"> */}
            <Col size="md-12" style={{backgroundColor:'blue'}}>
            <hr />
            <h3>Edit Vehicle Data</h3>

            <AutoDetailsForm loadVehicle={this.loadVehicle.bind(this)} id={this.props.match.params.id} sentDownStates={this.state} editForm={this.state.editForm} />
            {/* This is the image upload form */}
            <Row>
            <Col size="md-5">
            {this.checkVinImgExists()}
            </Col>
            <Col size="md-5">
            {this.upLoadInventoryPhotos()}
               </Col>
            </Row>
            <Row>
              
            {this.managePhotoLInks()}
          
            </Row>
            <Row>
            <div>
                <h4>Additionally Added Features</h4>
            {this.manageFeatures()}
            </div>
              </Row>
          </Col>
          
        </Row>
        <Row>
          {this.renderFeaturesTextArea()}
          </Row>


        <Row>
          <Col size="md-2">
            <Link to="/saved">← Back to Inventory</Link>
          </Col>
          <Col size="md-2">
            {/* This link is to sell vehicle page */}
            <Link to={"/pdf/" + this.state.vehicle._id}>Print Bill Of Sale→</Link>
          </Col>
        </Row>
      </Container>
    );
  }
}

export default Detail;
