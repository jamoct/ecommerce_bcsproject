import React from "react";
import { NavLink, withRouter } from "react-router-dom";
import '../App.css';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faShoppingCart, faSignInAlt, faSignOutAlt } from '@fortawesome/free-solid-svg-icons';
import Axios from 'axios';

class NavBar extends React.Component {

  state = {
    length: localStorage.length,
    token: localStorage.getItem('token'),
    itemtotal: localStorage.getItem('ItemTotal'),
    paid: localStorage.getItem('Paid'),
    isLoggedInAdmin: false
  }

  handleClick = e => {
    localStorage.clear();
    this.props.history.push('/');
    //this.props.checkAdminLoggedIn(this.state.isLoggedInAdmin);
  }

  findOrder = async orderid => {
    try {
      let orderid = localStorage.getItem('OrderId');
      const res = await Axios.get(`/admin/orders/id/${orderid}`);
      if (res.data.length !== 0 && (res.data.paidStatus === "true" || orderid !== '')) {
        //console.log(res);
        localStorage.setItem('CartTotal', 0);
        localStorage.setItem('ItemTotal', 0);
        localStorage.setItem('Paid', 'false');
        localStorage.setItem('PaymentTotal', 0);
        localStorage.setItem('Shipping', 0);
        localStorage.setItem('OrderId', "");
        this.props.history.push('/cart');
      } else {
        this.props.history.push('/cart');
      }
    }
    catch(e){
      console.log(e);
    }
  }

  render() {    
  
    return (
      <div>
        {localStorage.length === 0 || this.state.token === "undefined" || localStorage.email === "undefined" || localStorage.id === "undefined" || localStorage.id === "" ? 
        <nav id="nav-bar">
          <h1> <NavLink exact to="/"> Sauce Stop </NavLink> </h1>
          <ul>
            <li><a href="#header">Home</a></li>
            <li><a href="#location">Location</a></li>
            <li><a href="#gallery">Gallery</a></li>
            <li><a href="#sauces">Sauces</a></li>
            <li><a href="#contact">Contact Us</a></li>
            <li> <NavLink exact to="/admin/login"><FontAwesomeIcon icon={faSignInAlt} size="lg" /> Admin Log in </NavLink> </li>
          </ul>
        </nav> :
        <nav id="nav-bar">
          <h1> <NavLink exact to="/"> Sauce Stop </NavLink> </h1>
          <ul>
            <li> <NavLink exact to="/admin/dashboard">Admin Dashboard </NavLink> </li>
            <li> <NavLink exact to="/cart" onClick={this.findOrder}><FontAwesomeIcon icon={faShoppingCart} size="lg" /> My Cart </NavLink> </li>
            <li> <NavLink exact to="/" onClick={this.handleClick}><FontAwesomeIcon icon={faSignOutAlt} size="lg" /> Log out </NavLink> </li>
          </ul>
        </nav>
      }
    </div>
    );
  }
}

export default withRouter(NavBar);