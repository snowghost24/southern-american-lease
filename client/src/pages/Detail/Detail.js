import React, { Component } from "react";
import { Link } from "react-router-dom";
import { Col, Row, Container } from "../../components/Grid";
import Jumbotron from "../../components/Jumbotron";
import API from "../../utils/API";
import { Input, TextArea, FormBtn } from "../../components/Form";
import CurrencyInput from 'react-currency-input';

// import TextArea from "../../components/Form/TextArea";
import Select from 'react-select';

const MyApp = React.createClass({
  getInitialState(){
      return ({amount: "0.00"});
  },

  handleChange(event, maskedvalue, floatvalue){
      this.setState({amount: maskedvalue});
  },
  render() {
      return (
          <div>
              <CurrencyInput value={this.state.amount} onChangeEvent={this.handleChange}/>
          </div>
      );
  }
});



class Reservation extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      released: false,

      price: 2,
      textAreaValue:"",
      leatherColor: 'black',
      miles:"",
      location:"",
      liftstyle:"",
      trim:"",
      color:"",
      options:"",
      fueltype:"",
      keyfeatures:"",
      liftdetails:""
    };

    this.handleInputChange = this.handleInputChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
  
  }

 
  handleInputChange(event) {
    const target = event.target;
    const value = target.type === 'checkbox' ? target.checked : target.value;
    const name = target.name;

    this.setState({
      [name]: value
    });
  }

  handleSubmit(event) {
    alert('An essay was submitted: ' + this.state.value);
    event.preventDefault();
  }

  render() {
    console.log(this.state);
    return (
      <form onSubmit={this.handleSubmit}>
        {/* <label>
          Released Status:
          <input
            name="released"
            type="checkbox"
            checked={this.state.released}
            onChange={this.handleInputChange} />
        </label> */}
   

        <label>
          Released Status:
          <select type="string" name="released" value={this.state.released} onChange={this.handleInputChange}>
            <option value="pending_released">Pending Release</option>
            <option value="relased_pending_transfer">Released</option>
            <option value="black">Released Intransit</option>
            <option value="licore">Arrived</option>
          </select>
        </label>
        
       
        <label>
          Current Location:
          <select type="string" name="location" value={this.state.location} onChange={this.handleInputChange}>
            <option value="auction">Auction</option>
            <option value="watson">Watson</option>
            <option value="black">High Standards</option>
            <option value="licore">GO</option>
            <option value="southern Leather">Southern Leather</option>
            <option value="joes">Joes</option>
            <option value="body_shop">Body Shop</option>
            <option value="delivered">Delivered to buyer</option>
            <option value="delivered">Other</option>
          </select>
        </label>
        <br/>

        <hr/>
        <label>
          Doors:
          <select type="number" name="doors" value={this.state.value} onChange={this.handleInputChange}>
            <option value="4" >4</option>
            <option value="2">2</option>
            <option value="other">Other</option>
          </select>
        </label>

        <label>
          Fuel Type:
          <select type="string" name="fueltype" value={this.state.value} onChange={this.handleInputChange}>
            <option value="gas">Gas</option>
            <option value="diesel">Diesel</option>
            <option value="licore">Hybrid</option>
            <option value="electric">Electric</option>
          </select>
        </label>

        <br />
        <label>
         Color:
          <Input
            name="color"
            type="string"
            value={this.state.color}
            onChange={this.handleInputChange} />
        </label>

        <label>
        Trim:
        <Input 
          type="string"
          name="trim" 
          value={this.state.trim}
          onChange={this.handleInputChange} />
        </label>
     
        <label>
        Miles:
        <Input 
          type="number"
          name="miles" 
          value={this.state.miles}
          onChange={this.handleInputChange} />
      </label>
     
      
        <label>
        Asking Price:
          <Input
            name="price"
            type="number"
            value={this.state.price}
            onChange={this.handleInputChange} />
        </label>

        <br />
        <label>
        Body Type:
          <Input
            name="bodytype"
            type="string"
            value={this.state.bodytype}
            onChange={this.handleInputChange} />
        </label>

        <label>
        Drive Train:
          <Input
            name="drivetrain"
            type="string"
            value={this.state.bodytype}
            onChange={this.handleInputChange} />
        </label>

        <label>
        Key Features:
          <Input
            name="keyfeatures"
            type="string"
            value={this.state.keyfeatures}
            onChange={this.handleInputChange} />
        </label>

        <label>
        Lift Kit Details:
          <Input
            name="liftdetails"
            type="string"
            value={this.state.liftdetails}
            onChange={this.handleInputChange} />
        </label>
<hr/>
       
   
 
       
        <h3>Work Required</h3>
  
        <label>
          Install Leather:
          <select type="string" name="leatherColor" value={this.state.value} onChange={this.handleInputChange}>
            <option value="black">Black</option>
            <option value="black_stone_stone">Black/Stone/Stone</option>
            <option value="licore">Licore</option>
            <option value="barracuda">Barracuda</option>
            <option value="limited_kit">Limited</option>
            <option value="stone">Stone</option>
            <option value="sandstone">Sandstone</option>
            <option value="black_cardinal">black_cardinal</option>
            <option value="xtra_woodland">Xtra Woodland</option>
            <option value="lightgrey">Light Grey</option>
            <option value="puddy">Puddy</option>
            <option value="shale">shale</option>
            <option value="none">None</option>
          </select>
        </label>
      
        <label>
          Lift Kit Range:
          {/* <Input type="string" name="liftstyle" value={this.state.value} onChange={this.handleInputChange}/> */}
          <select type="string" name="liftstyle" value={this.state.value} onChange={this.handleInputChange}>
            <option value="7000_6500">7000 - 6500</option>
            <option value="6000_5500">6500 - 6000</option>
            <option value="6000_5500">6000 - 5500</option>
            <option value="5500_5000">5500 - 5000</option>
            <option value="5000_4500">5000 - 4500</option>
            <option value="4500_4000">4500 - 4000</option>
            <option value="4000_3500">4000 - 3500</option>
            <option value="3500_3000">3500 - 3000</option>
            <option value="none">None</option>
          </select>
        </label>
        <label>
          Detail:
          <select type="string" name="liftstyle" value={this.state.value} onChange={this.handleInputChange}>
            <option value="7000_6500">7000 - 6500</option>
            <option value="6000_5500">6500 - 6000</option>
            <option value="6000_5500">6000 - 5500</option>
            <option value="5500_5000">5500 - 5000</option>
            <option value="5000_4500">5000 - 4500</option>
            <option value="4500_4000">4500 - 4000</option>
            <option value="4000_3500">4000 - 3500</option>
            <option value="3500_3000">3500 - 3000</option>
            <option value="none">None</option>
          </select>
        </label>
        <br />
        <label>
          Vehicle Notes:
        <TextArea type="string" name="textAreaValue" value={this.state.textAreaValue} onChange={this.handleInputChange} />
        </label>
        {/* <Input type="submit" value="Submit" /> */}
      </form>
    );
  }
}

/////---------------------------------------------------------


class Detail extends Component {
  state = {
    book: {}
  };
  // When this component mounts, grab the book with the _id of this.props.match.params.id
  // e.g. localhost:3000/books/599dcb67f0f16317844583fc
  componentDidMount() {
    console.log("the props match",this.props.match.params.id);
    API.getBook(this.props.match.params.id)
      .then((res) => {
        console.log("returning res data",res.data);
        this.setState({ book: res.data })
      }
    )
      .catch(err => console.log(err));
  }

  render() {
    return (
      <Container fluid>
        <Row>
          <Col size="md-12">
            <Jumbotron>
              <h3>
                {this.state.book.make} {this.state.book.model}
              </h3>
              <article>
              <h3>Update Features</h3>
              <p>
                {this.state.book.vin}
              </p>
            </article>
            </Jumbotron>
       
          </Col>
        </Row>
        <Row>
          <Col size="md-10 md-offset-1">
          <h1>Update Vehicle Data</h1>
          <h3>Vehicle Info</h3>
          <Reservation />
          
            {/* <article>
              <h1>Features</h1>
              <p>
                {this.state.book.vin}
              </p>
            </article> */}
          </Col>
          <Col size="md-10 md-offset-1">
          <h1>Update Vehicle Data</h1>
          {/* <Reservation /> */}
          
            {/* <article>
              <h1>Features</h1>
              <p>
                {this.state.book.vin}
              </p>
            </article> */}
          </Col>
        </Row>
        <Row>
          <Col size="md-2">
            <Link to="/">← Back to Authors</Link>
          </Col>
        </Row>
      </Container>
    );
  }
}

export default Detail;
