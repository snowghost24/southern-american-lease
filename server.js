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


// var path = require('path');
// var pdfMakePrinter = require('pdfmake/src/printer');
// var rootDir = path.resolve(path.dirname('.'));
// // var pdfMake = require('pdfmake')

// // app.use(express.static(path.join(__dirname, 'public')));
// // app.use(bodyParser.json({ limit: '50mb' }));
// // app.use(bodyParser.urlencoded({ extended: false }));



//   var fontDescriptors = {
//     Roboto: {
//       normal: path.join(__dirname, '..', 'examples', '/fonts/Roboto-Regular.ttf'),
//       bold: path.join(__dirname, '..', 'examples', '/fonts/Roboto-Medium.ttf'),
//       italics: path.join(__dirname, '..', 'examples', '/fonts/Roboto-Italic.ttf'),
//       bolditalics: path.join(__dirname, '..', 'examples', '/fonts/Roboto-MediumItalic.ttf')
//     }
//   };

//   var printer = new pdfMakePrinter(fontDescriptors);

//   var doc = printer.createPdfKitDocument(pdfDoc);



// var docDefinition = {
// 	content: [
// 		'First paragraph',
// 		'Another paragraph, this time a little bit longer to make sure, this line will be divided into at least two lines'
// 	]
// };

// var now = new Date();
// var pdfDoc = printer.createPdfKitDocument(docDefinition);
// pdfDoc.pipe(fs.createWriteStream('absolute.pdf'));
// pdfDoc.end();
// console.log(new Date() - now);


// var fonts = {
// 	Roboto: {
// 		normal: 'fonts/Roboto-Regular.ttf',
// 		bold: 'fonts/Roboto-Medium.ttf',
// 		italics: 'fonts/Roboto-Italic.ttf',
// 		bolditalics: 'fonts/Roboto-MediumItalic.ttf'
// 	}
// };

// var PdfPrinter = require('pdfmake/src/printer');
// var printer = new PdfPrinter(fonts);
// var fs = require('fs');

// var docDefinition = {
// 	content: [
// 		'First paragraph',
// 		'Another paragraph, this time a little bit longer to make sure, this line will be divided into at least two lines'
// 	]
// };

// var pdfDoc = printer.createPdfKitDocument(docDefinition);
// pdfDoc.pipe(fs.createWriteStream('pdfs/basics.pdf'));
// pdfDoc.end();
  

    // // var pdfDoc = pdfmake.createPdfKitDocument(docDefinition);
    // pdfDoc.pipe(fs.createWriteStream('tables.pdf'));
    // pdfDoc.end();

// cloudinary.config({ 
//   cloud_name: process.env.CLOUD_NAME,
//   api_key: process.env.API_KEY,
//   api_secret: process.env.API_SECRET
// });


 
/* xlsx.js (C) 2013-present  SheetJS -- http://sheetjs.com */
// name the file _cors js


// var cors = function(req, res) { res.header('Access-Control-Allow-Origin', '*'); };
// cors.mw = function(req, res, next) { cors(req, res); next(); };
// module.exports = cors;


  // CLOUD_NAME = dcv191fk7 
  // API_KEY = 918296179275747 
  // API_SECRET = eN2PJpKj7OM3iuKElHF0mYYeITk

  // AIzaSyDisOMGFuPeebJLZXHPxwnhI3bSMr1sDWM