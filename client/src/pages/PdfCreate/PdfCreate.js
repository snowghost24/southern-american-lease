import React, { Component } from 'react';
import axios from "axios";

// var jsPDF = require('jspdf');
// require('jspdf-autotable');
var pdfMake = require('pdfmake/build/pdfmake.js')
var pdfFonts = require('pdfmake/build/vfs_fonts.js');
pdfMake.vfs = pdfFonts.pdfMake.vfs;


var docDefinition = {	content: [
  {
    text: 'Wholesale Order',
    style: 'header',
    alignment: 'center'
  },
  {
    text: 'REGISTRATION AND TITLE WARRANTY',
    style: 'subheadertitle',
    alignment: 'center'
  },
  {
    text: 'THE SELLERS COVENANTS WITH THE PURCHASERS, THAT HE IS THE TRUE AND LAWFUL OWNER OF SAID DESCRIBED AUTOMOBILE BELOW. THAT THE SAME IS FREE FROM ALL ENCUMBRANCES, THAT HE HAS GOOD RIGHT AND FULL POWER TO SELL THE SAME AS AFORESAID AND THAT HE WILL WARRANT AND DEFEND THE SAME AGAINST THE LAWFUL CLAIM AND DEMAND OF ALL PERSONS.\n\n',
    style: 'subheader'
  },
  {
    text: 'MOTOR VEHICLE DESCRIPTON',
    style: 'subheadertitle',
    alignment: 'center'
  },
  {
			style: 'tableExample',
			table: {
				body: [
          
					[{text: 'MAKE', style: 'tableHeader', alignment: 'center'}, {text: 'MODEL', style: 'tableHeader', alignment: 'center'}, {text: 'YEAR', style: 'tableHeader', alignment: 'center'}, {text: 'BODY TYPE', style: 'tableHeader', alignment: 'center'}, {text: 'VEHICLE IDENTIFICATION NUMBER', style: 'tableHeader', alignment: 'center'}],
					['CHEVROLET', 'SILVERADO', '2009', '2500 PICK UP','1FTFW1EG7HFB55545']
				]
			}
		},
  'Lorem ipsum dolor sit amet, consectetur adipisicing elit. Confectum ponit legam, perferendis nomine miserum, animi. Moveat nesciunt triari naturam posset, eveniunt specie deorsus efficiat sermone instituendarum fuisse veniat, eademque mutat debeo. Delectet plerique protervi diogenem dixerit logikh levius probabo adipiscuntur afficitur, factis magistra inprobitatem aliquo andriam obiecta, religionis, imitarentur studiis quam, clamat intereant vulgo admonitionem operis iudex stabilitas vacillare scriptum nixam, reperiri inveniri maestitiam istius eaque dissentias idcirco gravis, refert suscipiet recte sapiens oportet ipsam terentianus, perpauca sedatio aliena video.',
  'Lorem ipsum dolor sit amet, consectetur adipisicing elit. Confectum ponit legam, perferendis nomine miserum, animi. Moveat nesciunt triari naturam posset, eveniunt specie deorsus efficiat sermone instituendarum fuisse veniat, eademque mutat debeo. Delectet plerique protervi diogenem dixerit logikh levius probabo adipiscuntur afficitur, factis magistra inprobitatem aliquo andriam obiecta, religionis, imitarentur studiis quam, clamat intereant vulgo admonitionem operis iudex stabilitas vacillare scriptum nixam, reperiri inveniri maestitiam istius eaque dissentias idcirco gravis, refert suscipiet recte sapiens oportet ipsam terentianus, perpauca sedatio aliena video.\n\n',
  {
    text: 'SELLER ASSUMES NO RESPONSIBILITY NOR GUARANTEES THAT ACCURACY OF THE ODOMETER READING. ALL VEHICLES SOLD ONLY TO DEALERS WITHOUT WARRANTY - SELLER AS SHOWN ACCEPTS NO RESPONSIBILITY FOR THEFT, LIABILITY OR PROPERTY DAMAGE.',
    style: ['quote', 'small']
  }
],
styles: {
  header: {
    fontSize: 18,
    bold: true
  }, subheadertitle: {
    fontSize: 10,
    bold: true,
    alignment: 'justify'
  },
  subheader: {
    fontSize: 8,
    bold: true,
    alignment: 'justify'
  },
  quote: {
    italics: true
  },
  small: {
    fontSize: 8
  }
} };

var data ={what:"hello"}



class PdfCreate extends Component {



  componentDidMount(){
    console.log(this.props.location.pathname.slice(5));
  }

  render() {
    // console.log(jsPDF);
    function createPdf() {

      // window.open('', '_blank');
      // var win = window.open('', '_blank');
      pdfMake.createPdf(docDefinition).open({}, window.open('/hello', '_blank'));
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