'use strict';
const storage = require('@google-cloud/storage');
const fs = require('fs')


const gcs = storage({
  projectId: 'vin-photos"',
  keyFilename: "/Users/Snowghost/Documents/southern_lease3/vinkey.json"
});

const bucketName = 'bucket-name-for-upload'
const bucket = gcs.bucket(bucketName);

function getPublicUrl(filename) {
  return 'https://storage.googleapis.com/' + bucketName + '/' + filename;
}

let ImgUpload = {};

ImgUpload.uploadToGcs = (req, res, next) => {
  console.log("im in Img upload");
  if(!req.file) return next();

  // Can optionally add a path to the gcsname below by concatenating it before the filename
  const gcsname = req.file.originalname;
  const file = bucket.file(gcsname);
  const stream = file.createWriteStream();
  // const stream = file.createWriteStream({
  //   metadata: {
  //     contentType: req.file.mimetype
  //   }
  // });

  console.log(stream);

  // stream.on('error', (err) => {
  //   req.file.cloudStorageError = err;
  //   next(err);
  // });

  // stream.on('finish', () => {
  //   req.file.cloudStorageObject = gcsname;
  //   req.file.cloudStoragePublicUrl = getPublicUrl(gcsname);
  //   next();
  // });

  // stream.end(req.file.buffer);
}

module.exports = ImgUpload;