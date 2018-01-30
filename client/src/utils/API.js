import axios from "axios";

export default {
  // Gets all books
  // getBooks: function() {
  //   return axios.get("/api/booking/books");
  // },
  // Gets the book with the given id
  getVehicle: function(id) {
    return axios.get("/api/booking/books/" + id)
    .then(function (results) {
      // console.log("API getVehicle results", results);
      return results;
    }).catch(function (error) {
      console.log(error);
    });;
  },
  dataEntryUpdateHelper: function (id,theStates) {
    // console.log("update date helper",id,theStates);
    return axios.put("/api/booking/books/"+ id, {
        theStates
    })
      .then(function (results) {
        // console.log("data update results", results);
        return results;
      }).catch(function (error) {
        console.log(error);
      });
  },
  //updates the color of leather for leather page
  updateLeather: function (id,newChanges) {
    // console.log("update date helper",id,newChanges);
    return axios.put("/api/leather/leatherkit/"+ id, {
      newChanges
    })
      .then(function (results) {
        // console.log("results after new color", results);
        return results;
      }).catch(function (error) {
        console.log(error);
      });
  }, deleteFileCloud: function (vin,formData) {
    console.log("im in send file", vin);
    return axios.post("/file/filesend/"+ vin, {
      formData
    })
      .then(function (results) {
        console.log("results after new color", results);
        return results;
      }).catch(function (error) {
        console.log(error);
      });
  }, saveVinUrl: function (vin, vinUrl) {
    console.log("im in send file", vin, vinUrl);
    return axios.post("/file/filesend/", {
        theVin: vin,
        theUrl: vinUrl
    })
      .then(function (results) {
        console.log("saved vin url results->", results);
        return results;
      }).catch(function (error) {
        console.log(error);
      });
  }, printInventory: function (printData, ) {
    console.log("Thisis what im printing", printData, );
    return axios.post("print/inventory/", {
        printData:printData
    })
      .then(function (results) {
        console.log("printing data results", results);
        return results;
      }).catch(function (error) {
        console.log(error);
      });
    }





  // , deleteImgDb: function (vin, deleteItem) {
  //   console.log("im in send file", vin, deleteItem);
  //   return axios.delete("/file/filesend/", {
   
  //       theVin: vin,
  //       deleteItem: deleteItem
   
  //   })
  //     .then(function (results) {
  //       console.log("saved vin url results->", results);
  //       return results;
  //     }).catch(function (error) {
  //       console.log(error);
  //     });
  // }
  








  // Deletes the book with the given id
  // deleteBook: function(id) {
  //   return axios.delete("/api/booking/books/" + id);
  // },
  // Saves a book to the database
  // saveBook: function(bookData) {
  //   return axios.post("/api/booking/books", bookData);
  // }
};
