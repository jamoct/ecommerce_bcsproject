import React, { Component } from 'react';
import Axios from 'axios';
import {withRouter, NavLink} from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faEdit, faWindowClose } from '@fortawesome/free-solid-svg-icons';

let updateurl = `/admin/dashboard/update-product`;

class UpdateProduct extends Component {

	state = {
		name: this.props.name,
		price: this.props.price,
		photoURL: this.props.photoURL,
		quantity: this.props.quantity,
		SKU: this.props.SKU,
		desc: this.props.desc,
		message: '',
		clicked: false
	}

	handleChange = e => {
		this.setState({[e.target.name] : e.target.value});
	}

	handleUpdate = async e => {
		let {name, price, photoURL, quantity, SKU, desc} = this.state;
		e.preventDefault();
		try {
			const res = await Axios.post(`/admin/products/update`, {
				_id: this.props.id,
				newName: name,
				newPrice: price,
				newPhotoURL: photoURL, 
				newQuantity: quantity,
				newSKU: SKU,
				newDesc: desc
			})
			console.log(res);
			this.setState({clicked: true, message: res.data.message});
			this.props.getProducts();
		}
		catch(e){
			console.log(e);
		}
	}

	handleEdit = e => {
		this.setState({clicked: true});
	}

	handleClose = e => {
		this.setState({clicked: false});
		this.props.history.push('/admin/dashboard');
	}

	render () {
		return (
			<div>
				<button className="productCard" onClick={this.handleEdit} style={style.button}>
					<NavLink to={updateurl}>
						<FontAwesomeIcon icon={faEdit} size="lg"/>Edit
					</NavLink>
				</button>
				{ this.state.clicked ?
				<div className="popup">
					<div className="popup-inner">
						<div style={{textAlign: "right"}}>
							<button 
								style={{border: "none", backgroundColor: "transparent", cursor: "pointer"}}
								onClick={this.handleClose}><FontAwesomeIcon icon={faWindowClose} size="lg"/>
							</button>
						</div>
						<div style={{textAlign: "center"}}>
							<h2 className="headings">Edit Product</h2>
						</div>
						<form onSubmit={this.handleUpdate}>
						<ul style={{listStyle: "none"}} className="hepta">
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
							<button className="button">Save changes</button>
						</div>
						</form>
					</div>
				</div>
					: null
				}
			</div>
		);
	}
}

export default withRouter(UpdateProduct);

const style = {
	button: {
		border: "none",
		backgroundColor: "transparent",
		cursor: "pointer",
		margin: "0 40%"
	}
}