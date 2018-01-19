const router = require("express").Router();
const requesting = require('request');

// cloudinary.config({ 
//    cloud_name: process.env.CLOUD_NAME,
//    api_key: process.env.API_KEY,
//    api_secret: process.env.API_SECRET
//  });

// // Matches with "/api/booking/books/:id"
router.route("/:vin")
  .post(function(req, res) {
    console.log(" im inside",req.params.vin);
    console.log(" im inside",req.body.theFile);
   
    var formData = req.body.theFile

    var myUrl = "https://api.cloudinary.com/v1_1/dcv191fk7/upload";
    var vin = req.body.vin
    // var obj = { format: "json", data:vin};
       requesting.post({
        headers: { "X-Requested-With": "XMLHttpRequest" },         url:myUrl,
         form: formData
     },function(error, response, body){
    console.log(error,response,body);
       })
  });



module.exports = router;
