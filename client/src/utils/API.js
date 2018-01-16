import axios from "axios";

export default {
  // Gets all books
  // getBooks: function() {
  //   return axios.get("/api/booking/books");
  // },
  // Gets the book with the given id
  getBook: function(id) {
    return axios.get("/api/booking/books/" + id);
  },
  dataEntryUpdateHelper: function (id,theStates) {
    console.log("update date helper",id,theStates);
    return axios.put("/api/booking/books/"+ id, {
        theStates
    })
      .then(function (results) {
        console.log("data update results", results);
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
        console.log("results after new color", results);
        return results;
      }).catch(function (error) {
        console.log(error);
      });
  }
  // Deletes the book with the given id
  // deleteBook: function(id) {
  //   return axios.delete("/api/booking/books/" + id);
  // },
  // Saves a book to the database
  // saveBook: function(bookData) {
  //   return axios.post("/api/booking/books", bookData);
  // }
};
