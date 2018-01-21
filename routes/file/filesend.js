const router = require("express").Router();
// const requesting = require('request');
var cloudinary = require('cloudinary');
const  AutoEntry = require("../../models/book");


// // Matches with "/api/booking/books/:id"
router.route("/").post(function (req, res) {
  console.log("save vin url body-->",req.body);
  var changes = {vinImage:req.body.theUrl}
  AutoEntry.findOneAndUpdate({ vin: req.body.theVin}, {$set:changes},{upsert:true})
      .then((dbModel) => {
        console.log("the model is", dbModel );
        res.send(dbModel)})
      .catch(err => res.status(422).json(err));
  
})

router.route("/:vin")
  .post(function(req, res) {
    
  
    var changes = {vinImage:""}
    console.log("we made it to update");
    AutoEntry.findOneAndUpdate({ _id: req.params.id }, {$set:changes},{upsert:true})
      .then((dbModel) => {
        console.log("the model is", dbModel );
        res.send(dbModel)})
      .catch(err => res.status(422).json(err));









    // console.log(" im inside",req.params.vin);
    // var key = [process.env.API_KEY]
    // var secret = process.env.API_SECRET
    // var name = process.env.CLOUD_NAME 
    // cloudinary.v2.uploader.destroy(req.params.vin, { 
    //    api_key:'918296179275747', 
    //    api_secret: 'eN2PJpKj7OM3iuKElHF0mYYeITk', 
    //    cloud_name: 'dcv191fk7' },function(error, result){console.log(error,result)});
  });

module.exports = router;
