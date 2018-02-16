import React, { Component } from 'react';
import axios from "axios";
import API from "../../utils/API";
import Constributors from "../../components/Constributors/Constributors";
import helpers from "../../utils/helpers";
import Select from 'react-select';
var pdfMake = require('pdfmake/build/pdfmake.js')
var pdfFonts = require('pdfmake/build/vfs_fonts.js');
pdfMake.vfs = pdfFonts.pdfMake.vfs;

function Contact(label, value) {
  this.label = label;
  this.value = value;
}

// const STATES = require('../data/states');
class StatesField extends Component {
  state = {
    country: 'AU',
    disabled: false,
    searchable: this.props.searchable,
    selectValue: 'new-south-wales',
    clearable: true,
    rtl: false,
    savedDealers:[],
    dealersInfo:[],
  }

  componentDidMount(){
    this.getDealers()
  }
	
	clearValue (e) {
		this.select.setInputValue('');
  } 
  
	switchCountry (e) {
		var newCountry = e.target.value;
		this.setState({
			country: newCountry,
			selectValue: null,
		});
  }
  
	updateValue (newValue) {
		this.setState({
			selectValue: newValue,
		});
  }
  
	// focusStateSelect () {
	// 	this.refs.stateSelect.focus();
  // }
  
  
  getDealers(){
    helpers.getSavedDealers()
    .then((dealerData) => {
      console.log(dealerData);
      var newArray = []
      // console.log(dealerData.data[0].name);
      for (var i = 0; i < dealerData.data.length; i += 1) {
        var newObj = new Contact(dealerData.data[i].name, dealerData.data[i].email)
        newArray.push(newObj);
      }
      this.setState({ 
        savedDealers: newArray,
        dealersInfo:dealerData
      });
    })
    ;
  }


	render () {
    // console.log(this.state);
		var options = this.state.savedDealers;
		return (
			<div className="section">
				<h3 className="section-heading">Select Buyer</h3>
				<Select
					id="state-select"
					ref={(ref) => { this.select = ref; }}
					onBlurResetsInput={false}
					onSelectResetsInput={false}
					autoFocus
					options={options}
					simpleValue
					clearable={this.state.clearable}
					name="selected-state"
					disabled={this.state.disabled}
					value={this.state.selectValue}
					onChange={this.updateValue.bind(this)}
					rtl={this.state.rtl}
					searchable={this.state.searchable}
				/>
				{/* <button style={{ marginTop: '15px' }} type="button" onClick={this.focusStateSelect}>Focus Select</button> */}
				<button style={{ marginTop: '15px' }} type="button" className="btn btn-primary" onClick={this.clearValue}>Clear Value</button>
			</div>
		);
	}
};
































class PdfCreate extends Component {
  constructor(props, context) {
    super(props, context);
    this.state = {
      buyerName:'',
      buyerBusinessName:'',
      buyerAddress:'',
      buyerCity:'',
      buyerPhone:'',
      buyerZip: '',
      buyerState:'',
      buyingPrice:'',
      vehicleMiles:'',
      vehicleMake:'',
      vehicleModel:'',
      vehicleVin:'',
      vehicleColor:'',
      vehicleBodyType:'',
      vehicleYear:'',
      savedDealers:[],
    };
  }



  componentDidMount(){
    var theId = this.props.location.pathname.slice(5);
    API.getVehicle(theId)
    .then(res=>{
      var miles =res.data.miles.toString()
     
      this.setState({
      buyingPrice:res.data.price,
      vehicleMiles:miles,
      vehicleMake:res.data.make,
      vehicleModel:res.data.model,
      vehicleVin:res.data.vin,
      vehicleColor:res.data.color,
      vehicleBodyType:res.data.bodyCabType,
      vehicleYear:res.data.year
      })
      console.log(res);
    })
    .catch(err=>{
      console.log(err);
    })
  }



  // getDealers(){
  //   helpers.getSavedDealers()
  //   .then((dealerData) => {
  //     var newArray = []
  //     console.log(dealerData.data[0].name);
  //     for (var i = 0; i < dealerData.data.length; i += 1) {
  //       var newObj = new Contact(dealerData.data[i].name, dealerData.data[i].email)
  //       newArray.push(newObj);
  //     }
  //     this.setState({ savedDealers: newArray});
  //   })
  //   ;
  // }

// retrieves selected contacts from contributors component
handleRetrievedContacts(retrievedContacts) {
  var newStateArray = retrievedContacts.split(",")
  this.setState({selectedContacts: newStateArray })
}


  render() {
    var {buyerName, buyerBusinessName, buyerAddress, buyerCity, buyerPhone,
    buyerZip, buyerState, buyingPrice, vehicleMiles, vehicleMake,
    vehicleModel, vehicleVin, vehicleColor, vehicleBodyType,
    vehicleYear} = this.state;
//---------------------Start PDF Create--------------------------
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
  },{
    style: 'tableExample',
    table: {
      body: [
        
        [{text: 'SELLER', style: 'tableHeader', colSpan: 6, alignment: 'center'}, {}, {},{}, {}, {}],
        [
        
          [
            {border: [false, false, false,false],
              fillColor: '#ffffff',
              text: 'SELLER(Transferor)',
              style:'formData',
            },
            {
              table: {
                body: [
                  [{border: [false, false, false,false],
                    fillColor: '#ffffff',
                    text: 'CANAM AUTO',
                    // style:'formData',
                  }],
                ]
              },
            }
          ],
          [
            {border: [false, false, false,false],
              fillColor: '#ffffff',
              text: 'ADDRESS',
              style:'formData',
            },
            {
              table: {
                body: [
                  [{border: [false, false, false,false],
                    fillColor: '#ffffff',
                    text: '4266 Dove Rd. Suite C',
                    // style:'formData',
                  }],
                ]
              },
            }
          ],				[
            {border: [false, false, false,false],
              fillColor: '#ffffff',
              text: 'CITY',
              style:'formData',
            },
            {
              table: {
                body: [
                  [{border: [false, false, false,false],
                    fillColor: '#ffffff',
                    text: 'Port Hudson',
                    // style:'formData',
                  }],
                ]
              },
            }
          ],		[
            {border: [false, false, false,false],
              fillColor: '#ffffff',
              text: 'ZIP',
              style:'formData',
            },
            {
              table: {
                body: [
                  [{border: [false, false, false,false],
                    fillColor: '#ffffff',
                    text: '48060',
                    // style:'formData',
                  }],
                ]
              },
            }
          ],		[
            {border: [false, false, false,false],
              fillColor: '#ffffff',
              text: 'STATE',
              style:'formData',
            },
            {
              table: {
                body: [
                  [{border: [false, false, false,false],
                    fillColor: '#ffffff',
                    text: 'MI',
                    // style:'formData',
                  }],
                ]
              },
            }
          ],	[
            {border: [false, false, false,false],
              fillColor: '#ffffff',
              text: 'PHONE',
              style:'formData',
            },
            {
              table: {
                body: [
                  [{border: [false, false, false,false],
                    fillColor: '#ffffff',
                    text: '407-399-0044',
                    // style:'formData',
                  }],
                ]
              },
            }
          ]
        ]
      ]
    }
  },{
    style: 'tableExample',
    table: {
      body: [
        
        [{text: 'BUYER', style: 'tableHeader', colSpan: 6, alignment: 'center'}, {}, {},{}, {}, {}],
        [
        
          [
            {border: [false, false, false,false],
              fillColor: '#ffffff',
              text: 'BUYER(Transferee)',
              style:'formData',
            },
            {
              table: {
                body: [
                  [{border: [false, false, false,false],
                    fillColor: '#ffffff',
                    text: 'CANAM AUTO',
                    // style:'formData',
                  }],
                ]
              },
            }
          ],
          [
            {border: [false, false, false,false],
              fillColor: '#ffffff',
              text: 'ADDRESS',
              style:'formData',
            },
            {
              table: {
                body: [
                  [{border: [false, false, false,false],
                    fillColor: '#ffffff',
                    text: '4266 Dove Rd. Suite C',
                    // style:'formData',
                  }],
                ]
              },
            }
          ],				[
            {border: [false, false, false,false],
              fillColor: '#ffffff',
              text: 'CITY',
              style:'formData',
            },
            {
              table: {
                body: [
                  [{border: [false, false, false,false],
                    fillColor: '#ffffff',
                    text: 'Port Hudson',
                    // style:'formData',
                  }],
                ]
              },
            }
          ],		[
            {border: [false, false, false,false],
              fillColor: '#ffffff',
              text: 'ZIP',
              style:'formData',
            },
            {
              table: {
                body: [
                  [{border: [false, false, false,false],
                    fillColor: '#ffffff',
                    text: '48060',
                    // style:'formData',
                  }],
                ]
              },
            }
          ],		[
            {border: [false, false, false,false],
              fillColor: '#ffffff',
              text: 'STATE',
              style:'formData',
            },
            {
              table: {
                body: [
                  [{border: [false, false, false,false],
                    fillColor: '#ffffff',
                    text: 'MI',
                    // style:'formData',
                  }],
                ]
              },
            }
          ],	[
            {border: [false, false, false,false],
              fillColor: '#ffffff',
              text: 'PHONE',
              style:'formData',
            },
            {
              table: {
                body: [
                  [{border: [false, false, false,false],
                    fillColor: '#ffffff',
                    text: '407-399-0044',
                    // style:'formData',
                  }],
                ]
              },
            }
          ]
        ]
      ]
    }
  }, {
    style: 'tableExample',
    table: {
      body: [
        
        [{text: 'SOLD AS IS', style: 'header', colSpan: 3 , alignment: 'center'},{}, {}, { table: {
                  body: [
                    [{border: [false, false, false,false],
                      fillColor: '#ffffff',
                      text: `sale price:$ ${buyingPrice}`,
                      // style:'formData',
                    }],
                  ]
                },}],
      ]
    }
  },
  {
    text: 'ODOMETER DISCLOSURE STATEMENT',
    style: 'header2',
    alignment: 'center'
  },
  {
    text:'Federal and State law requires that you state the mileage in connection with the transfer of ownership. Failure to complete or providing a false statement may result in fines and/or imprisonment\n\n',
    style: 'subheader2'
  },{
    // style: 'tableExample',
    table: {
      widths: ['auto', 'auto','auto','auto','auto'],
      body: [
        [
          {
            border: [false, false, false,false],
            // fillColor: '#dddddd',
            text: 'I,'
          },{
            border: [false, false, false,true],
            // fillColor: '#dddddd',
            text: 'CANAM AUTO'
          },{
            border: [false, false, false,false],
            // fillColor: '#dddddd',
            text: 'state that the odometer now reads'
          },{
            border: [false, false, false,true],
            // fillColor: '#dddddd',
            text: `${vehicleMiles}`
          },{
            border: [false, false, false,false],
            // fillColor: '#dddddd',
            text: 'miles and to the best of my'
          }
        ],
        [
          {border: [false, false, false,false],
            fillColor: '#ffffff',
            text: '',
            style:'small',
          },	{border: [false, false, false,false],
            fillColor: '#ffffff',
            text: '',
            style:'small',
          },{border: [false, false, false,false],
            fillColor: '#ffffff',
            text: '',
            style:'small',
          },{border: [false, false, false,false],
            fillColor: '#ffffff',
            text: '',
            style:'small',
          },{border: [false, false, false,false],
            fillColor: '#ffffff',
            text: '',
            style:'small',
          }
        ]
      ]
    }
  },	 'knowledge that it reflects the actual mileage of the vehicle described below, unless one of the following statements is selected.\n\n', '[   ] (1) I hereby certify that to the best of my knowledge the odometer reading reflects the amount of mileage in excess of its mechanical limits.\n\n',	
  '[   ] (2) I hereby certify that the odometer reading is NOT the actual mileage WARNING: ODOMETER DISCREPANCY.\n\n', {
    text: 'MOTOR VEHICLE DESCRIPTON',
    style: 'subheadertitle',
    alignment: 'center'
  },
  {
			style: 'tableExample',
			table: {
				body: [
          
					[{text: 'Make', style: 'tableHeader', alignment: 'center'}, {text: 'Model', style: 'tableHeader', alignment: 'center'}, {text: 'Color', style: 'tableHeader', alignment: 'center'}, {text: 'Year', style: 'tableHeader', alignment: 'center'}, {text: 'Body Type', style: 'tableHeader', alignment: 'center'}, {text: 'Vehicle Identification Number', style: 'tableHeader', alignment: 'center'}],
					[`${vehicleMake}`, `${vehicleModel}`,`${vehicleColor}`, `${vehicleYear}`, `${vehicleBodyType}`,`${vehicleVin}`]
				]
			}
    },
    {
      style: 'tableExample',
      table: {
        body: [
          
          // [{text: 'SELLER', style: 'tableHeader', colSpan: 6, alignment: 'center'}, {}, {},{}, {}, {}],
          [
          
            [
              {border: [false, false, false,false],
                fillColor: '#ffffff',
                text: 'SELLER SIGNATURE (Transferor)',
                style:'formData',
              },
              {
                table: {
                  body: [
                    [{border: [false, false, false,false],
                      fillColor: '#ffffff',
                      text: '',
                      style:'formDataEntry',
                    }],
                  ]
                },
              }
            ],
            [
              {border: [false, false, false,false],
                fillColor: '#ffffff',
                text: 'PRINT SELLER NAME',
                style:'formData',
              },
              {
                table: {
                  body: [
                    [{border: [false, false, false,false],
                      fillColor: '#ffffff',
                      text: 'Dean Marco',
                      style:'formDataEntry',
                      // style:'formData',
                    }],
                  ]
                },
              }
            ],      [
              {border: [false, false, false,false],
                fillColor: '#ffffff',
                text: 'DATE',
                style:'formData',
              },
              {
                table: {
                  body: [
                    [{border: [false, false, false,false],
                      fillColor: '#ffffff',
                    
                      text: '01/08/2016',
                      // style:'formData',
                      style:'formDataEntry',
                    }],
                  ]
                },
              }
            ],	[
              {border: [false, false, false,false],
                fillColor: '#ffffff',
                text: 'ADDRESS',
                style:'formData',
              },
              {
                table: {
                  body: [
                    [{border: [false, false, false,false],
                      fillColor: '#ffffff',
                      text: '4266 Dove Rd. Suite C',
                      style:'formDataEntry',
                      // style:'formData',
                    }],
                  ]
                },
              }
            ]		,		[
              {border: [false, false, false,false],
                fillColor: '#ffffff',
                text: 'CITY',
                style:'formData',
              },
              {
                table: {
                  body: [
                    [{border: [false, false, false,false],
                      fillColor: '#ffffff',
                      text: 'Port Hudson',
                      style:'formDataEntry',
                      // style:'formData',
                    }],
                  ]
                },
              }
            ],		[
              {border: [false, false, false,false],
                fillColor: '#ffffff',
                text: 'ZIP',
                style:'formData',
                
              },
              {
                table: {
                  body: [
                    [{border: [false, false, false,false],
                      fillColor: '#ffffff',
                      text: '48060',
                      style:'formDataEntry',
                      // style:'formData',
                    }],
                  ]
                },
              }
            ],		[
              {border: [false, false, false,false],
                fillColor: '#ffffff',
                text: 'STATE',
                style:'formData',
              },
              {
                table: {
                  body: [
                    [{border: [false, false, false,false],
                      fillColor: '#ffffff',
                      text: 'MI',
                      style:'formDataEntry',
                      // style:'formData',
                    }],
                  ]
                },
              }
            ]
          ]
        ]
      }
    },	
    {
      style: 'tableExample',
      table: {
        body: [
          [
          
            [
              {border: [false, false, false,false],
                fillColor: '#ffffff',
                text: 'BUYER SIGNATURE (Transferor)',
                style:'formData',
              },
              {
                table: {
                  body: [
                    [{border: [false, false, false,false],
                      fillColor: '#ffffff',
                      text: '',
                    }],
                  ]
                },
              }
            ],
      	[
              {border: [false, false, false,false],
                fillColor: '#ffffff',
                text: 'ADDRESS',
                style:'formData',
              },
              {
                table: {
                  body: [
                    [{border: [false, false, false,false],
                      fillColor: '#ffffff',
                      text: '4266 Dove Rd. Suite C',
                      // style:'formData',
                    }],
                  ]
                },
              }
            ]		,		[
              {border: [false, false, false,false],
                fillColor: '#ffffff',
                text: 'CITY',
                style:'formData',
              },
              {
                table: {
                  body: [
                    [{border: [false, false, false,false],
                      fillColor: '#ffffff',
                      text: 'Port Hudson',
                      // style:'formData',
                    }],
                  ]
                },
              }
            ],		[
              {border: [false, false, false,false],
                fillColor: '#ffffff',
                text: 'ZIP',
                style:'formData',
              },
              {
                table: {
                  body: [
                    [{border: [false, false, false,false],
                      fillColor: '#ffffff',
                      text: '48060',
                      // style:'formData',
                    }],
                  ]
                },
              }
            ],		[
              {border: [false, false, false,false],
                fillColor: '#ffffff',
                text: 'STATE',
                style:'formData',
              },
              {
                table: {
                  body: [
                    [{border: [false, false, false,false],
                      fillColor: '#ffffff',
                      text: 'MI',
                      // style:'formData',
                    }],
                  ]
                },
              }
            ]
          ]
        ]
      }
    },
  {
    text: 'SELLER ASSUMES NO RESPONSIBILITY NOR GUARANTEES THAT ACCURACY OF THE ODOMETER READING. ALL VEHICLES SOLD ONLY TO DEALERS WITHOUT WARRANTY - SELLER AS SHOWN ACCEPTS NO RESPONSIBILITY FOR THEFT, LIABILITY OR PROPERTY DAMAGE.',
    style: ['quote', 'small']
  }
],
styles: { tableHeader: {
  fontSize: 12,
  bold: true
},
  header: {
    fontSize: 18,
    bold: true
  }, header2: {
    fontSize: 12,
    bold: true
  }, formData: {
    fontSize: 7,
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
  }, subheader2: {
    fontSize: 10,
    bold: true,
    alignment: 'justify'
  },
  quote: {
    italics: true
  },
  small: {
    fontSize: 10
  }	,tableExample: {
    margin: [0, 5, 0, 15]
  },tableUnderline: {
    margin: [0, 0, 0,0]
  },  formDataEntry:{
    margin: [0, 0, 0,0],
    padding: [0, 0, 0,0],
    fontSize: 10,
    alignment: 'justify'
  }
} }

//---------------------------------end PDF Create_---------------------



    function createPdf() {
      pdfMake.createPdf(docDefinition).open({}, window.open('/hello', '_blank'));
      // pdfMake.createPdf(docDefinition).download();
    }

   

    
    return (
      <div>
       <StatesField />
      <button type="button" onClick={()=>createPdf()}>Download</button>
      </div>
    );
  }
}

export default PdfCreate;

