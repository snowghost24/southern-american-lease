import React, { Component } from 'react';
import { Document, Page } from 'react-pdf';
var pdfMake = require('pdfmake/build/pdfmake.js')
var pdfFonts = require('pdfmake/build/vfs_fonts.js');
pdfMake.vfs = pdfFonts.pdfMake.vfs; 

//Use this if ou want to cr
var docDefinition = { content: 'This is an sample PDF printed with pdfMake' };

class JsPDF extends Component {
  state = {
    numPages: null,
    pageNumber: 1,
    data1:"",
  }

  componentDidMount(){
    //  var win = window.open('', '_blank')
     pdfMake.createPdf(docDefinition).open({}, window)

// const pdfDocGenerator = pdfMake.createPdf(docDefinition);
// pdfDocGenerator.getBlob((blob) => {
//   // this.setState({data1:blob})
//   var fileURL = URL.createObjectURL(blob);
//   window.open(fileURL,'_blank')
// });
  
     
    // 
    // pdfMake.createPdf(docDefinition).open({}, window.open('', '_blank'));
//     const pdfDocGenerator = pdfMake.createPdf(docDefinition);
// pdfDocGenerator.getDataUrl((dataUrl) => {
// 	this.setState({data1:dataUrl})
// });
// //------------------------------
//     const pdfDocGenerator = pdfMake.createPdf(docDefinition);
// pdfDocGenerator.getBlob((blob) => {
//   this.setState({data1:blob})
// 	console.log(blob);
// });
//-------------------------
//     pdfMake.createPdf(docDefinition).open();
//     const pdfDocGenerator = pdfMake.createPdf(docDefinition);
//     pdfDocGenerator.getBase64((data) => {
//       console.log(data);
// this.setState({data1:data})   
//  });
  }
 
  onDocumentLoad = ({ numPages }) => {
    console.log("im hit");
    this.setState({ numPages });

  }
 

  openPDF(){
pdfMake.createPdf(docDefinition).open({}, window)
return false;
  }
  render() {
 
    const { pageNumber, numPages } = this.state;
 
    return (
      <div>
        <Document
        
          file={this.state.data1}
          onLoadSuccess={this.onDocumentLoad}
        >
         <div>
         <a href={this.state.data1} target='_blank'>Click to open in tab</a>
      </div> 
          <Page pageNumber={pageNumber} />
        </Document>
        <p>Page {pageNumber} of {numPages}</p>
        <button onClick={this.openPDF}></button>
      </div>
    );
  }
}

export default JsPDF;