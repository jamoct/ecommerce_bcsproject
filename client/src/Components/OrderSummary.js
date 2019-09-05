import React, { Component } from 'react';
import Axios from 'axios';
import {NavLink} from 'react-router-dom';
import NavBar from './NavBar';

export default class OrderSummary extends Component {

	state = {
		userId: '',
		orderId: localStorage.getItem('OrderId'),
		itemTotal: localStorage.getItem('ItemTotal'),
		paid: localStorage.getItem('Paid'),
		name: localStorage.getItem('email')
	}

	componentDidMount () {
		this.findOrder(this.state.orderId);
	}

	findOrder = async orderid => {
		try {
			let {name, orderId} = this.state;
			const res = await Axios.get(`http://localhost:3030/admin/orders/id/${orderid}`);
			//console.log(res);
			if (res.data[0].length !== 0 && res.data[0].paidStatus === "true") {
				// email will be sent to joyce@barcelonacodeschool.com
				const response = await Axios.post(`http://localhost:3030/sendemail`, {
					name: name,
					subject: "Your Sauce Stop Order #" + orderId,
					header: "Thanks for shopping with us!",
					message: "Your order number is: " + orderId + ". Your order will be delivered in 3-5 working days. If you have any questions or would like to follow up on your order, get in touch with us at joyce@barcelonacodeschool.com."
				})
				console.log(response);
				localStorage.setItem('CartTotal', 0);
	      		localStorage.setItem('ItemTotal', 0);
	      		localStorage.setItem('Paid', 'false');
	      		localStorage.setItem('PaymentTotal', 0);
	      		localStorage.setItem('Shipping', 0);
	      		localStorage.setItem('OrderId', '');
			} else {
				this.setState({message: 'Something missing? Please checkout & pay.'});
			}
		}
		catch(e){
			console.log(e);
			this.setState({message: 'Something missing? Please checkout & pay.'});
		}
	}

	handleClear = async e => {
		let {userId} = this.state;
		try {
			if (this.state.itemTotal >= 1) {
				this.props.history.push('/admin/dashboard');
			} 
			if (this.state.itemTotal === 0 || this.state.paid === "true") {
				await Axios.post(`http://localhost:3030/cart/clear`, {
					userId: userId
				})
				//console.log(res);
				this.props.history.push('/admin/dashboard');
				localStorage.setItem('CartTotal', 0);
	      		localStorage.setItem('ItemTotal', 0);
	      		localStorage.setItem('Paid', 'false');
	      		localStorage.setItem('PaymentTotal', 0);
	      		localStorage.setItem('Shipping', 0);
	      		localStorage.setItem('OrderId', '');
			}
		}
		catch(e){
			this.setState({message: 'Something missing? No products in cart yet.'});
		}
	}

	render () {
		return (
			<div>
				<NavBar />
				<div style={style.content}>
					<div id="grid-cartmenu">
						<div>1 | My Cart</div>
						<div>2 | Checkout & Pay </div>
						<div style={{backgroundColor: "#01768b"}}><NavLink to="/review" style={{color: "white"}}>3 | Order Summary </NavLink> </div>
					</div>
					<hr/>
					{(this.state.orderId !== '' && this.state.itemTotal !== 0 && this.state.paid === "true") ? 
						<div>
							<div style={{textAlign: "center", margin: "30px"}}>
								Thanks for shopping with us! <br /> <br />
								Your order number is: <br /> 
								{this.state.orderId}
							</div>
							<div style={{textAlign: "center", margin: "30px"}}>
								An email confirmation will be sent to your email address shortly.
							</div>
							<div>
								<h3 style={{textDecoration: "underline", cursor: "pointer", textAlign: "center"}} onClick={this.handleClear}>Shop again?</h3>
							</div>
						</div> :
						<div style={{textAlign: "center", margin: "30px"}}>
							<NavLink to="/checkout" style={{color: 'black', margin: '30px'}}>Something missing? Please checkout & pay.</NavLink>
							<h3 style={{textDecoration: "underline", cursor: "pointer", textAlign: "center"}}>
								<NavLink to="/admin/dashboard">or continue shopping?</NavLink></h3>
						</div>
					}
				</div>
			</div>
		);
	}
}

const style = {
  content: {
	maxWidth: "1000px",
	margin: "40px auto"
  }
};