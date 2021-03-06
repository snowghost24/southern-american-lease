import axios from "axios";

export default {
  // Gets all books
  // Gets the book with the given id
  getVehicle: function(id) {
    return axios.get("/api/booking/books/" + id)
    .then(function (results) {
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
  },   updateLift: function (id,newChanges) {
    // console.log("update date helper",id,newChanges);
    return axios.put("/api/lift/liftrange/"+ id, {
      newChanges
    })
      .then(function (results) {
        // console.log("results after new color", results);
        return results;
      }).catch(function (error) {
        console.log(error);
      });
  },   updateDetail: function (id,newChanges) {
    // console.log("update date helper",id,newChanges);
    return axios.put("/api/detail/detailedTrucks/"+ id, {
      newChanges
    })
      .then(function (results) {
        // console.log("results after new color", results);
        return results;
      }).catch(function (error) {
        console.log(error);
      });
  },deleteFileCloud: function (vin,formData) {
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
  }, printInventory: function (printData ) {
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
    },hideLeatherHandler:function (id) {
      return axios.delete("/api/leather/leatherkit/"+ id, {
        id:id
      })
        .then(function (results) {
          console.log("printing data results", results);
          return results;
        }).catch(function (error) {
          console.log(error);
        });
      },
      hideLiftHandler:function (id) {
        //Hides vehicles from Leather
        // console.log(object);
        return axios.delete("/api/lift/liftrange/"+ id, {
          id:id
        })
          .then(function (results) {
            console.log("printing data results", results);
            return results;
          }).catch(function (error) {
            console.log(error);
          });
        },
        hideDetailHandler:function (id) {
          //Hides vehicles from Leather
          // console.log(object);
          return axios.delete("/api/detail/detailedTrucks/"+ id, {
            id:id
          })
            .then(function (results) {
              console.log("printing data results", results);
              return results;
            }).catch(function (error) {
              console.log(error);
            });
          },bringBackLeatherHandler:function (vin) {
        //Brings Back hidden vehicles
        return axios.post("/api/leather/leatherkit", {
          vin:vin
        })
          .then(function (results) {
            console.log("api / bringbackleatherhadler", results);
            return results;
          }).catch(function (error) {
            console.log(error);
          });
        },bringBackLiftHandler:function (vin) {
          //Hides vehicles from Leather
          // console.log(object);
          return axios.post("/api/lift/liftrange", {
            vin:vin
          })
            .then(function (results) {
              console.log("printing data results", results);
              return results;
            }).catch(function (error) {
              console.log(error);
            });
          },bringBackDetailHandler:function (vin) {
            //Hides vehicles from Leather
            // console.log(object);
            return axios.post("/api/detail/detailedTrucks/", {
              vin:vin
            })
              .then(function (results) {
                console.log("printing data results", results);
                return results;
              }).catch(function (error) {
                console.log(error);
              });
            },  addToCartHelper: function (vehicleId) {
         // Use req.query.... to grab values
          return axios.get("/cart/addtocart/", {
            params: {
              addingToCart: vehicleId,
            }
          })
            .then(function (results) {
              return results;
            }).catch(function (error) {
              console.log(error);
            });
        },getSavedInventoryHandler: function(id) {
          return axios.get("/api/vehicle/data")
          .then(function (results) {
            return results;
          }).catch(function (error) {
            console.log(error);
          });;
        },
        // "/sales/inventory"
        deletePhotosDbHandler: function (vin, deleteUrl,deleteName) {
    console.log('delete photo handler' ,vin, deleteUrl,deleteName);
    return axios.get("/google/uploads/", {
      params:{theVin: vin,
      deleteUrl: deleteUrl,
      deleteName:deleteName} 
    })
      .then(function (results) {
        console.log("return from delete photo->", results);
        return results;
      }).catch(function (error) {
        console.log(error);
      });
  },
  // "/sales/inventory"
  deleteFeatureDbHandler: function (id, deleteFeature) {
// console.log('delete feature handler' ,vin, deleteFeature);
return axios.get("/sales/inventory", {
params:{theId: id,
deleteFeature: deleteFeature,
} 
})
.then(function (results) {
  // console.log("return from delete feature->", results);
  return results;
}).catch(function (error) {
  console.log(error);
});
},addFeatureFunctionHandler:function(feature,id) {
    return axios.post("/sales/inventory", {
      feature:feature,
      _id:id
    })
      .then(function (results) {
        return results;
      }).catch(function (error) {
        console.log(error);
      });
    
  },setBuyerHandler:function(vin,id) {
    console.log("id in handler",id);
    return axios.post("/sales/inventory/" + id, {
      vin:vin,
      _id:id
    })
      .then(function (results) {
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
