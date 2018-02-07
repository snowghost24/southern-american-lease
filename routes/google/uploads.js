const router = require("express").Router();
const  AutoEntry = require("../../models/autos/auto");
const format = require('util').format;
const Multer = require('multer');
const helmet = require('helmet');

const Storage = require('@google-cloud/storage');
const projectId = "vin-photos";
  // Creates a client
  const storage = new Storage({
    keyFilename:"/Users/Snowghost/Documents/southern_lease3/vinkey.json",
    
  });

const multer = Multer({
  storage: Multer.memoryStorage(),
  limits: {
    fileSize: 5 * 1024 * 1024 // no larger than 5mb, you can change as needed.
  }
});

var bucketname = 'canam-photos';
const bucket = storage.bucket(bucketname);


router.route("/").post(multer.single('file'), (req, res, next) => {
  if (!req.file) {
    res.status(400).send('No file uploaded.');
    return;
  }
  console.log("the perams is", req.body.myParameter);
  var nameExtension = Math.floor(Math.random()*100000)
  req.file.originalname = req.body.myParameter+'_'+nameExtension;
  console.log(req.file.originalname);
// console.log(req.file);
  // Create a new blob in the bucket and upload the file data.
  const blob = bucket.file(req.file.originalname);
  const blobStream = blob.createWriteStream({
    metadata: {
      contentType: req.file.mimetype
    }
  });

  blobStream.on('error', (err) => {
    next(err);
  });

  blobStream.on("finish", () => {
    const publicUrl = `https://storage.googleapis.com/${bucketname}/${blob.name}`;
          blob.makePublic().then(() => {
     res.status(200).send(`Success!\n Image uploaded to ${publicUrl}`);
    });
  });

  blobStream.end(req.file.buffer);
});


// makePublic(bucketname,req.file.originalname)
// function makePublic(bucketname, filename) {

//   // Makes the file public
//   storage
//     .bucket(bucketname)
//     .file(filename)
//     .makePublic()
//     .then(() => {
//       console.log(`gs://${bucketname}/${filename} is now public.`);
//     })
//     .catch(err => {
//       console.error('ERROR:', err);
//     });
//   // [END storage_make_public]
// }















module.exports = router;
