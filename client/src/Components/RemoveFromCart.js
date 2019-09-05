import React, { Component } from 'react';
import Axios from 'axios';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faTrash } from '@fortawesome/free-solid-svg-icons';

export default class RemoveFromCart extends Component {

	state = {
		productId: '',
		message: ''
	}

	handleClick = async e => {
		e.preventDefault();
		try {
			await Axios.post(`http://localhost:3030/cart/remove`, {
				productId: this.props.productId
			})
			this.props.getCartProducts();
		}
		catch(e){
			this.setState({message: 'No products to remove.'});
		}
	}

	render () {

		return (
			<div>
				<button onClick={this.handleClick} style={style.button}>
					<FontAwesomeIcon icon={faTrash} style={style.image}/> Remove
				</button>
			</div>
		);
	}
}

const style = {
	button: {
		border: "none",
		backgroundColor: "transparent",
		cursor: "pointer",
		margin: "15px auto 0"
	}
}