import React, {Component} from 'react';
import './App.css';
import {BrowserRouter as Router, Route } from "react-router-dom";
import Home from './Components/Home';
import RegisterAdmin from './Components/RegisterAdmin';
import LoginAdmin from './Components/LoginAdmin';
import AdminDashboard from './Components/AdminDashboard';
import AddProduct from './Components/AddProduct';
import UpdateProduct from './Components/UpdateProduct';
import Cart from './Components/Cart';
import Checkout from './Components/Checkout';
import OrderSummary from './Components/OrderSummary';
import Axios from 'axios';

export default class App extends Component {
  
  state = {
    products: [],
    cartProducts: [],
    cartData: [],
    isLoggedInAdmin: false,
    isLoggedInUser: false,
    userId: ''
  }

  componentDidMount () {
    this.getProducts();
    this.getCartData();
    this.getCartProducts();
    let id = localStorage.getItem('id');
    if (id === undefined) return localStorage.clear();
  }

  getProducts = async () => {
    try {
      let response = await Axios.get(`http://localhost:3030/products`);
      //console.log(response);
      this.setState({products: response.data});
    }
    catch(e) {
      console.log(e);
    }
  }

  getCartData = async () => {
    try {
      let userId = localStorage.getItem('id');
      //let userId = this.state.userId;
      let response = await Axios.get(`http://localhost:3030/cart/${userId}`);
      this.setState({cartData: response.data});
      console.log(this.state.cartData);
    }
    catch(e) {
      console.log(e);
    }
  }

  getCartProducts = async () => {
    try {
      let userId = localStorage.getItem('id');
      //let userId = this.state.userId;
      let response = await Axios.get(`http://localhost:3030/cart/${userId}`);
      this.setState({cartData: response.data});
      let {cartData} = this.state, tempCart = [];
      for (var i=0; i<cartData.length; i++) {
        const resProduct = await Axios.get(`http://localhost:3030/products/${cartData[i].productId}`);
        tempCart.push(resProduct.data);
      }
      this.setState({cartProducts: tempCart});
      console.log(this.state.cartProducts);
    }
    catch(e) {
      console.log(e);
    }
  }

  checkAdminLoggedIn = log => {
    this.setState({isLoggedInAdmin: log});
  }

  render () {
     return (
      <Router>
        <div>
          <Route exact path="/" render={
            props => <Home {...props} products={this.state.products}/>
            //() => {this.state.isLoggedInAdmin ? (<Redirect to="/admin/dashboard"/>) : (<Home/>)}
          }/>
          <Route path="/admin/login" component={LoginAdmin}/>
          <Route path="/admin/register" component={RegisterAdmin}/>
          <Route path="/admin/dashboard" render={
            props => <AdminDashboard {...props} 
              isLoggedInAdmin={this.state.isLoggedInAdmin}
              checkAdminLoggedIn={this.checkAdminLoggedIn}
              products={this.state.products}
              getProducts={this.getProducts}
              getCartProducts={this.getCartProducts}/>
          }/>
          <Route path="/admin/dashboard/add-product" render={
            props => <AddProduct {...props} getProducts={this.getProducts}/>
          }/>
          <Route path="/admin/dashboard/update-product" render={
            props => <UpdateProduct {...props} getProducts={this.getProducts}/>
          }/>
          <Route path="/cart" render={
            props => <Cart {...props} 
              cartProducts={this.state.cartProducts}
              getCartProducts={this.getCartProducts}
              cartData={this.state.cartData}
              getCartData={this.getCartData}/>
          }/>
          <Route path="/checkout" render={
            props => <Checkout {...props} 
              cartProducts={this.state.cartProducts}
              getCartProducts={this.getCartProducts}
              cartData={this.state.cartData}/>
          }/>
          <Route path="/review" component={OrderSummary}/>
        </div>
      </Router>
    );
  }
 
}