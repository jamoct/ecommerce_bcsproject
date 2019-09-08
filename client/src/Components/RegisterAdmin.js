import React, { Component } from 'react';
import Axios from 'axios';
import {withRouter} from 'react-router-dom';
import NavBar from './NavBar';
import AdminPortal from './AdminPortal';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faWindowClose } from '@fortawesome/free-solid-svg-icons';

class RegisterAdmin extends Component {
	
	state = {
		email: '',
		password: '',
		password2: '',
		message: '',
		adminAccess: ''
	}

	handleInput = e => {
		this.setState({[e.target.name] : e.target.value});
	}

	handleSubmit = async e => {
		let {email, password, password2, adminAccess} = this.state;
		e.preventDefault();
		try {
			if (adminAccess !== "1234") return alert('You need to have a valid Admin Access ID.');
			const response = await Axios.post(`/admin/register`, {
				email: email,
				password: password,
				password2: password2
			})
			console.log(response);
			this.setState({message: response.data.message, password: '', password2: '', adminAccess: ''});
			if (response.data.ok) return setTimeout(()=> {this.props.history.push('/admin/login')}, 3000);
		}
		catch(e){
			console.log(e);
		}
	}

	handleLogin = e => {
		try {
			this.props.history.push('/admin/login');
		}
		catch(e){
			console.log(e);
		}
	}

	handleClose = e => {
		this.props.history.push('/');
	}

	render(){
		return(
			<div>
				<NavBar />
				<AdminPortal />
				<div className="popup">
					<div className="popup-inner"> 
						<div style={{textAlign: "right"}}>
							<button 
							style={{border: "none", backgroundColor: "transparent", cursor: "pointer"}}
							onClick={this.handleClose}><FontAwesomeIcon icon={faWindowClose} size="lg"/></button>
						</div>
						<h1 style={{textAlign: "center"}}>Sign Up</h1>
						<h4 style={{textAlign: "center"}}>Please enter your credentials.</h4>
						<div style={{textAlign: "center"}}>
							<form onSubmit={this.handleSubmit}>
								<input
									placeholder="Email address"
									onChange={this.handleInput}
									type="text"
									name="email"
									value={this.state.email}
									style={style.forminputs}
								/><br />
								<input
									placeholder="Password"
									onChange={this.handleInput}
									type="text"
									name="password"
									value={this.state.password}
									style={style.forminputs}
								/><br />
								<input
									placeholder="Confirm password"
									onChange={this.handleInput}
									type="text"
									name="password2"
									value={this.state.password2}
									style={style.forminputs}
								/><br />
								<input
									placeholder="Access ID"
									onChange={this.handleInput}
									type="text"
									name="adminAccess"
									value={this.state.adminAccess}
									style={style.forminputs}
								/><br />
								<button className="button">Register</button>
							</form>
							<p onClick={this.handleLogin} style={style.action}> Already a user? Login </p>
							<p>{this.state.message}</p>
						</div>
					</div>
				</div>
			</div>
		)
	}
}

export default withRouter(RegisterAdmin);

const style = {
	forminputs: {
		display: "inline-block",
		padding: "10px",
		margin: "5px auto",
		width: "40vh"
	},
	action: {
		textDecoration: "underline",
		cursor: "pointer",
		margin: "5px"
	}
}