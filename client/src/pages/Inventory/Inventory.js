// Include React as a dependency
import React, { Component } from 'react'
import { Link } from "react-router-dom";
import API from "../../utils/API";
import helpers from "../../utils/helpers";
import Filter from "../../components/filter/filter";
import Constributors from "../../components/Constributors/Constributors";
import Modal from 'react-modal';
import swal from 'sweetalert';
import { Col, Row } from "../../components/Grid";


import "./Inventory.css";


// values are set When component mount
function Contact(label, value) {
  this.label = label;
  this.value = value;
}

class Inventory extends Component {
  state = {
    savedArticles: [],
    isCreating: false,
    isActive: false,
    selectedOption: 'option1',
    addDealerActive:false,
    deleteDealerActive:false,
    savedDealers:[],
    selectedContacts:[],
    showDeleteButton:false,
     name:"", 
     email:"", 
     dealership:"",
     tel:"",
     address:"",
     city:"",
     state:"",
     zip:""
  }


  // On mount get all saved articles from our db
  componentDidMount() {
    this.getSavedData()
    this.getDealers()
  }

  getSavedData(){
    helpers.getSaved()
      .then((articleData) => {
        this.setState({ savedArticles: articleData.data });
      });
  }


  getDealers(){
    helpers.getSavedDealers()
    .then((dealerData) => {
      var newArray = []
      console.log(dealerData.data[0].name);
      for (var i = 0; i < dealerData.data.length; i += 1) {
        var newObj = new Contact(dealerData.data[i].name, dealerData.data[i].email)
        newArray.push(newObj);
      }
      this.setState({ savedDealers: newArray});
    })
    ;
  }

  // This code handles the deleting saved articles from our database
  handleClick = (item) => {
    //deletes vin from image from cloudinary
    var theVin = item.vin;
    var theFile = "there is no file"
    API.deleteFileCloud(theVin, theFile).then(res => console.log(res)).catch(err => console.log(err));

    // deletes the vehicle from db
    // Get the revised list!
    helpers.deleteSaved(item.vin)
      .then(() => {
        helpers.getSaved()
          .then((articleData) => {
            this.setState({ savedArticles: articleData.data });
          });
      });
  }

  handleFilteredSearch = (searchType, searchItem) => {
    if (searchItem === "" || searchType == ""){
      swal({
        icon: "error",
        title: 'Oops...!',
        text: 'Please Fill Form Completely',
      })
    } else {
      helpers.getFilteredSaved(searchType, searchItem)
      .then((articleData) => {
        if ( articleData.data.name === "CastError" ){
          swal({
            icon: "error",
            title: 'Sorry No Results Found!',
            text: 'Try Another Search',
          })
        } else if (articleData.data.length === 0){
          swal({
            icon: "error",
            title: 'Sorry No Results Found!',
            text: 'Try Another Search',
          })
        } else {
          console.log("article data",articleData);
          this.setState({ savedArticles: articleData.data });
        } 
      })
    }
  
  }

  getDate(date) {
    var dayEntered = new Date(date).getTime();
    var now = Date.now();
    var elapsedTime = now - dayEntered;
    var days = Math.floor(elapsedTime / 8.64e+7);
    return days
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


// Get the revised list!
  handleInputChange(event, theId, index) {
    API.addToCartHelper(theId)
      .then(() => { helpers.getSaved()
            .then((articleData) => {
              this.setState({ savedArticles: articleData.data });
            });
        }).catch(err => console.log(err));
    }



  // A helper method for mapping through our articles and outputting some HTL
  handleCreateClick = () => {
    if (this.state.isCreating) {
      console.log("changed to false");
      this.setState({
        isCreating: false
      })
    } else {
      console.log("changed to true");
      this.setState({
        isCreating: true
      })
    }
  }



  toggleModalInventory = () => {
    this.setState({
      isActive: !this.state.isActive
    })
  }

  //composes email to send iventory
  sendInventoryEmail = () => {
    if (this.state.selectedOption === 'option2'){
      if (this.state.selectedContacts != ""){
        helpers.sendInventoryEmailHelper(this.state.selectedContacts);
        this.toggleModalInventory();
        swal({
          title: "Inventory Sent!",
          text: "Click button to close!",
          icon: "success",
          button: "close!",
        }); 
      }else{
        swal({
          title: "Inventory NOT sent!",
          text: "Please Select Recipients!",
          icon: "warning",
          button: "close!",
        }); 
      }
     
   }else{
      helpers.sendInventoryEmailHelperAll()
      this.toggleModalInventory()
      swal({
        title: "Inventory Sent!",
        text: "Clicked button to close!",
        icon: "success",
        button: "close!",
      });

    }
    
  }

  handleOptionChange(changeEvent) {
    this.setState({
      selectedOption: changeEvent.target.value
    })
  }


  SelectDealers() {
    return (
      <div>
        <Constributors FLAVOURS={this.state.savedDealers} handleRetrievedContacts={this.handleRetrievedContacts.bind(this)} />
      </div>
    )
  }
// retrieves selected contacts from contributors component
  handleRetrievedContacts(retrievedContacts) {
    var newStateArray = retrievedContacts.split(",")
    this.setState({selectedContacts: newStateArray })
  }
  addDealerDB(event) {
    event.preventDefault();
    var name = this.state.name;
    var email = this.state.email;
    var dealership = this.state.dealership;
    var tel = this.state.tel;
    var address = this.state.address;
    var city = this.state.city;
    var state = this.state.state;
    var zip = this.state.zip;
    var dealerEntryData = {name,email,dealership,tel,address,city,state,zip}
    console.log(dealerEntryData);
    helpers.enterDealerHelper(dealerEntryData)
    .then(res=>{
      console.log("im back and here is the response",res);
      this.setState({name:"",email:"",dealership:"",tel:"",address:"",city:"",state:"",zip:""}, ()=>{console.log(this.state);})
      this.getDealers();
      if (res.data._id){
        swal({
          title: "Congrats",
          text: `${res.data.name} was added successfully` ,
          icon: "success",
          button: "close!",
        }); 
      }
      
    })
    .catch(err=>console.log(err));
    }



  

  //sets state for adddealer form
  handleDealerChange(event) {
    const target = event.target;
    const value = target.type === 'checkbox' ? target.checked : target.value;
    const name = target.name;
    this.setState({
      [name]: value
    });
  }


renderDealerForm(){
  return (
    <form className="" onSubmit={this.addDealerDB.bind(this)} style={{ marginLeft: 15 }}>
      <hr />
      <h4>ADD DEALER FORM</h4>
      <div className="form-group row" >
        <label className="col-2 col-form-label">Full Name
                          <div className="col-10">
            <input className="form-control" name="name" type="text" required="required" value={this.state.name} onChange={this.handleDealerChange.bind(this)} />
          </div>
        </label>
        <label className="col-2 col-form-label">Dealership
                          <div className="col-10">
            <input className="form-control" name="dealership" type="text" value={this.state.dealership} onChange={this.handleDealerChange.bind(this)} />
          </div>
        </label>
      </div>
      <div className="form-group row">
        <label className="col-2 col-form-label">  Email
                        <div className="col-10">
            <input className="form-control" name="email" type="email" required="required" value={this.state.email} onChange={this.handleDealerChange.bind(this)} />
          </div>
        </label>
        <label className="col-2 col-form-label"> Telephone
                        <div className="col-10">
            <input className="form-control" name="tel" type="tel" value={this.state.tel} onChange={this.handleDealerChange.bind(this)} data-fv-numeric="true" data-fv-numeric-message="Please enter valid phone numbers" />
          </div>
        </label>
      </div>
      <div className="form-group row">
        <label className="col-2 col-form-label">  Address
                        <div className="col-10">
            <input className="form-control" name="address" type="string" required="required" value={this.state.address} onChange={this.handleDealerChange.bind(this)} />
          </div>
        </label>
        <label className="col-2 col-form-label"> City
                        <div className="col-10">
            <input className="form-control" name="city" type="string" value={this.state.city} onChange={this.handleDealerChange.bind(this)} />
          </div>
        </label>
      </div>
      <div className="form-group row">
        <label className="col-2 col-form-label">  State
                        <div className="col-10">
            <input className="form-control" name="state" type="string" required="required" value={this.state.state} onChange={this.handleDealerChange.bind(this)} />
          </div>
        </label>
        <label className="col-2 col-form-label"> Zip
                        <div className="col-10">
            <input className="form-control" name="zip" type="tel" value={this.state.zip} onChange={this.handleDealerChange.bind(this)}  />
          </div>
        </label>
      </div>
      <input type="submit" className="btn btn-danger" value="Add Dealer" />
    </form>
  )
}

deleateDealerDB(dealerEmailKilled) {
  console.log(dealerEmailKilled);
  helpers.deleteDealerDBHelper(dealerEmailKilled)
  .then(res => {
    if(res.data === 'Deleted'){
      swal({
        title: "Congrats",
        text: "Dealer Has Been Deleted!",
        icon: "success",
        button: "close!",
      }); 
      this.getDealers();
    }
  })
  .catch(err => console.log(err));
  }


renderDeleteDealerForm() {
  console.log(this.state.savedDealers);
  if (this.state.savedDealers !== undefined){
    // console.log("the photo array",this.state.vehicle.photoArray);
    return this.state.savedDealers.map((theDealer, index) => {
      return (
        <div  key={index} >
        <li>
          <span>{theDealer.label}</span>
          <button className="btn btn-dark" type='button' onClick={()=>{ this.deleateDealerDB(theDealer.value)}}>
          <span className="ex"> ✘</span>
          </button>
          </li>
       </div>  
      );
    });
  }
}


seeDealerForm(){
  this.setState({addDealerActive:!this.state.addDealerActive})
}

seeDeleteDealerForm(){
  this.setState({deleteDealerActive:!this.state.deleteDealerActive})
}


toggleButtonEditor(theLowerState){
  this.setState({showDeleteButton:theLowerState})
}

// clears the search from in filter component 
sendClearSearch(){
  this.getSavedData();
}

linkToDetail(addressId){
  var path = `/books/${addressId}`;
  this.props.history.push(path)
}

renderArticles = () => {
  return this.state.savedArticles.map((article, index) => {
    var liBackground=null;

    if( index % 2 == 0){
        console.log(index);
      liBackground = '#eeeeee';
    } else{
      liBackground = 'white';
    }

    return (
      <div key={index}>
        <li className="list-group-item" style={{backgroundColor:`${liBackground}`}}>
          <h4 className="panel-text-size">
            <span>
              <em>{article.make}&nbsp;&nbsp;&nbsp;</em>
              <em>{article.model}&nbsp;&nbsp;&nbsp;</em>
              <em>{article.year}&nbsp;&nbsp;&nbsp;</em>
            </span>
            <span>
              <em>{article.vin}</em>
            </span>
             </h4>

            <span className="btn-group pull-right ">
                  <button onClick={() => this.linkToDetail(article._id)} className="btn btn-primary btn-responsive" >View Vehicle</button>            
              {this.state.showDeleteButton ? (<button className="btn btn-danger btn-responsive" onClick={() => this.handleClick(article)}>Delete</button>) : null}
            </span>
             {this.state.isCreating ? (
              <form>
                <label>
                  Add to Markerting:
                  <input
                    name={article._id}
                    type="checkbox"
                    checked={article.inMarketCart}
                    onChange={(e) => this.handleInputChange(e, article._id, index)} />
                </label>
              </form>
            
            ) : null}
         
          <p>Days Since Entered: {this.getDate(article.date)}</p>
          <Row>
            <Col size="xs-3">
              <Row>
                <Col size="sm-6"><strong>Miles:</strong>&nbsp;{article.miles}</Col>
                <Col size="sm-6"><strong>Color:</strong>&nbsp;{article.color}</Col>
              </Row>
            </Col>
            <Col size="xs-5">
              <Row>
                <Col size="sm-4"><strong>Trim:</strong>&nbsp;{article.trim}</Col>
                <Col size="sm-8"><strong>Location:</strong>&nbsp;{article.location}</Col>
              </Row>
            </Col>
            <Col size="xs-4">
              <Row>
                <Col size="sm-6"><strong>Price:</strong>&nbsp;{article.price}</Col>
                <Col size="sm-6"><strong>Color:</strong>&nbsp;{article.color}</Col>
              </Row>
            </Col>
          </Row>
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
                {/* thePath={this.props.location.pathname */}
                <Filter handleCreateClick={this.handleCreateClick.bind(this)} isCreating={this.state.isCreating} filteredSearch={this.handleFilteredSearch} inventoryState={this.state}  toggleModalInventory={this.toggleModalInventory.bind(this)} renderedFrom={this.props.location.pathname} toggleButtonEditor={this.toggleButtonEditor.bind(this)} sendClearSearchInventory={this.sendClearSearch.bind(this)}/>
                
              </div>
              <div className="panel-body">
                <ul className="list-group">
                  {this.renderArticles()}
                </ul>
              </div>
            </div>
          </div>
        </div>
        <div>
          <Modal style={{
    overlay: {
      position: 'fixed',
      top: 0,
      left: 0,
      right: 0,
      bottom: 0,
      backgroundColor: 'rgba(255, 255, 255, 0.75)'
    },
    content: {
      position: 'absolute',
      top: '40px',
      left: '40px',
      right: '40px',
      bottom: '40px',
      border: '1px solid #ccc',
      background: '#fff',
      overflow: 'auto',
      WebkitOverflowScrolling: 'touch',
      borderRadius: '4px',
      outline: 'none',
      padding: '20px'
    }
  }} className="modal-dialog" role="document" isOpen={this.state.isActive} ariaHideApp={false}>
            <div className="modal-content">
              <div className="modal-header">
                <h3 className="modal-title" id="exampleModalLabel">Select Inventory Recipients</h3>
                {/* <button type="button" className="close" data-dismiss="modal" aria-label="Close">
          <span aria-hidden="true">&times;</span>
         </button> */}
              </div>
              <div className="modal-body">
                <p>Choose Recepients </p>
                <form>
                  <div className="radio">
                    <label>
                      <input type="radio" value="option1"
                        checked={this.state.selectedOption === 'option1'}
                        onChange={this.handleOptionChange.bind(this)} />
                      Send to all dealers
                    </label>
                  </div>
                  <div className="radio">
                    <label>
                      <input type="radio" value="option2"
                        checked={this.state.selectedOption === 'option2'}
                        onChange={this.handleOptionChange.bind(this)} />
                      Choose dealers individually
                    </label>
                  </div>
                </form>
                {this.state.selectedOption === 'option2' ? this.SelectDealers() : null}
                {this.state.addDealerActive ? this.renderDealerForm() : null}
                {this.state.deleteDealerActive ? this.renderDeleteDealerForm() : null}
              </div>
              <div className="modal-footer">
              <button type="button" className="btn btn-primary" onClick={() => this.seeDealerForm()} >Toggle Add Dealer</button>
              <button type="button" className="btn btn-primary" onClick={() => this.seeDeleteDealerForm()} >Toggle Delete Dealer</button>
                <button type="button" className="btn btn-success" onClick={() => this.sendInventoryEmail()} >Send Inventory</button>
                <button type="button" onClick={() => this.toggleModalInventory()} className="btn btn-secondary" data-dismiss="modal">Close</button>
              </div>
            </div>
          </Modal>
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
export default Inventory;
