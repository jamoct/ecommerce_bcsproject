import React, { Component } from 'react';
import Axios from 'axios';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCartPlus } from '@fortawesome/free-solid-svg-icons';

export default class AddtoCart extends Component {

	state = {
		userId: localStorage.getItem('id'),
		productId: this.props.productId,
		orderedquantity: 1, 
		SKU: this.props.SKU,
		price: this.props.price,
		cost: 0,
		paidStatus: false,
		isClicked: true,
		message: '',
		found: false
	}

	componentDidMount () {

	}

	handleClick = e => {
		let {userId, productId} = this.state;
		this.findProduct(userId, productId);
	}

	findProduct = (userId, productId) => {
		Axios.get(`/cart/${userId}/${productId}`)
		.then((res) => {
			console.log(res);
			if (!res.data.found) {
				this.addToCart();
			} else {
				this.setState({message: res.data.message});
			}
		})
		.catch((error) => {
			console.log(error);
		})
	}

	addToCart = async () => {
		let {userId, productId, orderedquantity, SKU, price, cost, paidStatus} = this.state;
		try {
			this.props.checkClicked(this.state.isClicked);
			const res = await Axios.post(`/cart/add`, {
				userId:userId,
				productId:productId, 
				orderedquantity:orderedquantity, 
				SKU:SKU,
				price:price,
				cost:cost,
				paidStatus:paidStatus
			})
			console.log(res);
			localStorage.setItem('OrderId', '');
			this.props.getCartProducts();
		}
		catch(e){
			console.log(e);
		}
	}

	render () {
		return (
			<div>
				<button className="button" onClick={this.handleClick}>
					<FontAwesomeIcon icon={faCartPlus} size="lg"/> Add to cart
				</button>
				{this.state.message}
			</div>
		);
	}
}