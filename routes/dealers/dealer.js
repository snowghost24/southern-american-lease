const router = require("express").Router();
const  DealerEntry = require("../../models/dealers/dealer");
'use strict';
const nodemailer = require('nodemailer');
require('dotenv').config()
// brings back all updated values
// {new: true}r
// updates value if they dont exist
// { upsert: true }

router.route("/")
  .get(function(req, res) {
    DealerEntry.find({})
      .exec(function(err, doc) {
        if (err) {
          console.log(err);
        }
        else {
          // console.log("Im sending back docs",doc);
          res.send(doc);
        }
      });
  })
  .post(function(req, res) {
    var newDealerEntry = new DealerEntry(req.body);
    // console.log("Entry Data", req.body);
    newDealerEntry.save(function(err, doc) {
      if (err) {
        //note sure whey the error had to be inside error
        if (err.name === 'MongoError' && err.code === 11000) {
        
          // console.log("this is a duplicate entry");
          res.send("duplicate dealer entry");
        } 
        console.log(err);
      }
      else {
        // console.log("this is the doc",doc);
        res.send(doc);
      }
    });
   
  })
  .delete(function(req, res) {
    var vin = req.param("vin");
    console.log("im deleting", vin);-
    DealerEntry.find({ vin:vin }).remove().exec(function(err) {
      if (err) {
        // console.log(err);
      }
      else {
        res.send("Deleted");
      }
    })
  })
  .put(function(req, res) {
    // console.log(req.body.emailRecipients);
var emailGetter = req.body.emailRecipients;
// Generate test SMTP service account from ethereal.email
// Only needed if you don't have a real mail account for testing
// var funcOperation = {
//    sendEmail: function (req,res) {
//        console.log(req.body.responseData[0]);
//        console.log(req.body.responseData[1]);
//       }}


var ACCESSTOKEN = process.env.ACCESSTOKEN1 + process.env.ACCESSTOKEN2;
ACCESSTOKEN = ACCESSTOKEN.substring(0, ACCESSTOKEN.length - 1);


    let transporter = nodemailer.createTransport({
    host: "smtp.gmail.com",
   //  port: 587, //port 587 TLS
   //  secure: false,
   port: 465,
   secure: true,
    auth: {
      type: 'OAuth2',
      user: process.env.MAIL_USER,
      clientId: process.env.CLIENTID,
      clientSecret: process.env.CLIENTSECRET,
      accessToken: ACCESSTOKEN,  
      expires: 3600, 
      refreshToken: process.env.TOKENREFRESH  
  }
    });



    
    emailGetter.forEach(function (toPerson, i , array) {
//variable for email message to send to user
let mailOptions = {
//our email address
from: '"Dean Marco" <watsonemail24680@gmail.com>',
//user email
to: toPerson, //****NEEDS TO BE SET TO VAR FOR USER EMAIL*****/
//subject line
subject: "CANAM Vehicle Inventory",
//text and html
text: "hello", 
html: '<b>'+"hello again"+'</b>' 
};
//function to send email
console.log("sending to",toPerson);

transporter.sendMail(mailOptions, (error, info) => {
if (error) {
return console.log(error);
}
console.log('Message sent: %s', info.messageId);
})

});

  }),


      
module.exports = router;
