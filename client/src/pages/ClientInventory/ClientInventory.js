
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
import { Alert } from 'reactstrap';

// values are set When component mounts
function Contact(label, value) {
  this.label = label;
  this.value = value;
}


class ClientInventory extends Component {
  state = {
    savedArticles: [],
    isCreating: false,
    isActive: false,
    selectedOption: 'option1',
    addDealerActive:false,
    savedDealers:[],
    selectedContacts:[]
  }


  // On mount get all saved articles from our db
  componentDidMount() {
   this.getMarketingData()
  this.getDealers()
  }

  // gets all marketing vehicles - called on component mount
getMarketingData(){
  helpers.getSavedMarketing()
  .then((articleData) => {
    this.setState({ savedArticles: articleData.data });
  }).catch(err=>{
    
    console.log(err)
    ;})
}


  getDealers(){
    helpers.getSavedDealers()
    .then((dealerData) => {
      var newArray = []
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
    helpers.deleteSaved(item.vin)
      .then(() => {
        // Get the revised list!
        helpers.getSaved()
          .then((articleData) => {
            this.setState({ savedArticles: articleData.data });
            // console.log("saved results", articleData.data);
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
    //method returns the number of milliseconds elapsed since January 1 1970
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

  myFunction = () => {
    console.log(this.state);
    // console.log("the state is",this.state);
  }

  myOtherFunction = () => {
    console.log("the state is", this.state);
    // console.log("the state is",this.state);
  }
  handleInputChange(event, theId, index) {
    API.addToCartHelper(theId)
      .then(
        () => {
          // Get the revised list!
          helpers.getSaved()
            .then((articleData) => {
              this.setState({ savedArticles: articleData.data });
              // console.log("saved results", articleData.data);
            });
        }
      )
      .catch(err => console.log(err));
    }
  //   if (this.state.forMarketing.indexOf(vehicle) === -1) {
  //     // console.log(this.state.forMarketing.indexOf(vehicle))
  //     var newStateArray = this.state.forMarketing.slice();
  //     newStateArray.push(vehicle);
  //     this.setState({forMarketing: newStateArray }, this.myFunction)
  //   } else if (this.state.forMarketing.indexOf(vehicle) !== -1) {
  //     var newStateArray = this.state.forMarketing.slice();
  //     newStateArray.pop(vehicle);
  //     this.setState({forMarketing: newStateArray }, this.myFunction)    }
  // }
  linkToDetail(addressId){
    var path = `/inventory/${addressId}`;
    this.props.history.push(path)
  }

  // A helper method for mapping through our articles and outputting some HTML
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
            <span className="btn-group pull-right ">
                {/* <Link to={"/books/" + article._id}>  </Link> */}
                  <button onClick={() => this.linkToDetail(article._id)} className="btn btn-primary btn-responsive" >View Vehicle</button>
              
                            
              {this.state.showDeleteButton ? (<button className="btn btn-danger btn-responsive" onClick={() => this.handleClick(article)}>Delete</button>) : null}
            </span>
             </h4>
           
             {/* <Link to={"/inventory/" + article._id}  >
                    <button className="btn btn-default ">View Vehicle</button>
                 </Link> */}
         

                      <Row>

                        <Col size="xs-3">
                        <Row>
                        <Col size="sm-6"><strong>Miles:</strong>&nbsp;{article.miles}</Col>
                           <Col size="sm-6"><strong>Color:</strong>&nbsp;{article.color}</Col>
                           
                        {/* Color:{article.color} */}
                        </Row>
                        </Col>

                        <Col size="xs-5">
                        <Row>
                           <Col size="sm-6"><strong>Trim:</strong>&nbsp;{article.trim}</Col>
                            
                            <Col size="sm-6"><strong>Drive Train:</strong>&nbsp;{article.drivetrain}</Col>
                        {/* Color:{article.color} */}
                        </Row>
                        </Col>
                        <Col size="xs-4">
                        <Row>
                           <Col size="sm-6"><strong>Key Features:</strong>&nbsp;{article.keyfeatures}</Col>
                           <Col size="sm-6"><strong>Fuel Type:</strong>&nbsp;{article.fuelType}</Col>
                        {/* Color:{article.color} */}
                        </Row>
                        </Col>





                        {/* <Col size="xs-6">Color:{article.color}</Col> */}

</Row>
        </li>
      </div>
        // <div key={index}>
        //   <li className="list-group-item">
        //     <h3>
        //       <span>
        //         <em>{article.make}&nbsp;&nbsp;&nbsp;</em>
        //         <em>{article.model}&nbsp;&nbsp;&nbsp;</em>
        //         <em>{article.year}&nbsp;&nbsp;&nbsp;</em>
        //       </span>
        //       <span>
        //         <em>{article.vin}</em>
        //       </span>
        //       <span className="btn-group pull-right">
        //         <a href={article.url} rel="noopener noreferrer" target="_blank">
        //           <Link to={"/inventory/" + article._id}  >
        //             <button className="btn btn-default ">View Vehicle</button>
        //           </Link>
        //         </a>
        //         {/* pass the pressed item () => this.handleClick(article) */}
        //         {/* <button className="btn btn-primary" onClick={() => this.handleClick(article)}>Delete</button> */}
        //         {this.state.isCreating ? (<form className="form-control">
        //           <label>
        //             Add to Markerting:
        //             <input
        //               name={article._id}
        //               type="checkbox"
        //               checked={article.inMarketCart}
        //               onChange={(e) => this.handleInputChange(e, article._id, index)} />
        //           </label>
        //         </form>) : null}
        //       </span>
        //     </h3>
        //     {/* <p>Days Since Entered: {this.getDate(article.date)}</p> */}
        //   </li>
        // </div>
      );
    });
  }


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

  handleSendInventory() {
    prompt(" Who do you want to send to")
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
      // swal("Inventory was sent!")
      // swal({
      //   title: "Top result:",
      //   text: name,
      //   icon: imageURL,
      // });
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
    this.setState({selectedContacts: newStateArray }, this.myFunction)
  }
  addDealerDB(event) {
    event.preventDefault();
    var name = this.state.name;
    var email = this.state.email;
    var dealership = this.state.dealership;
    var tel = this.state.tel;
    var url = this.state.url;
    var dealerEntryData = {name,email,dealership,tel,url}
    helpers.enterDealerHelper(dealerEntryData)
    .then(res=>{
      this.setState({name:"",email:"",dealership:"",tel:"",url:""}, ()=>{console.log(this.state);})
      this.getDealers();
      console.log(res)
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
    // this.setState({value: event.target.value});
  }


renderDealerForm(){
  return (
 <form onSubmit={this.addDealerDB.bind(this)}>
 <hr/>
                  <div className="form-group row">
                    <label className="col-2 col-form-label">Full Name
  <div className="col-10">
                        <input className="form-control" name="name" type="text" required="required" value={this.state.value} onChange={this.handleDealerChange.bind(this)}/>
                      </div>
                    </label>
                    <label className="col-2 col-form-label">Dealership
  <div className="col-10">
                        <input className="form-control" name="dealership" type="text" value={this.state.value} onChange={this.handleDealerChange.bind(this)}/>
                      </div>
                    </label>
                  </div>
                  {/* <div className="form-group row">
               
                  </div> */}
                  <div className="form-group row">
                    <label className="col-2 col-form-label">  Email
  <div className="col-10">
                        <input className="form-control" name="email" type="email" required="required" value={this.state.value} onChange={this.handleDealerChange.bind(this)}/>
                      </div>
                    </label>
                    <label className="col-2 col-form-label"> Telephone
  <div className="col-10">
                        <input className="form-control" name="tel" type="tel" value={this.state.value} onChange={this.handleDealerChange.bind(this)} data-fv-numeric="true" data-fv-numeric-message="Please enter valid phone numbers"/>
                      </div>
                    </label>
                  </div>
                  <div className="form-group row">
                    <label className="col-2 col-form-label">  URL
  <div className="col-10">
                        <input className="form-control" name="url" type="url" placeholder="https://getbootstrap.com" value={this.state.value} onChange={this.handleDealerChange.bind(this)}/>
                      </div>
                    </label>
                  </div>
                  <input type="submit" className="btn btn-danger" value="Add Dealer" />
                </form>
  )
}



seeDealerForm(){
  this.setState({addDealerActive:!this.state.addDealerActive})
}

sendClearSearch(){
  this.getMarketingData();
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
                    <i className="fa fa-download" aria-hidden="true"></i> Search By</strong>
                </h1>
                {/* thePath={this.props.location.pathname */}
                <Filter handleCreateClick={this.handleCreateClick.bind(this)} isCreating={this.state.isCreating} filteredSearch={this.handleFilteredSearch} inventoryState={this.state} handleSendInventory={this.handleSendInventory.bind(this)} toggleModalInventory={this.toggleModalInventory.bind(this)}  sendClearSearchInventoryClient={this.sendClearSearch.bind(this)} renderedFrom={this.props.location.pathname}/>

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
          <Modal className="modal-dialog" role="document" isOpen={this.state.isActive} ariaHideApp={false}>
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
              </div>
              <div className="modal-footer">
              <button type="button" className="btn btn-info" onClick={() => this.seeDealerForm()} >Toggle Add Dealer</button>
                <button type="button" className="btn btn-primary" onClick={() => this.sendInventoryEmail()} >Send Inventory</button>
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
export default ClientInventory;
