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




router.route("/").put(function (req, res) {
  console.log("im inside put in inventory");
AutoEntry.find({ inMarketCart:true })
.exec(function(err, doc) {
  if (err) {
    // console.log(" im in sales inventory");
    // console.log(err);
  }
  else {
    // console.log("here are the response", doc);
    res.send(doc);
  }
});
})


router.route("/").post(function (req, res) {
var id = req.body._id;
var theFeature = req.body.feature;
var changes = {feature:theFeature}
  AutoEntry.findOneAndUpdate({ _id:id }, { $push: changes }, { upsert: true, new: true })
  .then((dbModel) => {
    res.send(dbModel)
  })
  .catch(err => res.status(422).json(err));
})
  



router.route("/").get(function (req, res) {
  console.log("im deleting feature", req.query.deleteFeature);
  var deleteFeature = req.query.deleteFeature;
  var theId = req.query.theId;
  var changes = { feature: deleteFeature }
  AutoEntry.findOneAndUpdate({ _id: theId }, { $pull: changes }, { upsert: true, new: true })
    .then((dbModel) => {
      console.log(dbModel);
      res.send(dbModel)
    })
    .catch(err => res.status(422).json(err));
})



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
