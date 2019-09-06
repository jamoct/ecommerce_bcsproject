import React, { Component } from 'react';
import Axios from 'axios';
import {withRouter} from 'react-router-dom';
import NavBar from './NavBar';
import Home from './Home';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faWindowClose } from '@fortawesome/free-solid-svg-icons';

class LoginAdmin extends Component {
	
	state = {
		email: '',
		password: '',
		message: ''
	}

	componentDidMount () {
		if (localStorage.length >= 3) {
			this.props.history.push('/admin/dashboard');
		}
	}
		
	handleInput = e => {
		this.setState({[e.target.name] : e.target.value});
	}

	handleSubmit = async e => {
		let {email, password} = this.state;
		e.preventDefault();
		try {
			const response = await Axios.post(`/admin/login`, {
				email: email,
				password: password
			})
			console.log(response);
			if (response.data.token !== undefined) {
				localStorage.setItem('token', JSON.stringify(response.data.token));
				localStorage.setItem('email', JSON.stringify(response.data.email));
				this.setState({message: response.data.message, email: '', password: '', isLoggedin: true});
				setTimeout(()=> {this.props.history.push('/admin/dashboard')}, 3000);
			} else {
				localStorage.clear();
				this.setState({message: response.data.message, email: '', password: ''});
			}
		}
		catch(e){
			console.log(e);
		}
	}

	handleRegister = async e => {
		try {
			this.props.history.push('/admin/register');
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
				<Home />
				<div className="popup">
					<div className="popup-inner"> 
						<div style={{textAlign: "right"}}>
							<button 
							style={{border: "none", backgroundColor: "transparent", cursor: "pointer"}}
							onClick={this.handleClose}><FontAwesomeIcon icon={faWindowClose} size="lg"/></button>
						</div>
						<h1 style={{margin: "10px auto 0", textAlign: "center"}}>Welcome back</h1>
						<h4 style={{margin: "10px auto", textAlign: "center"}}>Please enter your credentials.</h4>
						<div style={{textAlign: "center"}}>
							<form onSubmit={this.handleSubmit}>
								<input
									placeholder="Email Address"
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
								<button className="button">Login</button>
							</form>
							<p onClick={this.handleRegister} style={style.action}> New user? Register </p>
							<p>{this.state.message}</p>
						</div>
					</div>
				</div>
			</div>
		)
	}
}

export default withRouter(LoginAdmin);

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
		margin: "10px"
	}
}