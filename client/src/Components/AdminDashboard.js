import React, { Component } from 'react';
import {withRouter} from 'react-router-dom';
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
		const token = localStorage.getItem('token');
		try {
			const response = await Axios.post(`/verifytoken`, {token: token});
			return !response.data.ok ? this.props.history.push('/admin/login') : null;
		}
		catch(e) {
			console.log(e);
		}
	}

	getAdminId = async e => {
		const email = localStorage.getItem('email');
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
			<div style={{backgroundColor: "#f0f0f0"}}>
				<NavBar />
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