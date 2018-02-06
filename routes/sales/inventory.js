const router = require("express").Router();
const  AutoEntry = require("../../models/autos/auto");
// const cloudinary = require('cloudinary');
// const vision = require('@google-cloud/vision');
//retrieves credentials stored in a json file
// const client = new vision.ImageAnnotatorClient({
//   keyFilename:"/Users/Snowghost/Documents/southern_lease3/vinkey.json"
// });

// brings back all updated values
// {new: true}
// updates value if they dont exist
// { upsert: true }




router.route("/").get(function (req, res) {
  console.log("im inside");
AutoEntry.find({ inMarketCart:true })
.exec(function(err, doc) {
  if (err) {
    console.log(" im in sales inventory");
    console.log(err);
  }
  else {
    console.log("here are the response", doc);
    res.send(doc);
  }
});
})

//1. Receives the image url and passes to the google vision api for inspection
//2. Vision inspects img, if text matches vin assign true to found check
//3. if there is a match assign vinConfirmed to true in db and set vinImg to URL
//4. else vinConfirmed is false and store the url in the DB
// Matches with "/api/file/filesend/:id"
// router.route("/").post(function (req, res) {
//   const fileName = req.body.theUrl;
//   var foundCheck = false;
//   // Performs image dection
//   client
//     .textDetection(fileName)
//     .then(results => {
//       const detections = results[0].textAnnotations;
//       detections.forEach((text) => {
//         //only if a value matches set the foundCheck equal to true else leave false
//         if (req.body.theVin === text.description) {
//           foundCheck = true;
//         }
//       });

//       if (foundCheck === true) {
//         //database updates if true
//         var changes = { vinImage: req.body.theUrl, vinConfirmed: true }
//         AutoEntry.findOneAndUpdate({ vin: req.body.theVin }, { $set: changes }, { upsert: true, new: true })
//           .then((dbModel) => {
//             console.log("confirmed true model", dbModel);
//             res.send(dbModel)
//           })
//           .catch(err => res.status(422).json(err));

//       } else {
//         //database updates if false
//         var changes = { vinImage: req.body.theUrl, vinConfirmed: false }
//         AutoEntry.findOneAndUpdate({ vin: req.body.theVin }, { $set: changes }, { upsert: true, new: true })
//           .then((dbModel) => {
//             console.log("confirmed false model", dbModel);
//             res.send(dbModel)
//           })
//           .catch(err => res.status(422).json(err));
//       }
//     })
//     .catch(err => {
//       console.error('ERROR:', err);
//     });
// })





// //1. retrieves values submmited thorugh axios and changes values in database
// //2. if err clg err else detroy the image from axios
// //3.  if err clg err else send back the dbmodel 

// router.route("/:vin")
//   .post(function (req, res) {
//     //updates values in db
//     var changes = { vinImage: "", vinConfirmed:false  }
//     AutoEntry.findOneAndUpdate({ vin: req.params.vin }, { $set: changes }, {new: true}, function (err,dbModel) {
//       if (err){
//         console.log(err);
//         res.status(422).json(err)
//       } else {
//         //remove values from Cloudinary
//         cloudinary.v2.uploader.destroy(req.params.vin, {
//           api_key: '918296179275747',
//           api_secret: 'eN2PJpKj7OM3iuKElHF0mYYeITk',
//           cloud_name: 'dcv191fk7'
//         }, function (err, result) { 
//           if (err){
//             console.log(err);
//             res.status(422).json(err)
//           } else {
//             console.log("sending back", dbModel);
//             res.send(dbModel)
//           }        
//         }); 
//       }
//     })
//   })
      
module.exports = router;
