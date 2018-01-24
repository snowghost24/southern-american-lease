import React, { Component } from 'react';
import axios from "axios";

// var jsPDF = require('jspdf');
// require('jspdf-autotable');
var pdfMake = require('pdfmake/build/pdfmake.js')
var pdfFonts = require('pdfmake/build/vfs_fonts.js');
pdfMake.vfs = pdfFonts.pdfMake.vfs;


// var columns = [
// 	{ title: "A", dataKey: "A" },
// 	{ title: "B", dataKey: "B" },
// 	{ title: "C", dataKey: "C" }
// ];

// var rows = [
// 	{ A: "Jose", B: "Guzman", C: "Cooks" },
//   { A: "Master", B: "Dave", C: "Patson" },
//   { A: "Farnt", B: "Mason", C: "Fray" }
// ];
var docDefinition = { content: 'This is an sample PDF printed with pdfMake' };

var data ={what:"hello"}
class PdfCreate extends Component {

  

  render() {
    // console.log(jsPDF);
    function createPdf() {

      window.open('', '_blank');
      // var win = window.open('', '_blank');
      // pdfMake.createPdf(docDefinition).open({}, window.open('/hello', '_blank'));
      // var win = window.open('', '_blank');
      // axios.post('/JsPDF', data).then(function(response) {
      //   // pass the "win" argument
      //   pdfMake.createPdf(docDefinition).open({}, win);
      // });
//-------------------------------
      // pdfMake.createPdf(docDefinition).download();
      // pdfMake.createPdf(docDefinition).open();
      // pdfMake.createPdf(docDefinition).print();

      // var PDFdata;
      // pdfMake.createPdf(docDefinition).getDataUrl(function(dataURL) {
      // PDFdata = dataURL;
      // console.log(PDFdata);
      // });
      //-----------------
//       const pdfDocGenerator = pdfMake.createPdf(docDefinition);
//       pdfDocGenerator.getBase64((data) => {
//         console.log(data);
//       });
// console.log("I was hit");
//__---------------------------
      // var doc = new jsPDF('p', 'pt');
      // var doc = new jsPDF('p','pt','landscape');
      // doc.setFontSize(20);
      // doc.setTextColor(40);
      // doc.setFontStyle('normal');
      // doc.text("YOLO", 10, 20);
      // doc.text("YOLO2", 10, 50);
      
      // doc.autoTable(columns, rows, {
      //   startY: doc.autoTableEndPosY() + 70,
      //   margin: { horizontal: 10 },
      //   styles: { overflow: 'linebreak' },
      //   bodyStyles: { valign: 'top' },
      //   columnStyles: { email: { columnWidth: 'wrap' } },
      //   theme: "striped"
      // });
    
      // doc.autoTable(columns, rows, {
      //   startY: doc.autoTableEndPosY() + 70,
      //   margin: { horizontal: 10 },
      //   styles: { overflow: 'linebreak' },
      //   bodyStyles: { valign: 'top' },
      //   columnStyles: { email: { columnWidth: 'wrap' } },
      //   theme: "striped"
      // });
      // // doc.save('repro.pdf');
      // // doc.autoPrint()
      // var stored = doc.output('data');
    }
    
    return (
      <div>
      <button type="button" onClick={()=>createPdf()}>Download</button>
      </div>
    );
  }
}

export default PdfCreate;

// ReactDOM.render(
//   React.createElement('button', {onClick: createPdf}, "Create PDF"),
//   document.getElementById('container')
// );