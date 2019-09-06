import React, { Component } from 'react';
import Axios from 'axios';
import {withRouter, NavLink} from 'react-router-dom';
import NavBar from './NavBar';
import '../App.css';

class MyOrders extends Component {

	state = {
		orderId: "",
		userId: "",
		orders: [],
		matched: [],
		showOrder: false,
		message: ''
	}

	componentDidMount () {
		this.getAllOrders();
	}

	getAllOrders = async () => {
		try {
			let response = await Axios.get(`/orders`);
			//console.log(response);
			this.setState({orders: response.data});
		}
		catch(e) {
	      	console.log(e);
	    }
	}

	findOrderbyClick = orderId => {
		let {showOrder} = this.state;
		if (showOrder === true || this.state.orderId !== "") {
			this.setState({showOrder:false, orderId: ""});
		} else {
			this.setState({showOrder: true});
			Axios.get(`/admin/orders/id/${orderId}`)
			.then((res) => {
				console.log(res);
				if (res.data !== "") {
					this.setState({matched: res.data});
					this.setState({message: ''});
				} else {
					alert('Order not found!');
				}
			})
			.catch((error) => {
				this.setState({message:'Please enter the Order Id.'});
			})
		}
	}

	handleChange = e => {
		this.setState({[e.target.name] : e.target.value});
	}

	handleSubmit = e => {
		e.preventDefault();
		let {orderId} = this.state;
		this.findOrder(orderId);
	}

	handleFindUser = e => {
		e.preventDefault();
		let {userId} = this.state;
		this.findOrderbyUser(userId);
	}

	findOrder = orderId => {
		Axios.get(`/admin/orders/id/${orderId}`)
		.then((res) => {
			console.log(res);
			if (res.data !== "") {
				this.setState({matched: res.data});
				this.setState({message: ''});
			} else {
				alert('Order not found!');
			}
		})
		.catch((error) => {
			this.setState({message:'Please enter the Order Id.'});
		})
	}

	findOrderbyUser = userId => {
		Axios.get(`/admin/orders/${userId}`)
		.then((res) => {
			console.log(res);
			if (res.data !== "") {
				this.setState({matched: res.data});
				this.setState({message: ''});
			} else {
				alert('Order not found!');
			}
		})
		.catch((error) => {
			this.setState({message:'Please enter the User Id.'});
		})
	}

	handleHideInfo = e => {
		this.setState({showOrder:false, orderId: "", matched: []});
	}

	render () {
		
		let {orders, matched, showOrder} = this.state;
		let display;

		if (matched.length === 0 || showOrder === false) {
			display = orders.map((obj, i) => {
				return (
					<div key={i}>
						<div style={{
							display: "grid",
							gridTemplateColumns: "2fr 1fr 1fr 1fr 2fr 1fr"
						}}>
							<div>{obj._id}</div>
							<div>{obj.paidStatus}</div>
							<div>{obj.itemTotal} pcs.</div>
							<div>{obj.paymentTotal.toFixed(2)}</div>
							<div>{obj.currentStatus}</div>
							<div onClick={() => this.findOrderbyClick(obj._id)} style={{cursor: "pointer"}}><strong>view info</strong></div>
						</div>
						<hr/><hr/>
					</div>
				)
			})
		}

		if (matched.length >= 1 || showOrder === true) {
			display = matched.map((obj, i) => {
				return (
					<div key={i}>
						<div style={{
							display: "grid",
							gridTemplateColumns: "2fr 1fr 1fr 1fr 2fr 1fr"
						}}>
							<div>{obj._id}</div>
							<div>{obj.paidStatus}</div>
							<div>{obj.itemTotal} pcs.</div>
							<div>{obj.paymentTotal}</div>
							<div>{obj.currentStatus}</div>
							<div onClick={this.handleHideInfo} style={{cursor: "pointer"}}><strong>hide info</strong></div>
						</div>
						<hr/>
						<div>
							<div style={{backgroundColor: "#f0f0f0"}}>
								<h4><center>Items Info</center></h4>
								<div style={{
									display: "grid",
									gridTemplateColumns: "2fr 1fr 1fr 1fr 2fr",
									marginTop: "10px"
								}}>
										<div><h5>Product ID</h5></div>
										<div><h5>SKU</h5></div>
										<div><h5>Ordered Qty</h5></div>
										<div><h5>Price</h5></div>
										<div><h5>Cost</h5></div>
								</div>
								<hr/>
								{obj.products.map((p, j) => {
									return (
										<div key={j}>
											<div style={{
											display: "grid",
											gridTemplateColumns: "2fr 1fr 1fr 1fr 2fr"
											}}>
												<div>{p.productId}</div>
												<div>{p.SKU}</div>
												<div>{p.orderedquantity} pcs.</div>
												<div>{p.price.toFixed(2)}</div>
												<div>{p.cost}</div>
											</div>
											<hr/>
										</div>
									)
								})}
							</div>
							<div style={{marginTop: "10px"}}>
								<h4><center>Shipping Info</center></h4>
								<div style={{
									display: "grid",
									gridTemplateColumns: "1fr 3fr 3fr 1fr",
									marginTop: "10px"
								}}>
									<div></div>
									<div>
										<ul style={{listStyle: "none"}}>
											<li><strong>First Name:</strong> {obj.firstName}</li>
											<li><strong>Last Name:</strong> {obj.lastName}</li>
											<li><strong>Add Line 1:</strong> {obj.addressline1}</li>
											<li><strong>Add Line 2:</strong> {obj.addressline2}</li>
											<li><strong>City:</strong> {obj.city}</li>
											<li><strong>Country:</strong> {obj.country}</li>
											<li><strong>State/Region:</strong> {obj.state}</li>
											<li><strong>Postal Code:</strong> {obj.postal_code}</li>
											<li><strong>Contact Number:</strong> {obj.contactNumber}</li>
										</ul>
									</div>
									<div>
										<ul style={{listStyle: "none"}}>
											<li>Shipping Fee: {obj.shippingFee}</li>
											<li>Shipping Status: {obj.shippedStatus}</li>
											<li>Shipping Number: {obj.shippingNumber}</li>
										</ul>
									</div>
									<div></div>
								</div>
							</div>
							<br/>
							<div style={{
								backgroundColor: "#f0f0f0"
							}}>
								<h4><center>------------------------------------------------</center></h4>
							</div>
						</div>
						<hr/>
					</div>
				)
			})
		}

		return (
			<div>
				<NavBar />
				<div style={style.content}>
					<div id="grid-cartmenu">
						<div ><NavLink exact to="/admin/dashboard" style={{color: 'black', margin: '30px'}}>Product Catalog</NavLink></div>
						<div style={{backgroundColor: "#01768b"}}><NavLink to="/orders" style={{color: "white"}}>All Orders</NavLink></div>
						<div><NavLink to="/adminpanel" style={{color: 'black', margin: '30px'}}>Admin Panel</NavLink></div>
					</div>
					<hr/>
					<div style={{
						display: "grid",
						gridTemplateColumns: "2fr 1fr 1fr 1fr 2fr",
						marginTop: "20px"
					}}>
						<div></div>
						<div>
							<form onSubmit={this.handleSubmit}>
								<input placeholder="Search by Order ID" type="text" name="orderId" onChange={this.handleChange} value={this.state.orderId} style={{textAlign: "center"}}/> {this.state.message}
							</form>
						</div>
						<div></div>
						<div>
							<form onSubmit={this.handleFindUser}>
								<input placeholder="Search by User ID" type="text" name="userId" onChange={this.handleChange} value={this.state.userId} style={{textAlign: "center"}}/> {this.state.message}
							</form>
						</div>
						<div></div>
					</div>
					<div style={{marginTop: "20px"}}>
						<hr/>
						<div style={{
							display: "grid",
							gridTemplateColumns: "2fr 1fr 1fr 1fr 2fr 1fr",
							backgroundColor: "#f0f0f0"
						}}>
							<div><h3>Order Id</h3></div>
							<div><h3>Paid Status</h3></div>
							<div><h3># of Items</h3></div>
							<div><h3>Total Cost</h3></div>
							<div><h3>Order Status</h3></div>
							<div></div>
						</div>
						<hr/>
						{display}
					</div>
				</div>
			</div>
		);
	}
}

export default withRouter(MyOrders);

const style = {
	content: {
		maxWidth: "1000px",
		margin: "40px auto"
	}
};