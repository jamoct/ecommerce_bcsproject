import React, { Component } from 'react';
import { NavLink } from "react-router-dom";

export default class Footer extends Component {
	render () {
		return (
			<div>
				<footer>
					<ul>
						<li><NavLink exact to="/home">Home</NavLink></li>
						<li><a href="#location">Location</a></li>
						<li><a href="#gallery">Gallery</a></li>
						<li><a href="#sauces">Sauces</a></li>
						<li><a href="#contact">Contact Us</a></li>
					</ul>
					<ul>
						<li>Open Mon - Fri | 10:00 - 20:30</li>
						<li>2019 &copy;</li>
					</ul>
				</footer>
			</div>
		);
	}
}