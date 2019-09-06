import React, { Component } from 'react';
import Axios from 'axios';
import {NavLink} from 'react-router-dom';
import DeleteProduct from './DeleteProduct';
import UpdateProduct from './UpdateProduct';
import AddtoCart from './AddtoCart';

let addurl = `/admin/dashboard/add-product`;

export default class ShowProducts extends Component {

	state = {
		message: '',
		sku: '',
		matched: [],
		isClicked: false,
		isAdmin: this.props.isAdmin,
		products: []
	}

	componentDidMount () {
		this.setState({products: this.props.products});
	}

	handleChange = e => {
		this.setState({sku: e.target.value, matched: []});
	}

	handleSubmit = e => {
		e.preventDefault();
		let {sku} = this.state;
		this.findProduct(sku);
	}

	findProduct = sku => {
		Axios.get(`/admin/products/${sku}`)
		.then((res) => {
			console.log(res);
			if (res.data !== "") {
				this.setState({matched: [res.data]});
				this.setState({message: ''});
			} else {
				alert('Product not found!');
			}
		})
		.catch((error) => {
			this.setState({message:'Please enter the SKU.'});
		})
	}

	checkClicked = clicked => {
		this.setState({isClicked: clicked});
		setTimeout(()=> {this.setState({isClicked: false})}, 1000);
	}

	render () {
		
		let {matched, isClicked} = this.state;
		let display;
		let info = '';

		if (matched.length === 0 && products.length >= 1) {
			display = this.props.products.map((obj, i) => {
				return (
					<div className="productCard" style={style.productCard} key={i}>
						<DeleteProduct 
							id={obj._id}
							getProducts={this.props.getProducts}
						/>
						<img className="product-images" src={obj.photoURL} alt=""/><br />
						<UpdateProduct 
							id={obj._id} 
							name={obj.name}
							price={obj.price}
							SKU={obj.SKU}
							desc={obj.desc}
							quantity={obj.quantity}
							getProducts={this.props.getProducts}
						/>
						<br />
						<h3 key={i}>{obj.name}</h3>
						Price: {obj.price.toFixed(2)} €<br />
						SKU: {obj.SKU}<br />
						Stock: {obj.quantity}<br />
						Description: {obj.desc}<br />
						<AddtoCart 
							productId={obj._id}
							SKU={obj.SKU}
							price={obj.price}
							isClicked={this.state.isClicked}
							checkClicked={this.checkClicked}
							info={this.info}
							getProducts={this.props.getProducts}
							getCartProducts={this.props.getCartProducts}
						/>
					</div>
				)
			})
		}

		if (matched.length >= 1) {
			display = matched.map((obj, i) => {
				return (
					<div className="productCard" style={style.productCard} key={i}>
						<DeleteProduct 
							id={obj._id}
							getProducts={this.props.getProducts}
						/>
						<img className="product-images" src={obj.photoURL} alt=""/><br />
						<UpdateProduct 
							id={obj._id} 
							name={obj.name}
							price={obj.price}
							SKU={obj.SKU}
							desc={obj.desc}
							getProducts={this.props.getProducts}/>
						<br />
						<h3 key={i}>{obj.name}</h3>
						Price: {obj.price.toFixed(2)} €<br />
						SKU: {obj.SKU}<br />
						Description: {obj.desc}<br />
						Stock: {obj.quantity}<br />
						<AddtoCart 
							productId={obj._id}
							SKU={obj.SKU}
							cart={this.state.cart}
							isClicked={this.state.isClicked}
							checkClicked={this.checkClicked}
							getProducts={this.props.getProducts}
							getCartProducts={this.props.getCartProducts}
						/>
					</div>
				)
			})
		}

		if (isClicked) {
			info = 'Item added';
		}

		return (
			<div>
				<div id="catalog">
					<h2>Product Catalog</h2>
					<form onSubmit={this.handleSubmit}>
						<input placeholder="Search by SKU" type="text" name="sku" onChange={this.handleChange} value={this.state.sku} style={{textAlign: "center"}}/> {this.state.message} 
					</form>
					<p> <NavLink to={addurl} style={{color: 'black', margin: '30px'}}>add new product</NavLink> </p> 
					{!this.state.isClicked ? 
						<p style={{textAlign: "center"}}>{info}</p> :
						<p style={{textAlign: "center", backgroundColor: "white", padding: "5px"}}>{info}</p>
					}
				</div>
				{this.state.message}
				<div style={style.productList}>
					{display}
				</div>
			</div>
		);
	}
}

const style = {
  	productList: {
  		maxWidth: "1000px",
  		display: "grid",
  		gridTemplateColumns: "1fr 1fr 1fr",
  		margin: "30px auto"
  	},
  	productCard: {
  		margin: "10px",
		backgroundColor: "white",
		padding: "30px"
  	}
}
