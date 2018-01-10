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
     
   console.log(" this is the reponse or empty",response);
      return response
    }).catch(function (error) {
      console.log(error);
      // alert("Invalid vin");
    });
  }
  ,

  // This will run our query.
  //responds to se
  runQuery: function(vin, make, model, year,lastsix) {
    // Adjust to get search terms in proper format
    var formattedVin = vin.trim().toUpperCase();
    var formattedMake = make.trim().toUpperCase();
    var formattedModel = model.trim().toUpperCase() ;
    var formattedYear = year.trim() ;
    var formattedLastSix = lastsix;

    var newArticle = { vin: formattedVin, make: formattedMake, model: formattedModel, year: formattedYear,lastsix:formattedLastSix};
    console.log('postSaved', newArticle)
    return axios.post("/api/saving/saved", newArticle)
      .then(function(response) {
        console.log(response);
        
        if(response.data === "duplicate vehicle entry"){
          return response
        }else {
          console.log("axios results", response.data._id);
          return response.data._id;
        }
        
      }).catch(function (error) {
        console.log(error);
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
      }).catch(function (error) {
        console.log(error);
      });
  },
  getFilteredSaved: function(searchType,searchItem) {
    var searchTypeFormatted = searchType.toLowerCase().trim();
    var searchItemFormatted = searchItem.trim()
    return axios.get("/api/booking/books",{
      params :{
        searchType: searchTypeFormatted,
        searchItem:searchItemFormatted}
    })
      .then(function(results) {
        console.log("axios results", results);
        return results;
      }).catch(function (error) {
        console.log(error);
      });
  },
  // This will remove saved articles from our database
  deleteSaved: function(vin) {
    return axios.delete("/api/saving/saved", {
      params: {
        "vin": vin
      }
    })
    .then(function(results) {
      console.log("axios results", results);
      return results;
    }).catch(function (error) {
      console.log(error);
    });
  }
};


// We export the helpers function
export default helpers;