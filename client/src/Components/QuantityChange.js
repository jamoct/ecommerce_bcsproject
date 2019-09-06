import React, { Component } from 'react';
import '../App.css';
import Axios from 'axios';

export default class QuantityChange extends Component {

	state = {
		cart: this.props.cartData,
		qty: '',
		userId: this.props.userId,
		index: this.props.index,
		productId: this.props.productId,
		price: this.props.price,
		ordered: this.props.cartData[this.props.index].orderedquantity
	}

	handleInput = e => {
		this.setState({[e.target.name] : e.target.value});
	}

	changeQty = async (e) => {
		try {
			let {qty, price, productId} = this.state;
			Axios.post(`/cart/update`, {
				productId: productId,
				newQty: qty,
				price: price
			})
			//console.log(response);
			this.setState({ordered: this.state.qty});
			this.props.getCartData();
		}
		catch(e){
			console.log(e);
		}
		//console.log(products[index]);
		//console.log(cart[index]);
		//console.log(productid);
		//this.setState({...[products]});
	}

	render () {

		return (
			<div>
				{this.props.cartData.length !== 0 ? 
					<div>
						Ordered: {this.state.ordered}
						<br/>
						<input
							placeholder={this.state.cart[this.state.index].orderedquantity}
							type="number"
							name="qty"
							value={this.state.qty}
							onChange={this.handleInput}
							style={{maxWidth: "50px", margin: "10px 5px"}}
						/>
						<button style={style.buttonClear} onClick={this.changeQty} 
							disabled={this.state.qty === this.props.stock || this.props.stock < this.state.qty || this.state.qty === "" || this.state.qty < 1}>update</button>
					</div>
					: null
				}
			</div>
		);
	}
}

const style = {
	buttonClear: {
		border: "2px solid #01768b",
		borderRadius: "3px",
		cursor: "pointer",
		padding: "5px",
		width: "10vh",
		fontFamily: "Roboto, sans-serif",
		backgroundColor: "white"
	}
}

