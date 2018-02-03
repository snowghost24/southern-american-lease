// Include React as a dependency
import React, { Component } from 'react'
import { Link } from "react-router-dom";
import API from "../../utils/API";
import helpers from "../../utils/helpers";
import Filter from "../../components/filter/filter";
import Modal from 'react-modal';
// Create the Main component
class Inventory extends Component {
  state = {
    savedArticles: [],
    isCreating:false,
    isActive:false
  }

  
  // On mount get all saved articles from our db
  componentDidMount() {
    helpers.getSaved()
      .then((articleData) => {
        this.setState({ savedArticles: articleData.data });
      });
      console.log("the location",this.props.location);
  }

  // componentDidUpdate(){
  //   helpers.getSaved()
  //   .then((articleData) => {
  //     this.setState({ savedArticles: articleData.data });
  //   });
  //   console.log("the location",this.props.location);
  // }

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
    helpers.getFilteredSaved(searchType, searchItem)
      .then((articleData) => {
        this.setState({ savedArticles: articleData.data });
        // console.log("saved results", articleData.data);
      })
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
    console.log(this.state.forMarketing);
    // console.log("the state is",this.state);
  }

  myOtherFunction = () => {
    console.log("the state is",this.state);
    // console.log("the state is",this.state);
  }
  handleInputChange(event,theId, index) {
    // var theItem = this.state.savedArticles[index].inMarketCart;

    // console.log(index);
    // console.log(event.target.name);
    // const target = event.target;
    // const value = target.type === 'checkbox' ? target.checked : target.value;
    // console.log("The value is",value);
    // const name = target.name;

    // this.setState({
    //   [name]: true
    // }, this.myOtherFunction );

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
      // res =>{console.log("from add cart helper",res,this.state)} 
    )
    .catch(err => console.log(err));

    // if (this.state.forMarketing.indexOf(vehicle) === -1) {
    //   // console.log(this.state.forMarketing.indexOf(vehicle))
    //   var newStateArray = this.state.forMarketing.slice();
    //   newStateArray.push(vehicle);
    //   this.setState({forMarketing: newStateArray }, this.myFunction)
    // } else if (this.state.forMarketing.indexOf(vehicle) !== -1) {
    //   var newStateArray = this.state.forMarketing.slice();
    //   newStateArray.pop(vehicle);
    //   this.setState({forMarketing: newStateArray }, this.myFunction)    }
  }




  // A helper method for mapping through our articles and outputting some HTML
  renderArticles = () => {
    return this.state.savedArticles.map((article, index) => {

      return (
        <div key={index}>
          <li className="list-group-item">
            <h3>
              <span>
                <em>{article.make}&nbsp;&nbsp;&nbsp;</em>
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
                  {this.state.isCreating ? ( <form className="form-control">
      <label>
        Add to Markerting:
        <input 
          // name="isGoing"
          name={article._id}
          type="checkbox"
          // checked={article.inMarketCart
          // }
         
           checked={article.inMarketCart}
          onChange={(e) => this.handleInputChange(e,article._id,index)} />
      </label>
    </form>) :null}
              </span>
            </h3>
            <p>Days Since Entered: {this.getDate(article.date)}</p>
          </li>
        </div>
      );
    });
  }


  handleCreateClick = () => {
    if (this.state.isCreating){
      console.log("changed to false");
        this.setState({
      isCreating: false
    })
    }else{
      console.log("changed to true");
        this.setState({
      isCreating: true
    })
    }

    // this.setState({
    //   isCreating: !this.state.isCreating
    // })
    console.log(this.state.isCreating);
  }


  handleSendInventory(){
    prompt(" Who do you want to send to")
  }

  toggleModalInventory = () => {
    this.setState({
     isActive: !this.state.isActive
    })
  }

  sendInventoryEmail=()=>{
    console.log("sending Inventory");
  //   var bringBackVin = this.refs.newText.value;
  // // console.log(bringBackVin);
  
  // console.log(this.props.leatherProps);
  //   API.bringBackLeatherHandler(bringBackVin)
  //    .then(res => {
  //      if (res.data.leatherHide === false){
  //        this.props.theReload()
  //      }
  //     console.log(res);
    //  })
    //  .catch(err => console.log(err));
   };
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
                {/* thePath={this.props.location.pathname */}
                <Filter handleCreateClick={this.handleCreateClick.bind(this)} isCreating={this.state.isCreating} filteredSearch={this.handleFilteredSearch} inventoryState={this.state} handleSendInventory={this. handleSendInventory.bind(this)} toggleModalInventory={this.toggleModalInventory.bind(this)} />

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
         {/* <label class="form-check-label">
    <input class="form-check-input" type="checkbox" value=""/>
    Option one is this and that&mdash;be sure to include why it's great
  </label> */}
  <div class="form-check">
  <label class="form-check-label">
    <input class="form-check-input" type="radio" name="exampleRadios" id="exampleRadios1" value="option1" checked/>
    Send To All Dealers
  </label>
</div>
<div class="form-check">
  <label class="form-check-label">
    <input class="form-check-input" type="radio" name="exampleRadios" id="exampleRadios2" value="option2"/>
   Select Dealers Individually
  </label>
</div>
{/* <div class="form-check disabled">
  <label class="form-check-label">
    <input class="form-check-input" type="radio" name="exampleRadios" id="exampleRadios3" value="option3" disabled/>
    Option three is disabled
  </label>
</div> */}

         <div id="addNote">
          <input className="form-control" ref="newText" type="text" />

          {/* <input className="form-control" ref="newText" type="text"  placeholder="Example input" /> */}
          {/* <input type="text" class="form-control" id="formGroupExampleInput" placeholder="Example input"/> */}
         </div>
         <div>
         {/* <input className="form-control" ref="newText" type="text"  placeholder="Example input" /> */}
         <label for="exampleInputEmail1">Email address</label>
    <input type="email" class="form-control" id="exampleInputEmail1" aria-describedby="emailHelp" placeholder="Enter email"/>
    <small id="emailHelp" class="form-text text-muted">We'll never share your email with anyone else.</small>
  </div>
     
         
      
         
        </div>
        <div className="modal-footer">
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
export default Inventory;
