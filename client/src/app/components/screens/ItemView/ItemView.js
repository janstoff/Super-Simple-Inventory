import React, { Component } from 'react'
import { connect } from 'react-redux'
import PropTypes from 'prop-types'

import * as actions from '../../../actions'

class ItemView extends Component {
	static propTypes = {
		item: PropTypes.object
	}

	render() {
		const { item, changeItemQuantity } = this.props

		if (!item) {
			<div>You have not selected an item.</div>
		}

		return (
			<div className="item-view">
				<div>{item.itemName}</div>
				<input
					labelvalue={item.quantity}
					onChange={(event) => changeItemQuantity(event.target.value)}
				/>
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
