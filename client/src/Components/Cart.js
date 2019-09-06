import React, { Component } from 'react';
import Axios from 'axios';
import {withRouter, NavLink} from 'react-router-dom';
import NavBar from './NavBar';
import '../App.css';
import QuantityChange from './QuantityChange';
import ShippingAddress from './ShippingAddress';
import RemoveFromCart from './RemoveFromCart';

class Cart extends Component {

	state = {
		cart: [],
		userId: '',
		message: '',
		itemsTotal: 0,
		cartSubTotal: 0,
		shipping: 0,
		totalCost: 0
	}

	componentDidMount () {
		let userId = localStorage.getItem('id');
		this.setState({userId: userId});
		this.props.getCartData();
		this.props.getCartProducts();
	}

	backShopping = e => {
		this.props.history.push('/admin/dashboard');
	}

	handleClear = async e => {
		let {userId} = this.state;
		try {
			const res = await Axios.post(`/cart/clear`, {
				userId: userId
			})
			console.log(res);
			localStorage.setItem('CartTotal', 0);
      		localStorage.setItem('ItemTotal', 0);
      		localStorage.setItem('Paid', 'false');
      		localStorage.setItem('PaymentTotal', 0);
      		localStorage.setItem('Shipping', 0);
      		localStorage.removeItem('cart');
      		this.props.getCartProducts();
		}
		catch(e){
			this.setState({message: 'Something missing? No products in cart yet.'});
		}
	}

	render () {

		let subtotal = 0, itemtotal = 0, paymenttotal = 0, shipping = 0;
		this.props.cartData.forEach((obj) => {
			subtotal += obj.cost;
			itemtotal += obj.orderedquantity;
		})
		localStorage.setItem('ItemTotal', itemtotal);
		subtotal <= 50 ? shipping = 5 : shipping = 0;
		paymenttotal += subtotal + shipping;
		subtotal = subtotal.toFixed(2);
		paymenttotal = paymenttotal.toFixed(2);
		shipping = shipping.toFixed(2);
		localStorage.setItem('CartTotal', subtotal);
      	localStorage.setItem('PaymentTotal', paymenttotal);
      	localStorage.setItem('Shipping', shipping);

		return (
			<div>
				<NavBar />
				<div style={style.content}>
					<div id="grid-cartmenu">
						<div style={{backgroundColor: "#01768b"}}><NavLink exact to="/cart" style={{color: "white"}}> 1 | My Cart </NavLink></div>
						<div><NavLink to="/checkout" style={{color: 'black', margin: '30px'}}>2 | Checkout & Pay </NavLink></div>
						<div>3 | Order Summary </div>
					</div>
					<hr/>
					{this.props.cartData.length === 0 ?
						<div>
							<p style={{textAlign: "center", margin: "30px auto 0"}}>Something missing? No products in cart yet.</p>
							<h3 style={{textDecoration: "underline", cursor: "pointer", textAlign: "center"}} onClick={this.backShopping}>Continue shopping?</h3>
						</div> :
						<div>
							<h3 style={{textDecoration: "underline", cursor: "pointer", textAlign: "center", margin: "30px auto"}} onClick={this.backShopping}>Continue shopping?</h3>
						</div>
					}
					{this.props.cartData.length !== 0 ? 
					<div id="cartview">
						<div>
							{this.props.cartProducts.map((obj, i) => {
								return (
									<div key={i}>
										<div style={style.images}>
											<img src={obj.photoURL} style={{width: "100%"}} alt=""/><br />
										</div>
										<div style={style.info}>
											<h3 key={i}>{obj.name}</h3>
											Price: {obj.price.toFixed(2)} €<br />
											SKU: {obj.SKU}<br />
											Stock: {obj.quantity}<br />
											<QuantityChange 
												index={i}
												productId={obj._id}
												stock={obj.quantity}
												cartData={this.props.cartData}
												userId={this.state.userId}
												price={obj.price}
												getCartProducts={this.props.getCartProducts}
												getCartData={this.props.getCartData}
											/>
											<RemoveFromCart 
												productId={obj._id}
              									getCartProducts={this.props.getCartProducts}
											/>
										</div>
										<hr style={{maxWidth: "80%"}} />
									</div>
								)
							})}
							<div style={{maxWidth: "80%", textAlign: "center", marginTop: "30px"}}>
								<button style={style.buttonClear} onClick={this.handleClear}>Clear cart</button>
							</div>
						</div>
						<div>
							<div>
								<h2> Cart Summary </h2>
								<div style={style.totals}>
									<div>Subtotal: </div>
									<div>{subtotal} € </div>
									<div>Shipping (Flat fee):</div>
									<div>{shipping} €</div>
								</div>
								<hr style={{width: "50vh"}}/>
								<div style={style.totals}>
									<div>Total (inc. VAT): </div>
									<div>{paymenttotal} € </div>
									<div>Total items: </div>
									<div>{itemtotal} </div>
								</div>
								<ShippingAddress 
									cartSubtotal={subtotal}
									itemsTotal={itemtotal}
									charge={this.state.charge}
									paymentTotal={paymenttotal}
									shippingFee={shipping}
									cartProducts={this.props.cartProducts}
									cartData={this.props.cartData}
								/>
							</div>
						</div>
					</div>
					: <div> </div>}
				</div>
			</div>
		);
	}
}

export default withRouter(Cart);

const style = {
	button: {
		padding: "5px 10px",
		border: "2px solid #01768b",
		borderRadius: "3px",
		cursor: "pointer",
		fontFamily: "Roboto, sans-serif",
		backgroundColor: "white",
		margin: "5px 5px"
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
		backgroundColor: "white"
	}
};