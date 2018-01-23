import React, { Component } from "react";
// import { Link } from "react-router-dom";
// import { Col, Row, Container } from "../../components/Grid";
import API from "../../utils/API";
// import helpers from "../../utils/helpers";
// import { Input, TextArea } from "../../components/Form";

import Dropzone from "react-dropzone";
// import cloudinary from 'cloudinary-core';
// import axios from 'axios'
import request from 'superagent';
// import FileUploader from "../../components/FileUploader/FileUploader";
const CLOUDINARY_UPLOAD_PRESET = 'cq14akzn';
const CLOUDINARY_UPLOAD_URL = 'https://api.cloudinary.com/v1_1/dcv191fk7/upload';



class FileUploader extends React.Component {
   constructor(props) {
     super(props);
     this.state = {
       uploadedFileCloudinaryUrl: ''
     };
   }
     
  onImageDrop(files) {
    this.setState({
      uploadedFile: files[0]
    });
    this.handleImageUpload(files[0]);
  }
  
  handleImageUpload(file) {
    let upload = request.post(CLOUDINARY_UPLOAD_URL)
      .field('upload_preset', CLOUDINARY_UPLOAD_PRESET)
      .field('file', file)
      .field('tags', "VIN")
      .field('created_at', (Date.now() / 1000) | 0)
      .field('width', '0.5')
      .field('crop', "scale")
      .field('public_id', this.props.sentDownStates.vehicle.vin)
    upload.end((err, response) => {
      if (err) {
        console.error(err);
      }
      if (response.body.secure_url !== '') {
        var theVin = this.props.sentDownStates.vehicle.vin;
        var theUrl = response.body.secure_url;
        // save img url in db
        API.saveVinUrl(theVin, theUrl)
          .then((res) => {
              this.setState({
                uploadedFileCloudinaryUrl: res.data.vinImage
              })
          }).catch(err => console.log(err));
      }
    });
  }


 render() {
   return(
   <div>
   <div className="FileUpload">
   <Dropzone
 
     multiple={false}
     accept="image/*"
     onDrop={this.onImageDrop.bind(this)}>
     <p>Drop an image or click to select a file to upload.</p>
   </Dropzone>
   </div>

   <div>
     {this.state.uploadedFileCloudinaryUrl === '' ? null :
     <div>
       {this.props.loadVehicle()}
       {/* <p>{this.state.uploadedFile.name}</p> */}
       {/* <img alt="vin number" src={this.state.uploadedFileCloudinaryUrl} /> */}
     </div>}
   </div>
 </div>
   )
 }}

 export default FileUploader;