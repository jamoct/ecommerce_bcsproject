import React from "react";
import { NavLink, withRouter } from "react-router-dom";
import '../App.css';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faShoppingCart, faSignInAlt, faSignOutAlt } from '@fortawesome/free-solid-svg-icons';
import Axios from 'axios';

class NavBar extends React.Component {

  state = {
    /*length: localStorage.length,
    token: localStorage.getItem('token'),
    itemtotal: localStorage.getItem('ItemTotal'),
    paid: localStorage.getItem('Paid')*/
    length: 0,
    token: '',
    itemtotal: '',
    paid: '',
    orderId: ''
  }

  handleClick = e => {
    localStorage.clear();
    this.props.history.push('/');
  }

  findOrder = async orderid => {
    try {
      //let orderid = localStorage.getItem('OrderId');
      let orderid = this.state.orderId;
      const res = await Axios.get(`http://localhost:3030/admin/orders/id/${orderid}`);
      if (res.data.length !== 0 && (res.data.paidStatus === "true" || orderid !== '')) {
        //console.log(res);
        /*localStorage.setItem('CartTotal', 0);
        localStorage.setItem('ItemTotal', 0);
        localStorage.setItem('Paid', 'false');
        localStorage.setItem('PaymentTotal', 0);
        localStorage.setItem('Shipping', 0);
        localStorage.setItem('OrderId', "");*/
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
        {this.state.token === "undefined" || this.state.token === "" /*|| localStorage.length === 0 || localStorage.email === "undefined" || localStorage.id === "undefined" || localStorage.id === ""*/ ? 
        <nav id="nav-bar">
          <h1> <NavLink exact to="/"> Sauce Stop </NavLink> </h1>
          <ul>
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