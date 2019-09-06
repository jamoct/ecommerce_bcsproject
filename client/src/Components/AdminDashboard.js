import React, { Component } from 'react';
import {withRouter, NavLink} from 'react-router-dom';
import Axios from 'axios';
import ShowProducts from './ShowProducts';
import NavBar from './NavBar';
import '../App.css';

class AdminDashboard extends Component {

	state = {
		isLoggedInAdmin: false
	}

	componentDidMount () {
		this.verifyToken();
		this.getAdminId();
	}

	verifyToken = async e => {
		const token = JSON.parse(localStorage.getItem('token'));
		try {
			const response = await Axios.post(`/verifytoken`, {token: token});
			return !response.data.ok ? this.props.history.push('/admin/login') : null;
		}
		catch(e) {
			console.log(e);
		}
	}

	getAdminId = async e => {
		const email = JSON.parse(localStorage.getItem('email'));
		try {
			const response = await Axios.post(`/admin/check`, {email: email});
			if (!response.data.ok) {
				this.props.history.push('/');
			} else {
				localStorage.setItem('id', response.data.oneAdmin._id);
				this.setState({isLoggedInAdmin: true});
				this.props.checkAdminLoggedIn(this.state.isLoggedInAdmin);
			}	
		}
		catch(e) {
			console.log(e);
		}
	}

	render () {
		return (
			<div>
				<NavBar />
				<div style={style.content}>
					<div id="grid-cartmenu">
						<div style={{backgroundColor: "#01768b"}}><NavLink exact to="/admin/dashboard" style={{color: "white"}}>Product Catalog</NavLink></div>
						<div><NavLink to="/orders" style={{color: 'black', margin: '0 30px'}}>All Orders</NavLink></div>
						<div><NavLink to="/adminpanel" style={{color: 'black', margin: '0 30px'}}>Admin Panel</NavLink></div>
					</div>
					<hr/>
				</div>
				<ShowProducts 
					products={this.props.products}
					getProducts={this.props.getProducts}
					getCartProducts={this.props.getCartProducts}
					isAdmin={this.state.isAdmin}
				/>
			</div>
		)
	}
}

export default withRouter(AdminDashboard);

const style = {
	content: {
		maxWidth: "1000px",
		margin: "40px auto 0"
	}
};