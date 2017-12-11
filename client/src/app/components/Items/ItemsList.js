// ItemsList fetches and displays items
import React, { Component } from 'react'
import { connect } from 'react-redux'
import PropTypes from 'prop-types'

import * as actions from '../../actions'

class ItemsList extends Component {
	static propTypes = {
		items: PropTypes.array
	}

	componentDidMount() {
		this.props.fetchItems()
	}

	render() {
		const { items } = this.props

		if(!items) {
			return <div>...Loading</div>
		}

		return items.map(item => {
			return (
				<div className="card blue-grey darken-1" key={item._id}>
					<div className="card-content white-text">
						<span className="card-title">{item.itemName}</span>
						<p>{item.category}</p>
            <p className="right">Changed on: {new Date(item.dateChanged).toLocaleDateString()}</p>
					</div>
					<div className="card-action">
						<a>Quantity: {item.quantity}</a>
						<a>Last Changed By: {item.lastChangedBy}</a>
					</div>
				</div>
			)
		})
	}
}

function mapStateToProps({ items }) {
	return { items }
}

export default connect(mapStateToProps, actions)(ItemsList)
