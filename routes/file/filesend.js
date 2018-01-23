const router = require("express").Router();
// const requesting = require('request');
var cloudinary = require('cloudinary');
const  AutoEntry = require("../../models/book");
var tesseract = require('tesseract.js')
// var textract = require('textract');
// // Matches with "/api/file/filesend/:id"
router.route("/").post(function (req, res) {
  // console.log("save vin url body-->", req.body);


//---------------------------------------------------------------
const vision = require('@google-cloud/vision');
const client = new vision.ImageAnnotatorClient({
  keyFilename:"/Users/Snowghost/Documents/southern_lease3/visioncredentials.json"
});
//Check if vin in url matches vin on car
const fileName = req.body.theUrl;
// Performs text detection on the local file
  client
    .textDetection(fileName)
    .then(results => {
      var foundCheck = false;
      const detections = results[0].textAnnotations;
      detections.forEach((text) => {
        // console.log(text.description)
        if (req.body.theVin  === text.description) {
          foundCheck = true;
        } else {
        
        }
      }

      );
      if (foundCheck === true){

        var changes = { vinImage: req.body.theUrl, vinConfirmed:true }
        AutoEntry.findOneAndUpdate({ vin: req.body.theVin }, { $set: changes }, { upsert: true , new: true })
          .then((dbModel) => {
            console.log("the model is", dbModel);
            res.send(dbModel)
          })
          .catch(err => res.status(422).json(err));


      }else{
        var changes = { vinImage: req.body.theUrl }
        AutoEntry.findOneAndUpdate({ vin: req.body.theVin }, { $set: changes }, { upsert: true , new: true })
          .then((dbModel) => {
            console.log("the model is", dbModel);
            res.send(dbModel)
          })
          .catch(err => res.status(422).json(err));



      }


    })
    .catch(err => {
      console.error('ERROR:', err);
    });









})
// brings back all updated values
// {new: true}
// updates value if they dont exist
// { upsert: true }
router.route("/:vin")
  .post(function (req, res) {
    var changes = { vinImage: "", vinConfirmed:false  }
    AutoEntry.findOneAndUpdate({ vin: req.params.vin }, { $set: changes }, {new: true})
      .then((dbModel) => {
        //remove values from Cloudinary
        // console.log(" im inside", req.params.vin);

        console.log(dbModel);
        var key = [process.env.API_KEY]
        var secret = process.env.API_SECRET
        var name = process.env.CLOUD_NAME
        cloudinary.v2.uploader.destroy(req.params.vin, {
          api_key: '918296179275747',
          api_secret: 'eN2PJpKj7OM3iuKElHF0mYYeITk',
          cloud_name: 'dcv191fk7'
        }, function (error, result) { console.log(error, result) });
        res.send(dbModel)
      })
      .catch(err => res.status(422).json(err));
  });

module.exports = router;
