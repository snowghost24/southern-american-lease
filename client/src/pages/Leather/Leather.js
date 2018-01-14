import React, { Component } from "react";
import { Link } from "react-router-dom";
import { Col, Row, Container } from "../../components/Grid";
import Jumbotron from "../../components/Jumbotron";
import API from "../../utils/API";
import { Input, TextArea, FormBtn } from "../../components/Form";
// import helpers from "../../utils/helpers";


// Include the Helper (for the saved recall)
import helpers from "../../utils/helpers";
import Filter from "../../components/filter/filter";
// Create the Main component
class Leather extends Component {
  state = {
    savedArticles: []
  }

  // When this component mounts, get all saved articles from our db
  componentDidMount() {
    helpers.getSaved()
    .then((articleData) => {
      this.setState({ savedArticles: articleData.data });
      console.log("saved results", articleData.data);
    });
  }

  // This code handles the deleting saved articles from our database
  handleClick = (item) => {
    console.log(item);
    // Delete the list!
    helpers.deleteSaved(item.vin)
    .then(() => {
      // Get the revised list!
      helpers.getSaved()
      .then((articleData) => {
        this.setState({ savedArticles: articleData.data });
        console.log("saved results", articleData.data);
      });
    });
  }

  handleFilteredSearch =(searchType,searchItem)=>{  
    helpers.getFilteredSaved(searchType, searchItem)
    .then((articleData) => {
      this.setState({ savedArticles: articleData.data });
      console.log("saved results", articleData.data);
    });
  }
  // A helper method for rendering the HTML when we have no saved articles
  renderEmpty = () => {
    return (
      <li className="list-group-item">
        <h3>
          <span>
            <em>Save your first article...</em>
          </span>
        </h3>
      </li>
    );
  }

  // A helper method for mapping through our articles and outputting some HTML
  renderArticles = () => {
    return this.state.savedArticles.map((article, index) => {

      return (
        <div key={index}>
          <li className="list-group-item">
            <h3>
              <span>
                <em>{article.make }&nbsp;&nbsp;&nbsp;</em>
                <em>{article.model}&nbsp;&nbsp;&nbsp;</em>
                <em>{article.year}&nbsp;&nbsp;&nbsp;</em>
               
              </span>
              <span>
              <em>{article.vin}</em>
              </span>   
                         <span className="btn-group pull-right">
                <a href={article.url} rel="noopener noreferrer" target="_blank">
                <Link to={"/books/" + article._id}>
                 <button className="btn btn-default ">View Vehicle</button>
                    </Link>
                  
                </a>
                {/* pass the pressed item () => this.handleClick(article) */}
                <button className="btn btn-primary" onClick={() => this.handleClick(article)}>Delete</button>
              </span>
            </h3>
            <p>Date Entered: {article.date}</p>
          </li>
        </div>
      );
    });
  }

  // A helper method for rendering a container and all of our artiles inside
  renderContainer = () => {
    return (
      <div className="main-container">
        <div className="row">
          <div className="col-lg-12">
            <div className="panel panel-primary">
              <div className="panel-heading">
                <h1 className="panel-title">
                  <strong>
                    <i className="fa fa-download" aria-hidden="true"></i> Vehicle Inventory</strong>
                </h1>
                <Filter filteredSearch={this.handleFilteredSearch} />
              </div>
              <div className="panel-body">
                <ul className="list-group">
                  {this.renderArticles()}
                </ul>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }
  // Our render method. Utilizing a few helper methods to keep this logic clean
  render() {
    // If we have no articles, we will return this.renderEmpty() which in turn returns some HTML
    if (!this.state.savedArticles) {
      return this.renderEmpty();
    }
    // If we have articles, return this.renderContainer() which in turn returns all saves articles
    return this.renderContainer();
  }
};

// Export the module back to the route
export default Leather;




// class AutoDetailsForm extends React.Component {
//   constructor(props) {
//     super(props);
//     this.state = {
//       released: "pending released",
//       doors: "4",
//       price: "",
//       textAreaValue: "",
//       leatherColor: '',
//       miles: "",
//       location: "",
//       liftrange: "",
//       trim: "",
//       drivetrain: "",
//       keyfeatures: "",
//       liftdetails: "",
//       detail: "",
//       bodywork: "not required",
//       dentwork: "not required",
//       bedliner: "not required",
//       fuelType: "Gasoline",
//       series: "",
//       color: "",
//       bodyCabType: "",
//       bodyClass: "",
//       liftNote: "",
//       leatherNote: "",
//       detailNote: "",
//       leatherStatus: "",
//       liftStatus: "",
//       detailStatus: ""

//     };

//     this.handleInputChange = this.handleInputChange.bind(this);
//     this.handleSubmit = this.handleSubmit.bind(this);
//     this.alterState = this.alterState.bind(this);
//   }

//   //brings values in from db after they have been saved
//   //Set the form values to the values in DB
//   componentWillReceiveProps = (props) => {
//     this.setState({
//       released: props.sentDownStates.vehicle.released,
//       doors: props.sentDownStates.vehicle.doors,
//       price: props.sentDownStates.vehicle.price,
//       textAreaValue: props.sentDownStates.vehicle.textAreaValue,
//       leatherColor: props.sentDownStates.vehicle.leatherColor,
//       miles: props.sentDownStates.vehicle.miles,
//       location: props.sentDownStates.vehicle.location,
//       liftrange: props.sentDownStates.vehicle.liftrange,
//       trim: props.sentDownStates.vehicle.trim,
//       drivetrain: props.sentDownStates.vehicle.drivetrain,
//       keyfeatures: props.sentDownStates.vehicle.keyfeatures,
//       liftdetails: props.sentDownStates.vehicle.liftdetails,
//       detail: props.sentDownStates.vehicle.detail,
//       bodywork: props.sentDownStates.vehicle.bodywork,
//       dentwork: props.sentDownStates.vehicle.dentwork,
//       bedliner: props.sentDownStates.vehicle.bedliner,
//       fuelType: props.sentDownStates.vehicle.fuelType,
//       series: props.sentDownStates.vehicle.series,
//       color: props.sentDownStates.vehicle.color,
//       bodyCabType: props.sentDownStates.vehicle.bodyCabType,
//       bodyClass: props.sentDownStates.vehicle.bodyClass,
//       liftNote: props.sentDownStates.vehicle.liftNote,
//       leatherNote: props.sentDownStates.vehicle.leatherNote,
//       detailNote: props.sentDownStates.vehicle.detailNote,
//       leatherStatus: props.sentDownStates.vehicle.leatherStatus,
//       liftStatus: props.sentDownStates.vehicle.liftStatus,
//       detailStatus: props.sentDownStates.vehicle.detailStatus,
//     })
//     console.log("received states ->", props.sentDownStates.vehicle);

//   }

//   handleInputChange(event) {
//     const target = event.target;
//     const value = target.type === 'checkbox' ? target.checked : target.value;
//     const name = target.name;

//     this.setState({
//       [name]: value
//     });
//   }

//   //alters states based on other states
//   alterState() {
//     if (this.state.leatherColor == "none") {this.setState({leatherStatus: "na"})} else {this.setState({leatherStatus: "Pending"})};
//     if (this.state.liftrange == "none") {this.setState({liftStatus: "na"})} else {this.setState({liftStatus: "Pending"})};
//     if (this.state.detail == "none") {this.setState({detailStatus: "na"})} else {this.setState({detailStatus: "Pending"})};
//     if (this.state.relased !== "arrived") this.setState({location: "pending"});
//   }

//   handleSubmit(event) {
//     event.preventDefault();
//     console.log("the state of form",
//       this.state
//     );
//     console.log(this.props.id)


//     API.dataEntryUpdateHelper(this.props.id, this.state)
//       .then((res) => {
//         console.log("API.dataEntryUpdateHelper  res data from API", res.data);
       
//         this.props.loadVehicle()
//         this.alterState();
//       }).catch(err => console.log(err));
//   }

//   render() {
//     console.log(this.state);
//     return (
//       <fieldset disabled={this.props.editForm}>
//         <form onSubmit={this.handleSubmit}>

//           <label>
//             Released Status:
//           <select type="string" name="released" value={this.state.released} onChange={this.handleInputChange} onBlur={this.alterState}>
//               <option value="pending released">Pending Release</option>
//               <option value="relased">Released</option>
//               <option value="released intransit">Released Intransit</option>
//               <option value="arrived">Arrived</option>
//             </select>
//           </label>


//           <label>
//             Current Location:
//           <select type="string" name="location" value={this.state.location} onChange={this.handleInputChange} >
//               <option value="pending">Pending</option>
//               <option value="Auction">Auction</option>
//               <option value="Watson">Watson</option>
//               <option value="High Standards">High Standards</option>
//               <option value="Go">GO</option>
//               <option value="Southern Leather">Southern Leather</option>
//               <option value="Distinction Detail">Joes</option>
//               <option value="body shop">Body Shop</option>
//               <option value="delivered">Delivered to buyer</option>
//               <option value="other">Other</option>
//             </select>
//           </label>
//           <br />

//           <hr />
//           <label>
//             Doors:
//           <select type="number" name="doors" value={this.state.doors} onChange={this.handleInputChange}>
//               <option value="4" >4</option>
//               <option value="2">2</option>
//               <option value="other">Other</option>
//             </select>
//           </label>

//           <label>
//             Fuel Type:
//           <select type="string" name="fuelType" value={this.state.fuelType} onChange={this.handleInputChange}>
//               <option value="Gasoline">Gas</option>
//               <option value="Diesel">Diesel</option>
//               <option value="Hybrid">Hybrid</option>
//               <option value="Electric">Electric</option>
//             </select>
//           </label>

//           <br />
//           <label>
//             Color:
//           <Input
//               name="color"
//               type="string"
//               value={this.state.color}
//               onChange={this.handleInputChange} />
//           </label>

//           <label>
//             Trim:
//         <Input
//               type="string"
//               name="trim"
//               value={this.state.trim}
//               onChange={this.handleInputChange} />
//           </label>

//           <label>
//             Miles:
//         <Input
//               type="number"
//               name="miles"
//               value={this.state.miles}
//               onChange={this.handleInputChange} />
//           </label>


//           <label>
//             Asking Price:
//           <Input
//               name="price"
//               type="number"
//               value={this.state.price}
//               onChange={this.handleInputChange} />
//           </label>

//           <br />
//           <label>
//             Body Type:
//           <Input
//               name="bodyCabType"
//               type="string"
//               value={this.state.bodyCabType}
//               onChange={this.handleInputChange} />
//           </label>

//           <label>
//             Drive Train:
//           <Input
//               name="drivetrain"
//               type="string"
//               value={this.state.drivetrain}
//               onChange={this.handleInputChange} />
//           </label>

//           <label>
//             Key Features:
//           <Input
//               name="keyfeatures"
//               type="string"
//               value={this.state.keyfeatures}
//               onChange={this.handleInputChange} />
//           </label>

//           <label>
//             Lift Kit Details:
//           <Input
//               name="liftdetails"
//               type="string"
//               value={this.state.liftdetails}
//               onChange={this.handleInputChange} />
//           </label>
//           <hr />
//           <h3>Work Required</h3>
//           <Row>
//             <Col size="md-4">

//               <label>
//                 Install Leather:
//           <select type="string" name="leatherColor" value={this.state.leatherColor} onChange={this.handleInputChange} onBlur={this.alterState}>
//                   <option value="black">Black</option>
//                   <option value="black stone stone">Black/Stone/Stone</option>
//                   <option value="licore">Licore</option>
//                   <option value="barracuda">Barracuda</option>
//                   <option value="limited kit">Limited</option>
//                   <option value="stone">Stone</option>
//                   <option value="sandstone">Sandstone</option>
//                   <option value="black cardinal">black_cardinal</option>
//                   <option value="xtra woodland">Xtra Woodland</option>
//                   <option value="lightgrey">Light Grey</option>
//                   <option value="puddy">Puddy</option>
//                   <option value="shale">shale</option>
//                   <option value="none">None</option>
//                 </select>
//               </label>
//               <br />
//               <label>
//                 Leather Status:
//           <select type="string" name="leatherStatus" value={this.state.leatherStatus} onChange={this.handleInputChange} >
//           <option value="Pending">Pending</option>
//                   <option value="Processing">Processing</option>
//                   <option value="Complete">Complete</option>
//                   <option value="na">na</option>
//                 </select>
//               </label>
//               <br />
//               <label>
//                 Leather Notes:
//         <TextArea type="string" name="leatherNote" value={this.state.leatherNote} onChange={this.handleInputChange} />
//               </label>
//             </Col>
//             <Col size="md-4">

//               <label>
//                 Lift Kit Range:
//           <select type="string" name="liftrange" value={this.state.liftrange} onChange={this.handleInputChange} onBlur={this.alterState}>
//                   <option value="7000-6500">7000 - 6500</option>
//                   <option value="6000-5500">6500 - 6000</option>
//                   <option value="6000-5500">6000 - 5500</option>
//                   <option value="5500-5000">5500 - 5000</option>
//                   <option value="5000-4500">5000 - 4500</option>
//                   <option value="4500-4000">4500 - 4000</option>
//                   <option value="4000-3500">4000 - 3500</option>
//                   <option value="3500-3000">3500 - 3000</option>
//                   <option value="none">None</option>
//                 </select>
//               </label>
//               <br />
//               <label>
//                 Lift Status:
//           <select type="string" name="liftStatus" value={this.state.liftStatus} onChange={this.handleInputChange}>
//           <option value="Pending">Pending</option>
//                   <option value="Processing">Processing</option>
//                   <option value="Complete">Complete</option>
//                   <option value="na">na</option>
//                 </select>
//               </label>
//               <br />
//               <label>
//                 Lift Notes
//         <TextArea type="string" name="liftNote" value={this.state.liftNote} onChange={this.handleInputChange} />
//               </label>
//             </Col>
//             <Col size="md-4">
//               <label>
//                 Detail:
//           <select type="string" name="detail" value={this.state.detail} onChange={this.handleInputChange} onBlur={this.alterState}>
//                   <option value="full detail">Full Detail</option>
//                   <option value="washandvac">Wash and Vac</option>
//                   <option value="spruce">Spruce</option>
//                   <option value="none">None</option>
//                 </select>
//               </label>
//               <br />

//               <label>
//                 Detail Status:
//           <select type="string" name="detailStatus" value={this.state.detailStatus} onChange={this.handleInputChange}>
//                   <option value="Pending">Pending</option>
//                   <option value="Processing">Processing</option>
//                   <option value="Complete">Complete</option>
//                   <option value="na">na</option>
//                 </select>
//               </label>
//               <br />
//               <label>
//                 Detail Notes
//         <TextArea type="string" name="detailNote" value={this.state.detailNote} onChange={this.handleInputChange} />
//               </label>
//             </Col>
//           </Row>
//           <Row>

//             <Col size="md-3">
//               <label>
//                 Body Work:
//           <select type="string" name="bodywork" value={this.state.bodywork} onChange={this.handleInputChange}>
//                   <option value="not required">Not Required</option>
//                   <option value="required">Required</option>
//                 </select>
//               </label>
//             </Col>
//             <Col size="md-3">
//               <label>
//                 Dent Work:
//           <select type="string" name="dentwork" value={this.state.dentwork} onChange={this.handleInputChange}>
//                   <option value="not required">Not Required</option>
//                   <option value="required">Required</option>
//                 </select>
//               </label>
//             </Col>
//             <Col size="md-3">
//               <label>
//                 BedLiner:
//           <select type="string" name="bedliner" value={this.state.bedliner} onChange={this.handleInputChange}>
//                   <option value="not required">Not Required</option>
//                   <option value="required">Required</option>
//                 </select>
//               </label>
//             </Col>
//             <Col size="md-3">

//             </Col>
//           </Row>
//           <Input type="submit" value="Submit" />

//         </form>
//       </fieldset >
//     );
//   }
// }

// /////---------------------------------------------------------


// class Leather extends Component {
//   state = {
//     vehicle: {},
//     editForm: true
//   };

//   handleEditFormChange(event) {
//     const target = event.target;
//     const value = target.type === 'checkbox' ? target.checked : target.value;
//     const name = target.name;
//     this.setState({
//       [name]: value
//     });
//   }

//   // when component mounts call load vehicle function
//   componentDidMount() {
//     this.loadVehicle()
//   }

//  //goes to the db and grabs info of the paramater papamater and makes dbrequest
//   loadVehicle = () => {
//     API.getBook(this.props.match.params.id)
//       .then((res) => {
//         console.log("API.get books res data from detail", res.data);
//         //edit form is the check that enables and disables the form fields
//         this.setState({
//           vehicle: res.data,
//           editForm: true
//         })
//       }).catch(err => console.log(err));
//   };


//   render() {
//     return (
//       <Container fluid>
//         <Row>
//           <Col size="md-12">
//             <h3>Vehicle Information</h3><hr />
        
//             <Col size="md-4">
//               <p><strong>Location:</strong> {this.state.vehicle.location}</p>
//               <p><strong>VIN:</strong> {this.state.vehicle.vin}</p>
//               <p><strong>Make:</strong>{this.state.vehicle.make}</p>
//               <p><strong>Model:</strong>{this.state.vehicle.model}</p>
//               <p><strong>Year:</strong>{this.state.vehicle.year}</p>
              
//             </Col >
            
//             <Col size="md-4">
//               <p><strong>Trim:</strong> {this.state.vehicle.trim}</p>
//               <p><strong>Miles:</strong>{this.state.vehicle.miles}</p>
//               <p><strong>Asking Price:</strong>{this.state.vehicle.price}</p>
//               <p><strong>Doors:</strong>{this.state.vehicle.doors}</p>
//               <p><strong>Body Type:</strong>{this.state.vehicle.bodyCabType}</p>
//             </Col >

//             <Col size="md-4">
//               <p><strong>Drivetrain:</strong> {this.state.vehicle.drivetrain}</p>
//               <p><strong>Key Features:</strong>{this.state.vehicle.keyfeatures}</p>
//               <p><strong>Lift Details:</strong>{this.state.vehicle.liftdetails}</p>
//               <p><strong>Fuel Type:</strong>{this.state.vehicle.fuelType}</p>
//             </Col >
            
//           </Col>
//         </Row>

//         <Row>
//         <h3>Vehicle Jobs Status</h3>
//           <Col size="md-4">
//             <h4>Leather Kit Installation</h4>
//             <p><strong>Leather Kit:</strong> {this.state.vehicle.leatherColor}</p>
//             <p><strong>Status:</strong><span className={this.state.vehicle.leatherStatus}>{this.state.vehicle.leatherStatus}</span> </p>
//           </Col>
//           <Col size="md-4">
//             <h4>Lift Kit Installation</h4>
//             <p><strong>Leather Kit:</strong> {this.state.vehicle.liftrange}</p>
//             <p><strong>Status:</strong> <span className={this.state.vehicle.liftStatus}>{this.state.vehicle.liftStatus}</span></p>
//           </Col>
//           <Col size="md-4">
//             <h4>Cleaning Detail</h4>
//             <p><strong>Leather Kit:</strong> {this.state.vehicle.detail}</p>
//             <p ><strong>Status:</strong> <span className={this.state.vehicle.detailStatus}>{this.state.vehicle.detailStatus}</span></p>
//           </Col>
//         </Row>

//         <h4>Additional Work</h4>     
//         <Row>
//           <Col size="md-4">
//             <p><strong>Body Work:</strong> {this.state.vehicle.bodywork}</p>   </Col>
//           <Col size="md-4">
//             <p><strong>Dent Work:</strong> {this.state.vehicle.dentwork}</p>   </Col>
//           <Col size="md-4">
//             <p><strong>BedLiner:</strong> {this.state.vehicle.bedliner}</p>   </Col>
//         </Row>

//         <form>
//           <label>
//             <strong>Form Locked:</strong>
//             <input
//               name="editForm"
//               type="checkbox"
//               checked={this.state.editForm}
//               onChange={this.handleEditFormChange.bind(this)} />
//           </label>
//         </form>
//         <Row>
//         <Col size="md-10">
//           {/* <Col size="md-10 md-offset-1"> */}
//             <hr />
//             <h1>Edit Vehicle Data</h1>
//             {/* <h3>Vehicle Info</h3> */}
//             <AutoDetailsForm loadVehicle={this.loadVehicle.bind(this)} id={this.props.match.params.id} sentDownStates={this.state} editForm={this.state.editForm} />
//           </Col>
// {/* 
//           <Col size="md-10 md-offset-1">
//           </Col> */}
//         </Row>
//         <Row>
//           <Col size="md-2">
//             <Link to="/">← Back to Inventory</Link>
//           </Col>
//           <Col size="md-2">
//           <Link to={"/sell/" + this.state.vehicle._id}>Sell Vehicles →</Link>
          
//           </Col>
//         </Row>
//       </Container>
//     );
//   }
// }


