import React, { Component } from 'react';
import Axios from 'axios';
import {withRouter} from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faWindowClose } from '@fortawesome/free-solid-svg-icons';

class AddProduct extends Component {

	state = {
		name: '',
		price: '',
		photoURL: '',
		quantity: '',
		SKU: '',
		desc: '',
		message: ''
	}

	handleChange = e => {
		this.setState({[e.target.name]: e.target.value});
	}

	handleSubmit = async e => {
		let {name, price, photoURL, quantity, SKU, desc} = this.state;
		e.preventDefault();
		try {
			const res = await Axios.post(`/admin/products/add`, {
				name: name,
				price: price,
				photoURL: photoURL,
				quantity: quantity,
				SKU: SKU,
				desc: desc
			})
			console.log(res);
			this.setState({
				message: res.data.message, 
				name: '',
				price: '',
				photoURL: '',
				quantity: '',
				SKU: ''});
			this.props.getProducts();
			//if (res.data.ok) return setTimeout(()=> window.location.reload(), 1000);
		}
		catch(e){
			console.log(e);
		}
	}

	handleClose = e => {
		this.props.history.push('/admin/dashboard');
	}

	render () {
		return (
			<div className="popup">
				<div className="popup-inner">
					<div style={{textAlign: "right"}}>
						<button 
						style={{border: "none", backgroundColor: "transparent", cursor: "pointer"}}
						onClick={this.handleClose}><FontAwesomeIcon icon={faWindowClose} size="lg"/></button>
					</div>
					<div style={{textAlign: "center"}}>
						<h2>Add Product</h2>
					</div>
					<form onSubmit={this.handleSubmit}>
					<ul style={{listStyle: "none"}}>
						<li className="li-product">Item name: <input 
							placeholder="item name"
							name="name"
							value={this.state.name}
							onChange={this.handleChange}
						/></li>
						<li className="li-product">Item price: <input 
							placeholder="price"
							name="price"
							value={this.state.price}
							onChange={this.handleChange}
						/></li>
						<li className="li-product">Image URL: <input 
							placeholder="image URL"
							name="photoURL"
							value={this.state.photoURL}
							onChange={this.handleChange}
						/></li>
						<li className="li-product">Item SKU: <input 
							placeholder="SKU"
							name="SKU"
							value={this.state.SKU}
							onChange={this.handleChange}
						/></li>
						<li className="li-product">Item stock: <input 
							placeholder="quantity"
							name="quantity"
							value={this.state.quantity}
							onChange={this.handleChange}
						/></li>
						<li className="li-product">Item description: <textarea 
							placeholder="description"
							name="desc"
							value={this.state.desc}
							onChange={this.handleChange}
						/></li>
					</ul>
					<div style={{textAlign: "center"}}>
						<button className="button">Add product</button>
					</div>
					</form>
					<p>{this.state.message}</p>
				</div>
			</div>
		);
	}
}

export default withRouter(AddProduct);