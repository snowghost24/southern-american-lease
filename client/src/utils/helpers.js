// Include the Axios library for HTTP requests
import axios from "axios";



// Helper Functions
const helpers = {
// retrieves vehicle data from api
  runQueryAjax: function(vinNumb) {

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

  // This will run our query.
  runQuery: function(vin, make, model, year) {
    // Adjust to get search terms in proper format
    var formattedVin = vin.trim();
    var formattedMake = make.trim();
    var formattedModel = model.trim() ;
    var formattedYear = year.trim() ;

    var newArticle = { vin: formattedVin, make: formattedMake, model: formattedModel, year: formattedYear};
    console.log('postSaved', newArticle)
    return axios.post("/api/saving/saved", newArticle)
      .then(function(response) {
        console.log("axios results", response.data._id);
        return response.data._id;
      });
  }
  //---------------------------------------------------------------------------------
  ,  
  // This will return any saved articles from our database
  getSaved: function() {
    return axios.get("/api/saving/saved")
      .then(function(results) {
        console.log("axios results", results);
        return results;
      });
  },
  // This will remove saved articles from our database
  deleteSaved: function(vin, make, model, year,date) {
    return axios.delete("/api/saving/saved", {
      params: {
        "vin": vin,
        "make": make,
        "model": model,
        "year":year,
        "date":date


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