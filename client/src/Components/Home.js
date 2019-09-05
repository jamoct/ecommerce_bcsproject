import React, { Component } from 'react';
import Axios from 'axios';
import {withRouter} from 'react-router-dom';
import NavBar from './NavBar';

class Home extends Component {

	state = {
		message: '',
		sku: '',
		matched: []
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
		Axios.get(`http://localhost:3030/admin/products/${sku}`)
		.then((res) => {
			console.log(res);
			this.setState({matched: [res.data]});
		})
		.catch((error) => {
			this.setState({message:'Please enter the SKU.'});
		})
	}

	render () {
		
		let {matched} = this.state;
		let display;

		if (matched.length === 0 && this.props.products !== undefined) {
			display = this.props.products.map((obj, i) => {
				return (
					<div className="product-list" key={i}>
						<img className="product-images" src={obj.photoURL} alt=""/><br />
						<h3 key={i}>{obj.name}</h3>
						Price: {obj.price} €<br />
						Description: {obj.desc}
					</div>
				)
			})
		}

		if (matched.length >= 1) {
			display = matched.map((obj, i) => {
				return (
					<div className="product-list" key={i}>
						<img className="product-images" src={obj.photoURL} alt=""/><br />
						<h3 key={i}>{obj.name}</h3>
						Price: {obj.price} €<br />
						SKU: {obj.SKU}<br />
						Description: {obj.desc}<br />
						Quantity: {obj.quantity}<br />
					</div>
				)
			})
		}

		return (
			<div>
				<NavBar/>
				<div>
					<header id="header">
						<img id="header-img" src="https://brooklyneagle.com/wp-content/uploads/2019/04/background-cayenne-chili-1091778-1024x683.jpg" alt=""/>
						<div className="discover">
							<h2> Sauce Stop: Hot sauce shop </h2>
							<h3> We can make you sweat </h3>
							<a href="#sauces">Discover our sauces</a>
						</div>
					</header>
				</div>
				<section id="sauces">
				<h2>Sauces</h2> 
				<div>
					{display}
				</div>
				</section>
				<p>{this.state.message}</p>
				<div>
					<footer>
						<ul>
							<li>Open Mon - Fri | 10:00 - 20:30</li>
							<li>2019 &copy;</li>
						</ul>
					</footer>
				</div>
			</div>
		);
	}
}

export default withRouter(Home);