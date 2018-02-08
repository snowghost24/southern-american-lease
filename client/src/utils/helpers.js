// Includes the Axios library for HTTP requests
import axios from "axios";
// Helper Functions
const helpers = {
  // called from vehicle Entry
  // retrieves vehicle data from NHTSA /endping -> data-vehDataController-func: create
  vinSearchNHTSAHelper: function (vinNumb) {
    var formattedVinNum = vinNumb.trim();
    return axios.post("/api/vehicle/data", { vin: formattedVinNum })
      .then(function (response) {
        return response
      }).catch(function (error) {
        console.log(error);
      });
  },

  // This will run our query.
  enterVehicleDataHelper: function (entryData) {
    console.log(entryData);

    console.log('postSaved', entryData)
    return axios.put("/api/vehicle/data", entryData)
      .then(function (response) {
        return response
      }).catch(function (error) {
        console.log(error);
      });
  }
  //--------------------------------------------------------
  ,
  // This will return all saved vehicles in database 
  // called from inventory
  getSaved: function () {
    return axios.get("/api/saving/saved")
      .then(function (results) {
        console.log("axios results from get saved", results);
        return results;
      }).catch(function (error) {
        console.log(error);
      });
  },  
  //called from client inventory
  getSavedMarketing: function () {
    return axios.get("/api/vehicle/data")
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
  },  

  // sends emaisl to individuals 
  sendInventoryEmailHelper: function (emailRecipients) {
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
  
  sendInventoryEmailHelperAll: function (emailRecipients) {
    return axios.put("/dealers/dealer/", {
        emailRecipients:'all'
    })
      .then(function (results) {
        console.log("axios results from get filtered", results);
        return results;
      }).catch(function (error) {
        console.log(error);
      });
  }, deleteDealerDBHelper: function (delDealerEmail) {
    return axios.delete("/dealers/dealer/",{
      params: {
        "dealer": delDealerEmail
      },
    } )
      .then(function (results) {
        return results;
      }).catch(function (error) {
        console.log(error);
      });
  },

}


// We export the helpers function
export default helpers;