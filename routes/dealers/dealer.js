const nodemailer = require('nodemailer');
const router = require("express").Router();
const DealerEntry = require("../../models/dealers/dealer");
'use strict';
require('dotenv').config()
const mongoose = require("mongoose");
// brings back all updated values
// {new: true}r
// updates value if they dont exist
// { upsert: true }

// find all dealers in the database from helpers func: getSavedDealers
router.route("/")
  .get(function (req, res) {
    DealerEntry.find({})
      .exec(function (err, doc) {
        if (err) {
          console.log(err);
        }
        else {
          res.send(doc);
        }
      }).catch(err => res.status(422).json(err));
  })

  // handles entering dealers into a database from Helpers func:enterDealerHelper
  .post(function (req, res) {
    console.log(req.body);
  
    var newDealerEntry = new DealerEntry({ 
      _id: new mongoose.Types.ObjectId(),
      name: req.body.name,
      email: req.body.email,
      dealership:req.body.dealership,
      tel:req.body.tel,
      address:req.body.address,
      city:req.body.city,
      state:req.body.state,
      zip:req.body.zip
     });
    newDealerEntry.save(function (err, doc) {
      if (err) {
        //note sure whey the error had to be inside error
        if (err.name === 'MongoError' && err.code === 11000) {
          //DO NOT change response message
          console.log(err);
          res.send("duplicate dealer entry");
        }
        console.log(err);
       res.send(err)
      }
      else {
        console.log("this is the doc",doc);
        res.send(doc);
      }
    });

  })

  //handles deleting dealers from Helpers fuc: deleteDealerDBHelper
  .delete(function (req, res) {
    var dealerEmail = req.query.dealer;
    DealerEntry.find({ email: dealerEmail }).remove().exec(function (err) {
      if (err) {
        console.log(err);
      }
      else {
        //DO NOT change response message
        res.send("Deleted");
      }
    })
  })
  
  // from helper func: sendInventoryEmailHelper/all
  .put(function (req, res) {
// settings for node mailer
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

    // handles sending emails to all recepients or individuals
    if (req.body.emailRecipients === 'all') {
      DealerEntry.find({}).exec(function (err, doc) {
        if (err) {
          console.log(err);
          res.send("err - cannot find all email recipients");
        }
        else {
          // Handles sending emails to all
          doc.forEach((element, index) => {
            var toPerson = element.email;
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
              html: '<b>' + "hello again" + '</b>'
            };
            // function to send email 
            transporter.sendMail(mailOptions, (error, info) => {
              if (error) {
                return console.log(error);
              }
              console.log('Message sent: %s', info.messageId);
            })
          })
        }
      });
      // handles sending emails to individuals
    } else {
      var emailGetter = req.body.emailRecipients;
      emailGetter.forEach(function (toPerson, i, array) {
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
          html: '<b>' + "hello again" + '</b>'
        };

        //function to send email        
        transporter.sendMail(mailOptions, (error, info) => {
          if (error) {
            return console.log(error);
          }
          console.log('Message sent: %s', info.messageId);
        })
      });
    }
  }),



  module.exports = router;
