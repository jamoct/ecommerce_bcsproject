import React, { Component } from 'react';
import '../App.css';
import Axios from 'axios';
import {withRouter} from 'react-router-dom';

class ShippingAddress extends Component {

	state = {
		firstName: '',
		lastName: '',
		addressline1: '',
		addressline2: '',
		city: '',
		country: '',
		state: '',
		postal_code: '',
		contactNumber: '',
		notes: '',
		message: '',
		userId: localStorage.getItem('id'),
		orderId: localStorage.getItem('OrderId')
	}

	handleChange = e => {
		this.setState({[e.target.name]: e.target.value});
	}

	handleSubmit = async e => {
		let {firstName, lastName, addressline1, addressline2, city, country, state, postal_code, contactNumber, notes} = this.state;
		e.preventDefault();
		try {
			const res = await Axios.post(`/admin/orders/add`, {
				userId: localStorage.getItem('id'),
				products: this.props.cartData,
				itemTotal: this.props.itemsTotal,
				shippingFee: this.props.shippingFee,
				subtotal: this.props.cartSubtotal,
				paymentTotal: this.props.paymentTotal,
				shippedStatus: 'Not yet shipped',
				shippingNumber: 'Not yet shipped',
				currentStatus: 'Temp Cart',
				paidStatus: 'false',
				orderId: 'admin-order',
				firstName: firstName,
				lastName: lastName,
				addressline1: addressline1,
				addressline2: addressline2,
				city: city,
				country: country,
				state: state,
				postal_code: postal_code,
				contactNumber: contactNumber,
				notes: notes
			})
			console.log(res);
			this.setState({message: res.data.message});
			localStorage.setItem('OrderId', res.data.createOrder._id);
			this.props.history.push('/checkout');
		}
		catch(e){
			console.log(e);
		}
	}

	render () {
		return (
			<div>
				<h3 style={{margin: "20px auto"}}>Enter your shipping address below:</h3>
				<form onSubmit={this.handleSubmit} style={{margin: "20px 0 20px", display: "grid", gridTemplateColumns: "1fr 1fr", gridGap: "1em"}}>
					<input
						placeholder="First Name*"
						name="firstName"
						value={this.state.firstName}
						onChange={this.handleChange}
					/>
					<input
						placeholder="Last Name*"
						name="lastName"
						value={this.state.lastName}
						onChange={this.handleChange}
					/>
					<input
						placeholder="addressline1*"
						name="addressline1"
						value={this.state.addressline1}
						onChange={this.handleChange}
					/>
					<input
						placeholder="addressline2"
						name="addressline2"
						value={this.state.addressline2}
						onChange={this.handleChange}
					/>
					<input
						placeholder="city*"
						name="city"
						value={this.state.city}
						onChange={this.handleChange}
					/>
					<input
						placeholder="country*"
						name="country"
						value={this.state.country}
						onChange={this.handleChange}
					/>
					<input
						placeholder="state*"
						name="state"
						value={this.state.state}
						onChange={this.handleChange}
					/>
					<input
						placeholder="postal_code*"
						name="postal_code"
						value={this.state.postal_code}
						onChange={this.handleChange}
					/>
					<input
						placeholder="contactNumber*"
						name="contactNumber"
						value={this.state.contactNumber}
						onChange={this.handleChange}
					/>
					<input
						placeholder="notes"
						name="notes"
						value={this.state.notes}
						onChange={this.handleChange}
					/>
					<div>
						<p>{this.state.message}</p>
						<button className="button">Save & Checkout</button>
					</div>
				</form>
			</div>
		);
	}
}

export default withRouter(ShippingAddress);