// import React from 'react';
import React, { Component } from 'react'
import Select from 'react-select';
import "./Constributors.css";

class Constributors extends Component {
// var Constributors = createClass({
		state = {
			removeSelected: true,
			disabled: false,
			crazy: false,
			stayOpen: false,
			value: [],
			// rtl: false,
		};

	handleSelectChange (value) {
		console.log('You\'ve selected:', value);
    this.setState({ value:value }, this.sendValuesUp);
	}
	toggleCheckbox (e) {
		this.setState({
			[e.target.name]: e.target.checked,
		});
	}

  sendValuesUp(){
    var theContactsArray = this.state.value
    this.props.handleRetrievedContacts(theContactsArray);
    }

	render () {
  
    const WHY_WOULD_YOU = [
      { label: 'Chocolate (are you crazy?)', value: 'chocolate', disabled: true },
    ].concat(this.props.FLAVOURS.slice(1));

		const { crazy, disabled, stayOpen, value } = this.state;
		const options = crazy ? WHY_WOULD_YOU : this.props.FLAVOURS;
		return (
			<div className="section">
				<Select
					closeOnSelect={!stayOpen}
					disabled={disabled}
					multi
					onChange={this.handleSelectChange.bind(this)}
					options={options}
					placeholder="Select your recipient(s)"
          removeSelected={this.state.removeSelected}
					// rtl={this.state.rtl}
					simpleValue
					value={value}
				/>
			</div>
		);
	}
};

export default Constributors;