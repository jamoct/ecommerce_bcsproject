import React, { Component } from 'react';
import NavBar from './NavBar';
import Axios from 'axios';
import {NavLink} from 'react-router-dom';
import StripeCheckout from 'react-stripe-checkout';

const STRIPE_PUBLISHABLE = 'pk_test_UP0UFXQbnPAN73PL6hdYzIIS00BIVPjpDV';
const PAYMENT_SERVER_URL = "http://localhost:3030/payment";

export default class Checkout extends Component {

	state = {
		message: '',
		cartSubtotal: localStorage.getItem('CartTotal'),
		shippingFee: localStorage.getItem('Shipping'),
		paymentTotal: localStorage.getItem('PaymentTotal'),
		itemsTotal: localStorage.getItem('ItemTotal'),
		paid: localStorage.getItem('Paid'),
		charge: false,
		orderId: localStorage.getItem('OrderId')
	}

	fromEuroToCent = amount => {
	 	return amount * 100;
	}

	onToken = async token => {
		try {
			await Axios.post(PAYMENT_SERVER_URL,
				{
					description: 'Sauce Stop',
					source: token.id,
					currency: 'EUR',
					amount: this.fromEuroToCent(this.state.paymentTotal)
				})
			//console.log(response);
			this.setState({charge: true, message: 'Payment successful.'});
			localStorage.setItem('Paid', true);
			await Axios.post(`http://localhost:3030/admin/orders/update`, {
				_id: localStorage.getItem('OrderId'),
				newcurrentStatus: 'New order - processing',
				newpaidStatus: 'true'
			})
			//console.log(resUpdate);
			this.updateStock();
			setTimeout(()=> {this.props.history.push('/review')}, 2000);
		}
		catch(e){
			this.setState({message: 'Something is not working, please try again.'});
			console.log(e);
		}
	}

	updateStock = async () => {
		try {
			await Axios.post(`http://localhost:3030/cart/update`, {
				userId: localStorage.getItem('id'),
				newpaidStatus: 'true'
			})
			//console.log(resCart);
			let {orderId} = this.state; 
			const resGetOrders = await Axios.get(`http://localhost:3030/admin/orders/id/${orderId}`);
			let orderedProducts = resGetOrders.data[0].products;
			for (var i=0; i<orderedProducts.length; i++) {
				const response = await Axios.get(`http://localhost:3030/products/${orderedProducts[i].productId}`);
				let newStock = response.data.quantity - orderedProducts[i].orderedquantity;
				await Axios.post(`http://localhost:3030/admin/products/update`, {
					_id: orderedProducts[i].productId,
					newQuantity: newStock
				})
			}
		}
		catch(e){
			this.setState({message: 'Something is not working, please try again.'});
			console.log(e);
		}
	}

	render () {
		return (
			<div>
				<NavBar />
				<div style={style.content}>
					<div id="grid-cartmenu">
						<div><NavLink exact to="/cart">1 | My Cart</NavLink></div>
						<div style={{backgroundColor: "#01768b"}}><NavLink to="/checkout" style={{color: "white"}}>2 | Checkout & Pay </NavLink></div>
						<div><NavLink to="/review" style={{color: 'black', margin: '30px'}}>3 | Order Summary </NavLink> </div>
					</div>
					<hr/>
					{(this.props.cartData.length === 0 || this.state.orderId === "") ?
						<div style={{textAlign: "center", margin: "30px"}}>
							<h4 style={{margin: "50px auto"}}>Oops, you haven't told us where to send your sauces!</h4>
							<NavLink to="/cart" style={{color: 'black', margin: '30px'}}>Go back to my cart</NavLink>
						</div>
						:
						<div id="cartview">
							<div>
								{this.props.cartProducts.map((obj, i) => {
									return (
										<div key={i}>
											<div style={style.images}>
												<img src={obj.photoURL} style={{width: "100%"}} alt=""/><br />
											</div><div style={style.info}>
											<h3 key={i}>{obj.name}</h3>
											SKU: {obj.SKU}<br />
											Price: {obj.price.toFixed(2)} €<br />
											Ordered Qty: {this.props.cartData[i].orderedquantity}<br />
											</div>
											<hr style={{maxWidth: "80%"}} />
										</div>
									)
								})}
							</div>
							<div>
								{this.props.cartData.length !== 0 ? 
									<div>
										<h2> Cart Summary </h2>
										<div style={style.totals}>
											<div>Subtotal: </div>
											<div>{this.state.cartSubtotal} € </div>
											<div>Shipping (Flat fee): </div>
											<div>{this.state.shippingFee} €</div>
										</div>
										<hr style={{width: "50vh"}}/>
										<div style={style.totals}>
											<div>Total (inc. VAT): </div>
											<div>{this.state.paymentTotal} € </div>
											<div>Total items: </div>
											<div>{this.state.itemsTotal} </div>
										</div>
										<br/>
										<div style={{display: "inline", verticalAlign: "top", padding: "50px"}}>
											<NavLink exact to="/cart" style={style.buttonClear}> Go back to cart </NavLink>
											<StripeCheckout
											stripeKey={STRIPE_PUBLISHABLE}
											token={this.onToken}
											description={"Sauce Stop"}
											amount={this.fromEuroToCent(this.state.paymentTotal)}
											currency="EUR"
											label="Pay now"
											style={{marginLeft: "20px"}}
											/>
										</div>
										<br/>
										{this.state.message}
									</div>
									: <div> </div>
								}
							</div>
						</div>
					}
				</div> 
			</div>
		);
	}
}

const style = {
  button: {
  	padding: "5px 10px"
  },
  content: {
	maxWidth: "1000px",
	margin: "40px auto"
  },
  images:  {
	display: "inline-block",
	width: "35%",
	verticalAlign: "top"
  },
  info: {
  	display: "inline-block",
  	width: "45%",
  	margin: "10px 15px"
  },
  totals: {
	display: "grid",
	gridTemplateColumns: "1fr 1fr"
	},
	buttonClear: {
	border: "2px solid #01768b",
	borderRadius: "3px",
	cursor: "pointer",
	padding: "5px",
	width: "13vh",
	fontFamily: "Roboto, sans-serif",
	backgroundColor: "white",
	textDecoration: "none",
	color: "black"
	}
};