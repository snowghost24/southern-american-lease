const express = require("express");
const bodyParser = require("body-parser");
const mongoose = require("mongoose");
const routes = require("./routes");
const requesting = require('request')
const app = express();
var cloudinary = require('cloudinary');
const PORT = process.env.PORT || 3001;
// var Article = require("./model");


// Configure body parser for AJAX requests
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());
// Serve up static assets


app.use((req, res, next) => {
  res.header("Access-Control-Allow-Origin", "*");
  res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
  res.header("Access-Control-Allow-Methods", "GET, POST, OPTIONS, PUT, DELETE");
  next();
});
app.use(express.static("client/build"));
// Add routes, both API and view
//request send them to folder routes
app.use(routes);


// Set up promises with mongoose
mongoose.Promise = global.Promise;
// Connect to the Mongo DB
mongoose.connect(
  process.env.MONGODB_URI || "mongodb://localhost/nytreact",
  {
    useMongoClient: true
  }
);

var db = mongoose.connection;
db.on("error", function(err) {
  console.log("Mongoose Error: ", err);
});

db.once("open", function() {
  console.log("Mongoose connection successful.");
});

// Start the API server
app.listen(PORT, function() {
  console.log(`🌎  ==> API Server now listening on PORT ${PORT}!`);
});


cloudinary.config({ 
  cloud_name: process.env.CLOUD_NAME,
  api_key: process.env.API_KEY,
  api_secret: process.env.API_SECRET
});


var cloudinaryStorage = require('multer-storage-cloudinary');
var multer = require('multer');
 
 
// var storage = cloudinaryStorage({
//   cloudinary: cloudinary,
//   folder: 'folder-name',
//   allowedFormats: ['jpg', 'png'],
//   filename: function (req, file, cb) {
//     cb(undefined, 'my-file-name');
//   }
// });
 
// var parser = multer({ storage: storage });


// Any non API GET routes will be directed to our React App and handled by React Router
// app.get("*", function(req, res) {
//   if ( process.env.NODE_ENV === 'production' ) {
//     res.sendFile(__dirname + "/client/build/index.html");
//   } else {
//     res.sendFile(__dirname + "/client/public/index.html");
//   }
// });







