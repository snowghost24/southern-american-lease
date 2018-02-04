// Include the Axios library for HTTP requests
import axios from "axios";
// Helper Functions
const helpers = {
  // retrieves vehicle data from NHTSA
  vinSearchNHTSAHelper: function (vinNumb) {
    var formattedVinNum = vinNumb.trim();
    return axios.post("/api/booking/books", { vin: formattedVinNum })
      .then(function (response) {
        console.log("vinSearchNHTSAHelper func response", response);
        return response
      }).catch(function (error) {
        console.log(error);
      });
  },

  // This will run our query.
  enterVehicleDataHelper: function (entryData) {
    console.log(entryData);
    var newArticle = { 
      vin: entryData[0], 
      make: entryData[1], 
      model: entryData[2], 
      year: entryData[3], 
      lastsix: entryData[4], 
      series:entryData[5], 
      bodyCabType:entryData[6], 
      bodyClass:entryData[7],
      trim:entryData[8],
      drivetrain:entryData[9],
      doors:entryData[10],
      fuelType:entryData[11]
    };
    console.log('postSaved', newArticle)
    return axios.post("/api/saving/saved", newArticle)
      .then(function (response) {
        console.log(response);
        if (response.data === "duplicate vehicle entry") {
          return response
        } else {
          console.log("axios results", response.data._id);
          return response.data._id;
        }
      }).catch(function (error) {
        console.log(error);
      });
  }
  //--------------------------------------------------------
  ,
  // This will return all saved vehicles in database 
  getSaved: function () {
    return axios.get("/api/saving/saved")
      .then(function (results) {
        console.log("axios results from get saved", results);
        return results;
      }).catch(function (error) {
        console.log(error);
      });
  },
  getFilteredSaved: function (searchType, searchItem) {
    var searchTypeFormatted = searchType.trim();
    var searchItemFormatted = searchItem.trim()
    return axios.get("/api/booking/books", {
      params: {
        searchType: searchTypeFormatted,
        searchItem: searchItemFormatted
      }
    })
      .then(function (results) {
        console.log("axios results from get filtered", results);
        return results;
      }).catch(function (error) {
        console.log(error);
      });
  },
  // This will remove saved articles from our database
  deleteSaved: function (vin) {
    return axios.delete("/api/saving/saved", {
      params: {
        "vin": vin
      },
    })
      .then(function (results) {
        console.log("axios results", results);
        return results;
      }).catch(function (error) {
        console.log(error);
      });
  },getSavedLeather: function () {
    return axios.get("/api/leather/leatherkit")
      .then(function (results) {
        console.log("axios results", results);
        return results;
      }).catch(function (error) {
        console.log(error);
      });
  },  enterDealerHelper: function (dealerEntry) {
    // console.log(dealerData);
    var newDealer = dealerEntry;
    console.log('dealer entry data', newDealer)
    return axios.post("/dealers/dealer/", newDealer)
      .then(function (response) {
        console.log(response);
        if (response.data === "duplicate dealer entry") {
          return response
        } else {
          console.log("dealer entry results", response.data._id);
          return response.data._id;
        }
      }).catch(function (error) {
        console.log(error);
      });
  } , getSavedDealers: function () {
    return axios.get("/dealers/dealer/")
      .then(function (results) {
        console.log("axios results from get saved", results);
        return results;
      }).catch(function (error) {
        console.log(error);
      });
  },   sendInventoryEmailHelper: function (emailRecipients) {
    return axios.put("/dealers/dealer/", {
     
        emailRecipients
     
    })
      .then(function (results) {
        console.log("axios results from get filtered", results);
        return results;
      }).catch(function (error) {
        console.log(error);
      });
  },
}


// We export the helpers function
export default helpers;