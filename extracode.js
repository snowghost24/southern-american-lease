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
      bodyClass:""  
    };

    this.handleInputChange = this.handleInputChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
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
            <option value="auction">Auction</option>
            <option value="watson">Watson</option>
            <option value="high standards">High Standards</option>
            <option value="go">GO</option>
            <option value="southern Leather">Southern Leather</option>
            <option value="joes">Joes</option>
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
            name="bodytype"
            type="string"
            value={this.state.bodytype}
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
        <label>
          Detail:
          <select type="string" name="detail" value={this.state.detail} onChange={this.handleInputChange}>
          <option value="full detail">Full Detail</option>
          <option value="washandvac">Wash and Vac</option>
          <option value="spruce">Spruce</option>
          <option value="none">None</option>
          </select>
        </label>
        <label>
          Body Work:
          <select type="string" name="bodywork" value={this.state.bodywork} onChange={this.handleInputChange}>
          <option value="not required">Not Required</option>
          <option value="required">Required</option>
          </select>
        </label>
        <br />
        <label>
          Dent Work:
          <select type="string" name="dentwork" value={this.state.dentwork} onChange={this.handleInputChange}>
          <option value="not required">Not Required</option>
          <option value="required">Required</option>
          </select>
        </label>
        <label>
          BedLiner:
          <select type="string" name="bedliner" value={this.state.bedliner} onChange={this.handleInputChange}>
          <option value="not required">Not Required</option>
          <option value="required">Required</option>
          </select>
        </label>
         

        
      
        <br />
        <label>
          Vehicle Notes:
        <TextArea type="string" name="textAreaValue" value={this.state.textAreaValue} onChange={this.handleInputChange} />
        </label>
        <Input type="submit" value="Submit" />
      </form>
    );
  }
}

/////---------------------------------------------------------


class Detail extends Component {
  state = {
    vehicle: {}
  };
  // When this component mounts, grab the book with the _id of this.props.match.params.id
  //takes the value from the url and sends it as id
  // componentDidMount() {
  //   API.getBook(this.props.match.params.id)
  //     .then((res) => {
  //       console.log("API.get books res data",res.data);
  //       this.setState({ vehicle: res.data })
  //     }
  //   )
  //     .catch(err => console.log(err));
  // }

  componentDidMount() {
    this.loadVehicle()
    }
    loadVehicle = () => {
      API.getBook(this.props.match.params.id)
      .then((res) => {
        console.log("API.get books res data from detail",res.data);
        this.setState({ vehicle: res.data })
      }
    )
      .catch(err => console.log(err));
    };

  render() {
    return (
      <Container fluid>
        <Row>
          <Col size="md-12">
            <Jumbotron>
              <h3>
                {this.state.vehicle.make} {this.state.vehicle.model}
              </h3>
              <article>
              <h3>Update Features</h3>
              <p>Vin: {this.state.vehicle.vin}</p>
              <p>Year: {this.state.vehicle.year}</p>
              <p>Body: {this.state.vehicle.bodyCabType}</p>
              <p>Body Class: {this.state.vehicle.bodyClass}</p>
              <p>Drive Train:{this.state.vehicle.drivetrain}</p>
              <p> Fuel Type: {this.state.vehicle.fuelType}</p>
              <p> Released: {this.state.vehicle.released}</p>
            </article>
            </Jumbotron>
       
          </Col>
        </Row>
        <Row>
          <Col size="md-10 md-offset-1">
          <h1>Update Vehicle Data</h1>
          <h3>Vehicle Info</h3>
    <AutoDetailsForm loadVehicle={this.loadVehicle.bind(this)} id={this.props.match.params.id}sentDownStates={this.state}/>
          
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



// class FileInput extends React.Component {
//   constructor(props) {
//     super(props);
//     this.handleSubmit = this.handleSubmit.bind(
//       this
//     );
//   }

//   handleSubmit(event) {
//   var theVin = this.props.sentDownStates.vehicle.vin
//   // console.log(URL.createObjectURL(this.fileInput.files[0]))  
//   var theFile = this.fileInput.files[0]
//   console.log(theFile);
//     API.sendFile(theVin, theFile)
//     // .then((res) => {
//     //   console.log("file send", res);
//     //   // console.log("sent the file", res.data);
//     // }).catch(err => console.log(err));

    
    

//   }

//   render() {
//     return (
//       <form
//         onSubmit={this.handleSubmit} enctype="multipart/form-data">
//         <label>
//           Upload Vin Image:
//           <input
//             type="file"
//             ref={input => {
//               this.fileInput = input;
            
//             }}
//           />
//         </label>
//         <br />
//         <button type="submit">
//           Submit
//         </button>
//       </form>
//     );
//   }
// }


// <Dropzone 
// onDrop={this.handleDrop} 
// multiple 
// accept="image/*" 
// style={styles.dropzone}
// >
// <p>Drop your files or click here to upload</p>
// </Dropzone>


// handleDrop = files => {
//   // Push all the axios request promise into a single array
//   const uploaders = files.map(file => {
//     // Initial FormData
//     const formData = new FormData();
//     formData.append("file", file);
//     formData.append("tags", `codeinfuse, medium, gist`);
//     formData.append("upload_preset", "dcv191fk7"); // Replace the preset name with your own
//     formData.append("api_key", "918296179275747"); // Replace API key with your own Cloudinary key
//     formData.append("timestamp", (Date.now() / 1000) | 0);
//     var vin = this.state.vehicle.vin


//     console.log(formData);
//     API.sendFile(vin,formData);
   
//     return axios.post("	https://api.cloudinary.com/v1_1/dcv191fk7", formData, {
//       headers:{
  
//   'X-Requested-With': 'XMLHttpRequest'
// },
//        { "X-Requested-With": "XMLHttpRequest" ,'Access-Control-Allow-Origin': '*'},
//     }).then(response => {
//       const data = response.data;
//       const fileURL = data.secure_url 
// // You should store this URL for future references in your app
//       console.log(data);
//    })
//   });

//   // Once all the files are uploaded 
//   axios.all(uploaders).then(() => {
//     alert("up loaded");
//     // ... perform after upload is successful operation
//   });
// }





export default class ContactForm extends React.Component {

  render() {
    <Dropzone
      multiple={false}
      accept="image/*"
      onDrop={this.onImageDrop.bind(this)}>
      <p>Drop an image or click to select a file to upload.</p>
    </Dropzone>
  }

}
// When using the React ES5 class syntax (React.createClass), all methods are "autobound" to the class instance. The code in this post uses the ES6 class syntax (extends React.Component), which does not provide autobinding. That's why we use .bind(this) in the onDrop prop. (If you aren't familiar with .bind, you can read about it here.





const CLOUDINARY_UPLOAD_PRESET = 'pxp1u3go';
const CLOUDINARY_UPLOAD_URL = 'https://api.cloudinary.com/v1_1/dcv191fk7/upload';

<form onSubmit={this.handleSubmit}>
                 <div className="form-group">
                   <h4 className=""><strong>VIN Number</strong></h4>
                   <input
                   name="vin"
                     type="text"
                     value={this.state.vin}
                     className="form-control"
                     id="search"
                     onChange={this.handleInputChange}
                     //triggers on blue push
                     onBlur={this.handleBlur}
                     required
                   />
                    {/* {this.renderResults()} */}
                    <h4><strong>Make</strong></h4>
                   <input
                   name="make"
                     type="text"
                     value={this.state.make}
                     className="form-control"
                     id="start"
                     onChange={this.handleInputChange}
                     required
                   />
                   <h4><strong>Model</strong></h4>
                   <input
                   name="model"
                     type="text"
                     value={this.state.model}
                     className="form-control"
                     id="end"
                     onChange={this.handleInputChange}
                     required
                   />
                   <h4><strong>Year</strong></h4>
                   <input
                   name="year"
                     type="number"
                     value={this.state.year}
                     className="form-control"
                     id="end"
                     onChange={this.handleInputChange}
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



// displayMakertingButton () {
//   if (this.props.renderedFrom === "/saved") {
//     if (this.props.isCreating) {
//      return (
//        <div>
//       <Button className="btn btn-info" onClick={this.props.handleCreateClick}> Close Market </Button>
//       <Button className="btn btn-info" onClick={this.props.toggleModalInventory}>Send Invertory </Button>
//       </div>
//      );
    
//     } else {
//       return(
//         <Button className="btn btn-info" onClick={this.props.handleCreateClick}> Close Market </Button>
//       );
//     }
//   }
// }




renderFeatureItem1 = () => {
  if (this.state.vehicle.feature !== undefined){
    return this.state.vehicle.feature.map((aFeature, index) => {
     if (0 < index < 8){
      return (
        <Col>
        <div  key={index} >
         <span className="check"> ☑ </span>{aFeature} 
        </div>
        </Col>
      );
     } else if (8 < index < 16){
      return (
        <Col size="md-3">
        <div  key={index} >
         <span className="check"> ☑ </span>{aFeature} 
        </div>
        </Col>
      );
     }else if (16 < index < 24){
      return (
        <Col size="md-3">
        <div  key={index} >
         <span className="check"> ☑ </span>{aFeature} 
        </div>
        </Col>
      );
     }else if (24 < index < 32){
      return (
        <Col size="md-3">
        <div  key={index} >
         <span className="check"> ☑ </span>{aFeature} 
        </div>
        </Col>
      );
     }
    }}