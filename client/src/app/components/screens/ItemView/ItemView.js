import React, { Component } from 'react'
import { connect } from 'react-redux'
import PropTypes from 'prop-types'
import { Button } from 'react-materialize'

import * as actions from '../../../actions'

class ItemView extends Component {
	static propTypes = {
		item: PropTypes.object
	}

	state = {
		changeItemQuantityBy: 1
	}

	newChangeByValue = (event) => {
		this.setState({ changeItemQuantityBy: Number(event.target.value) })
	}

	render() {
		const { item, changeItemQuantity, history } = this.props
		const { changeItemQuantityBy } = this.state

		if (!item) {
			<div>You have not selected an item.</div>
		}

		return (
			<div className="item-view">
				<div className="item-name-quantity">
					<div style={{ flex: 1, fontSize: 18, fontWeight: 600, margin: '2%' }}>{item.itemName}</div>
					<div style={{ flex: 1, fontSize: 18, fontWeight: 300, margin: '2%' }}>location: {item.warehouse}</div>
					<div style={{ flex: 1, fontSize: 16, fontWeight: 500, margin: '2%' }}>quantity: {item.quantity}</div>
				</div>
				<div>
					<input
						label="quantity"
						style={{ width: '20%', margin: '2%' }}
						value={changeItemQuantityBy}
						onChange={this.newChangeByValue}
					/>
					<Button
						waves="light"
						className="green accent-4"
						style={{ marginRight: '2%' }}
						onClick={() => changeItemQuantity(item._id, changeItemQuantityBy)}
						>Add
						<i className="material-icons left">keyboard_arrow_up</i>
					</Button>
					<Button
						className="red darken-3"
						onClick={() => changeItemQuantity(item._id, -changeItemQuantityBy)}
						>Take
						<i className="material-icons right">keyboard_arrow_down</i>
					</Button>
				</div>
				<Button
					className="grey darken-2"
					style={{ marginTop: '5%' }}
					onClick={() => history.goBack()}
					>Back
					<i className="material-icons left">arrow_back</i>
				</Button>
			</div>
		)
	}
}

function mapStateToProps({ items }, ownProps) {
	return {
		item: items.filter(item => item._id === ownProps.match.params.id)[0]
	}
}

export default connect(mapStateToProps, actions)(ItemView)
