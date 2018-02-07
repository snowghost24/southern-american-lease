import React, { Component } from "react";
import ReactDOM from 'react-dom';
import DropzoneComponent from 'react-dropzone-component';
import swal from 'sweetalert'
export default class DefaultUpload extends React.Component {
    constructor(props) {
        super(props);
     this.state = {theVin:this.props.theVehicleId};
        this.componentConfig = {
            iconFiletypes: ['.jpg', '.png', '.gif'],
            showFiletypeIcon: true,
            postUrl: '/google/uploads'
        };

        // If you want to attach multiple callbacks, simply
        // create an array filled with all your callbacks.
        this.callbackArray = [() => console.log('Hi!'), () => console.log('Ho!')];

        // Simple callbacks work too, of course
        this.callback = () => console.log('Hello!');

        this.success = file => console.log('uploaded', swal({
          title: "Upload Completed",
          text: "Close and click remove file",
          icon: "success",
          button: "close!",
        }));

        this.progress = file => console.log('progress', file);

        this.removedfile = file => console.log('removing...', file);

        this.dropzone = null;
    }

    render() {
       
      var { theVehicleId} = this.props;
              const config = this.componentConfig;
        const djsConfig = {
          addRemoveLinks: true,
          acceptedFiles: "image/jpeg,image/png,image/gif",
          params: {
            myParameter: theVehicleId
        }
      }
        // For a list of all possible events (there are many), see README.md!
        const eventHandlers = {
            init: dz => this.dropzone = dz,
            drop: this.callbackArray,
            addedfile: this.callback,
            success: this.success,
            removedfile: this.removedfile,
            uploadprogress: this.progress
        }

        return <DropzoneComponent config={config} eventHandlers={eventHandlers} djsConfig={djsConfig} />
    }
}

//  export default DefaultUpload;
module.export = DefaultUpload;