// ItemsList displays items
import React, { Component } from 'react'
import PropTypes from 'prop-types'

class ItemsList extends Component {
	static propTypes = {
		items: PropTypes.array
	}

	render() {
		const { items } = this.props

		if (!items) {
			return <div>...Loading</div>
		}

		return (
			<ul className="collection">
				{items.map(item => {
					return (
						<li
							className="collection-item"
							key={item._id}
							style={
								item.rental ? { background: '#e7ecf4' } : { background: '#fff' }
							}
						>
							<i style={{ fontWeight: 600 }}>{item.itemName}</i>
							<i>{item.category}</i>
							<i>{item.warehouse}</i>
							<i style={{ color: '#8a9dbd' }}>{item.rental ? 'rental' : ''}</i>
							<i style={{ fontWeight: 500 }}>{item.quantity}</i>
						</li>
					)
				})}
			</ul>
		)
	}
}

export default ItemsList
