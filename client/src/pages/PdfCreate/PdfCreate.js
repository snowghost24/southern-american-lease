import React, { Component } from 'react';
var jsPDF = require('jspdf');
require('jspdf-autotable');

var columns = [
	{ title: "A", dataKey: "A" },
	{ title: "B", dataKey: "B" },
	{ title: "C", dataKey: "C" }
];

var rows = [
	{ A: "Jose", B: "Guzman", C: "Cooks" },
  { A: "Master", B: "Dave", C: "Patson" },
  { A: "Farnt", B: "Mason", C: "Fray" }
];

class PdfCreate extends Component {


  

  render() {
    console.log(jsPDF);
    function createPdf() {
console.log("I was hit");
      // var doc = new jsPDF('p', 'pt');
      var doc = new jsPDF('landscape');
      doc.setFontSize(20);
      doc.setTextColor(40);
      doc.setFontStyle('normal');
      doc.text("YOLO", 10, 20);
      doc.text("YOLO2", 10, 50);
      
      doc.autoTable(columns, rows, {
        startY: doc.autoTableEndPosY() + 70,
        margin: { horizontal: 10 },
        styles: { overflow: 'linebreak' },
        bodyStyles: { valign: 'top' },
        columnStyles: { email: { columnWidth: 'wrap' } },
        theme: "striped"
      });
    
      doc.autoTable(columns, rows, {
        startY: doc.autoTableEndPosY() + 70,
        margin: { horizontal: 10 },
        styles: { overflow: 'linebreak' },
        bodyStyles: { valign: 'top' },
        columnStyles: { email: { columnWidth: 'wrap' } },
        theme: "striped"
      });
      // doc.save('repro.pdf');
      // doc.autoPrint()
      doc.output('datauri');
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