import React, { Component } from 'react';
import {NavLink} from 'react-router-dom';
import NavBar from './NavBar';

export default class AdminPortal extends Component {

	state = {
		message: '',
		isLoggedInAdmin: this.props.isLoggedInAdmin
	}

	render () {
		
		return (
			<div>
				<NavBar/>
				<div>
					<header id="header">
						<img id="header-img" src="https://brooklyneagle.com/wp-content/uploads/2019/04/background-cayenne-chili-1091778-1024x683.jpg" alt=""/>
						<div className="discover">
							<h2> Sauce Stop: Hot sauce shop </h2>
							<h3> Admin Portal </h3>
							<NavLink to="/admin/login">Enter </NavLink>
						</div>
					</header>
				</div>
			</div>
		);
	}
}
