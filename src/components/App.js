import React from 'react';
import Header from './Header';
import Order from './Order';
import Inventory from './Inventory';
import fishes from '../sample-fishes';
import Fish from './Fish';
import base from '../base';

class App extends React.Component {
	state = {
		fishes: {},
		order: {}
	};
	componentDidMount() {
		const { params } = this.props.match;
		const localStorageRef = localStorage.getItem(params.storeId);
		if (localStorageRef) {
			this.setState({order : JSON.parse(localStorageRef)});
		}
		this.ref = base.syncState(`${params.storeId}/fishes`,{
			context: this,
			state: 'fishes'
		});
	};
	componentWillUnmount() {
		base.removeBinding(this.ref);
	};
	componentDidUpdate() {
		localStorage.setItem(this.props.match.params.storeId,
			JSON.stringify(this.state.order));
	};
	addFish = fish => {
		const fishes = {...this.state.fishes};
		fishes[`fish${Date.now()}`] = fish;
		this.setState({fishes});
	};
	updateFish = (key, updateFish) => {
		const fishes = {...this.state.fishes};
		fishes[key] = updateFish;
		this.setState({fishes});
	};
	deleteFish = (key) => {
		const fishes = {...this.state.fishes};
		fishes[key] = null;
		this.setState({fishes});
	};
	loadSampleFishes = () => {
		this.setState({fishes});
	};

	addToOrder = key => {
		const order = {...this.state.order};
		order[key] = order[key] + 1 || 1 ;
		this.setState({order});
	};
	removeFromOrder = key => {
		const order = {...this.state.order};
		delete order[key]; 
		this.setState({order});
	};
	render() {
		return (
			<div className="catch-of-the-day">
				<div className="menu">
					<Header tagline="Fresh Seafood Market" />
					<ul className="fishes"> 
						{Object.keys(this.state.fishes).map(key => <Fish key={key} details={this.state.fishes[key]} addToOrder={this.addToOrder} index={key} />)}
					</ul>
				</div>			
				<Order fishes={this.state.fishes} order={this.state.order} removeFromOrder={this.removeFromOrder} />
				<Inventory addFish={this.addFish} updateFish={this.updateFish} deleteFish={this.deleteFish} loadSampleFishes={this.loadSampleFishes} fishes={this.state.fishes} storeId={this.props.match.params.storeId}/>			
			</div>
		);
	}
}

export default App;