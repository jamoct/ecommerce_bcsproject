import React, { Component } from 'react';
import Axios from 'axios';
import {withRouter, NavLink} from 'react-router-dom';

class Home extends Component {

	state = {
		message: ''
	}

	handleChange = e => {
		this.setState({sku: e.target.value, matched: []});
	}

	render () {
		
		let display;

		if (this.props.products !== undefined) {
			display = this.props.products.map((obj, i) => {
				return (
					<div className="product-list" key={i}>
						<img className="product-images" src={obj.photoURL} alt=""/><br />
						<h3 key={i}>{obj.name}</h3>
						Price: {obj.price} €<br />
					</div>
				)
			})
		}

		return (
			<div>
				<nav id="nav-bar">
		          <h1> <NavLink exact to="/home"> Sauce Stop </NavLink> </h1>
		          <ul>
		            <li><a href="#header">Home</a></li>
		            <li><a href="#location">Location</a></li>
		            <li><a href="#gallery">Gallery</a></li>
		            <li><a href="#sauces">Sauces</a></li>
		            <li><a href="#contact">Contact Us</a></li>
		          </ul>
		        </nav>
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
				<section id="location">
					<h2>VISIT&ensp;US</h2>
					<a href="#header">Top</a>
					<iframe src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d2992.972535642963!2d2.1621692156707466!3d41.39640280339864!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x12a4a294ae818ef5%3A0xa2cb72517b4aaafc!2sCarrer+de+Roger+de+Ll%C3%BAria%2C+119%2C+08037+Barcelona!5e0!3m2!1sen!2ses!4v1563809605128!5m2!1sen!2ses" style={{width: "800", height: "300px", frameborder:"0", border: "0"}} allowFullScreen title="map"></iframe>
					<p>Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.</p>
					<address>
						Carrer Roger de Llúria 119, 4-1 08037 Barcelona<br />
						+34123456789<br />
					</address>
				</section>
				<section id="gallery">
				<h2>GALLERY</h2>
				<a href="#header">Top</a>
				<div className="gallerypics">
						<div>
							<img src="https://melmagazine.com/wp-content/uploads/2018/10/0j51FWFYIkj_eojlb.html-charsetutf-8" alt=""/>
						</div>
						<div>
							<img src="https://i0.wp.com/www.lataco.com/wp-content/uploads/Fuego-Hot-Sauce-Store-Photo-2-e1499288318138.jpg" alt=""/>
						</div>
						<div>
							<img src="http://greenpointnews.com/wp-content/uploads/2015/07/img-2710.jpg" alt=""/>
						</div>
						</div>
						<div className="maingallery">
							<img src="https://switzerlandcafe.com/shop/wp-content/uploads/nc-cafe-general-store-hot-sauce-3.jpg" alt=""/>
						</div>
				</section>
				<section id="sauces">
					<h2>Sauces</h2> 
					<a href="#header">Top</a>
				<div>
					{display}
				</div>
				</section>
				<section id="contact">
					<h2>CONTACT&ensp;US&ensp;</h2>
					<a href="#header">Top</a>
					<div className="inquiry-form">
						<h3>Any questions?</h3><br/>
						<h4>Get in touch or visit us!</h4><br/>
						<a style={style.contact} href="email:joyce@barcelonacodeschool.com">info@saucestop.com</a>
						<a style={style.contact} href="tel:+34123456789">+34 123 456 789</a>
					</div>
				</section>
				<div style={{textAlign: "center"}}>
					<p style={{margin: "0 auto"}}>Payments powered by</p>
					<img style={{maxHeight: "30px"}} src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQOaoL6eVEywJ5kvTdaR83tQ42q4R1dpVp6Tty0-8X_kk5NNcc3" alt=""/>
				</div>
				<p>{this.state.message}</p>
			</div>
		);
	}
}

export default withRouter(Home);

const style = {
	contact: {
		textDecoration: "none",
		color: "black",
		margin: "0 auto"
	}
}