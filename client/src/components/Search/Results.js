// Include React as a dependency
import React, { Component } from 'react'

// Include our helpers for API calls
import helpers from "../../utils/helpers";

// Results Component Declaration
class Results extends Component {
  // Here we will save states for the contents we save
  state = {
    title: "",
    url: "",
    pubdate: ""
  }

  // This code handles the sending of the search terms to the parent Search component
  handleClick = (item) => {
    console.log("CLICKED", item);

    helpers.postSaved(item.headline.main, item.pub_date, item.web_url).then(function() {
      console.log(item.web_url);
    });
  }

  // A helper method for mapping through our articles and outputting some HTML
  renderArticles = () => {

    
    // return this.props.results.map((feature, index) => {

    //   // Each article thus reperesents a list group item with a known index
    //   return (
    //     <div key={index}>
    //       <li className="list-group-item">
    //         <h3>
    //           <span>
    //             <em>{feature}</em>
    //           </span>
    //           <span className="btn-group pull-right">
    //             <a href={feature} rel="noopener noreferrer" target="_blank">
    //               <button className="btn btn-default ">View Article</button>
    //             </a>

    //             {/*
    //               By using an arrow function callback to wrap this.handleClick,
    //               we can pass in an article as an argument
    //             */}
    //             <button className="btn btn-primary" onClick={() => { this.handleClick(feature)}}>Save</button>
    //           </span>
    //         </h3>
    //         <p>Date Published: {feature.make}</p>
    //       </li>
    //     </div>
    //   );
    // });
  }

  // A helper method for rendering a container to hold all of our articles
  // renderContainer = () => {
  //   return (
  //     <div className="main-container">
  //       <div className="row">
  //         <div className="col-lg-12">
  //           <div className="panel panel-primary">
  //             <div className="panel-heading">
  //               <h1 className="panel-title">
  //                 <strong>
  //                   <i className="fa fa-list-alt"></i>
  //                   Results
  //                 </strong>
  //               </h1>
  //             </div>
  //             <div className="panel-body">
  //               <ul className="list-group">
  //                 {this.renderArticles()}
  //               </ul>
  //             </div>
  //           </div>
  //         </div>
  //       </div>
  //     </div>
  //   );
  // }

   renderContainer = () => {
     return (
       <div>
       {/* {this.props.sentDown[0]['make']} */}
       </div>
     )

   }


  render() {
    // console.log("these are the results in results",this.props.sentDown);
    // If we have no articles, render this HTML
    if (!this.props.sentDown) {
      return (
        <li className="list-group-item">
          <h3>
            <span>
              <em>Enter search terms to begin...</em>
            </span>
          </h3>
        </li>
      );
    }
    // If we have articles, return this.renderContainer() which in turn, returns all the articles
    return this.renderContainer();
  }
};

// Export the module back to the route
export default Results;