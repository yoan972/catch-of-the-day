import React from 'react';
import {formatPrice } from '../helpers';

class Fish extends React.Component {

	handleClick = () => {
			this.props.addToOrder(this.props.index);
		}

	render() {
		const { image, name, price, desc , status } = this.props.details;
		const isAvaiblable = status === 'available';
		return (
			<li className="menu-fish">
				<img src={image} alt={name} />
				<h3 className="fish-name">{name}
					<span className="price">{formatPrice(price)}</span>
				</h3>
				<p>{desc}</p>
				<button disabled={!isAvaiblable} onClick={this.handleClick} >{isAvaiblable ? 'Add to cart' : 'Sold out' } </button>
			</li>
		);
	}
}

export default Fish;