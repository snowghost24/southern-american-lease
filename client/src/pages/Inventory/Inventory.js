// Include React as a dependency
import React, { Component } from 'react'
import { Link } from "react-router-dom";
import API from "../../utils/API";
import helpers from "../../utils/helpers";
import Filter from "../../components/filter/filter";

// Create the Main component
class Inventory extends Component {
  state = {
    savedArticles: []
  }

  // On mount get all saved articles from our db
  componentDidMount() {
    helpers.getSaved()
    .then((articleData) => {
      this.setState({ savedArticles: articleData.data });
    });
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

  handleFilteredSearch =(searchType,searchItem)=>{  
    helpers.getFilteredSaved(searchType, searchItem)
    .then((articleData) => {
      this.setState({ savedArticles: articleData.data });
      // console.log("saved results", articleData.data);
    });
  }
  
  getDate(date){
    var start =new Date(date).getTime();
// console.log(start);
var now = Date.now();
// console.log(now);
var elapsedTime = now - start;
var days = Math.floor(elapsedTime / 8.64e+7);
return days
// console.log("starting timer...");
// // expected output: starting timer...

// setTimeout(function() {
//   var millis = Date.now() - start;

//   console.log("seconds elapsed = " + Math.floor(millis/1000));
//   // expected output : seconds elapsed = 2
// }, 2000);
    // var countUpFrom = new Date(date).getHours()
    // console.log(date);
    // console.log(countUpFrom);
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
            <p>Days Since Entered: {this.getDate(article.date)}</p>
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
                <Filter filteredSearch={this.handleFilteredSearch} inventoryState={this.state}/>
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
export default Inventory;
