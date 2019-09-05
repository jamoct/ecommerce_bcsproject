import React, { Component } from 'react';
import Axios from 'axios';
import {withRouter} from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faTrash } from '@fortawesome/free-solid-svg-icons';

class DeleteProduct extends Component {

	state = {
		message: ''
	}

	handleDelete = async e => {
		try {
			const res = await Axios.post(`http://localhost:3030/admin/products/delete`, {
				_id: this.props.id
			})
			console.log(res);
			this.setState({message: 'Item successfully deleted.'});
			this.props.getProducts();
			//if (res.data.ok) return setTimeout(()=> window.location.reload(), 1000);
		}
		catch(e){
			console.log(e);
		}
	}


	render () {
		return (
			<div style={{textAlign: "right"}}>
				<button className="productCard" onClick={this.handleDelete} style={style.button}>
					<FontAwesomeIcon icon={faTrash} size="lg"/> Delete
				</button>
			</div>
		);
	}
}

export default withRouter(DeleteProduct);

const style = {
	button: {
		border: "none",
		backgroundColor: "transparent",
		cursor: "pointer"
	}
}