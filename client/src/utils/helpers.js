// Include the Axios library for HTTP requests
import axios from "axios";

// NYT API Key (Replace with your own API Key)
var APIKey = "9b3adf57854f4a19b7b5782cdd6e427a";

// Helper Functions
const helpers = {

  // This will run our query.
  runQuery: function(vin, make, model, year) {

    // Adjust to get search terms in proper format
    var formattedVin = vin.trim();
    var formattedMake = make.trim();
    var formattedModel = model.trim() ;
    var formattedYear = year.trim() ;

    var newArticle = { theVin: formattedVin, theMake: formattedMake, theModel: formattedModel, theYear: formattedYear};
    console.log('postSaved', newArticle)
    return axios.post("/api/saving/saved", newArticle)
      .then(function(response) {
        console.log("axios results", response.data._id);
        return response.data._id;
      });
  }
  //---------------------------------------------------------------------------------
  ,  runQueryAjax: function(vinNumb) {

    // Adjust to get search terms in proper format
    var formattedVinNum = vinNumb.trim();
    // var vin = {"vin":formattedVinNum}
    return axios.post("/api/booking/books", {vin: formattedVinNum})
    .then(function(response) {
     
   
      return response
    }).catch(function (error) {
      console.log(error);
      // alert("Invalid vin");
    });
  

  }
  ,
  // This will return any saved articles from our database
  getSaved: function() {
    return axios.get("/api/saving/saved")
      .then(function(results) {
        console.log("axios results", results);
        return results;
      });
  },
  // This will save new articles to our database
  postSaved: function(title, date, url) {
    var newArticle = { title: title, date: date, url: url };
    console.log('postSaved', title)
    return axios.post("/api/saving/saved", newArticle)
      .then(function(response) {
        console.log("axios results", response.data._id);
        return response.data._id;
      });
  },
  // This will remove saved articles from our database
  deleteSaved: function(title, data, url) {
    return axios.delete("/api/saving/saved", {
      params: {
        "title": title,
        "data": data,
        "url": url
      }
    })
    .then(function(results) {
      console.log("axios results", results);
      return results;
    });
  }
};


// We export the helpers function
export default helpers;