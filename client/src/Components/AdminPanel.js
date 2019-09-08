import React, { Component } from 'react';
import Axios from 'axios';
import {withRouter, NavLink} from 'react-router-dom';
import NavBar from './NavBar';
import '../App.css';

class AdminPanel extends Component {

	state = {
		email: "",
		users: [],
		matched: [],
		message: ''
	}

	componentDidMount () {
		this.getAllUsers();
	}

	getAllUsers = async () => {
		try {
			let response = await Axios.get(`/admin`);
			//console.log(response);
			this.setState({users: response.data});
		}
		catch(e) {
	      	console.log(e);
	    }
	}

	handleChange = e => {
		this.setState({[e.target.name] : e.target.value});
	}

	handleSubmit = e => {
		e.preventDefault();
		let {email} = this.state;
		this.findEmail(email);
	}

	findEmail = email => {
		Axios.post(`/admin/check`, {
			email: email})
		.then((res) => {
			console.log(res);
			if (res.data !== "") {
				this.setState({matched: [res.data.oneAdmin], message: ''});
			} else {
				alert('User not found!');
			}
		})
		.catch((error) => {
			this.setState({message:'Please enter the email address.'});
		})
	}

	render () {
		
		let {users, matched} = this.state;
		let display;

		if (matched.length === 0 || users.length >= 1) {
			display = users.map((obj, i) => {
				return (
					<div key={i}>
						<div style={{
							display: "grid",
							gridTemplateColumns: "2fr 2fr 2fr"
						}}>
							<div>{obj._id}</div>
							<div></div>
							<div>{obj.email}</div>
						</div>
						<hr/><hr/>
					</div>
				)
			})
		}

		if (matched.length >= 1) {
			display = matched.map((obj, i) => {
				return (
					<div key={i}>
						<div style={{
							display: "grid",
							gridTemplateColumns: "2fr 2fr 2fr"
						}}>
							<div>{obj._id}</div>
							<div></div>
							<div>{obj.email}</div>
						</div>
						<hr/><hr/>
					</div>
				)
			})
		}

		return (
			<div>
				<NavBar />
				<div style={style.content}>
					<div id="grid-cartmenu">
						<div><NavLink exact to="/admin/dashboard" style={{color: 'black', margin: '30px'}}>Product Catalog</NavLink></div>
						<div><NavLink exact to="/orders" style={{color: 'black', margin: '30px'}}>All Orders</NavLink></div>
						<div style={{backgroundColor: "#01768b"}}><NavLink to="/adminpanel" style={{color: "white"}}>Admin Panel</NavLink></div>
					</div>
					<hr/>
					<div style={{
						display: "grid",
						gridTemplateColumns: "2fr 1fr 2fr",
						marginTop: "20px"
					}}>
						<div></div>
						<div>
							<form onSubmit={this.handleSubmit}>
								<input placeholder="Search by Email Address" type="text" name="email" onChange={this.handleChange} value={this.state.email} style={{textAlign: "center"}}/> {this.state.message}
							</form>
						</div>
						<div></div>
					</div>
					<div style={{marginTop: "20px"}}>
						<hr/>
						<div style={{
							display: "grid",
							gridTemplateColumns: "2fr 2fr 2fr",
							backgroundColor: "#f0f0f0"
						}}>
							<div><h3>User Id</h3></div>
							<div></div>
							<div><h3>Email address</h3></div>
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

export default withRouter(AdminPanel);

const style = {
	content: {
		width: "90%",
		margin: "5% auto 25%",
		height: "100%"
	}
};