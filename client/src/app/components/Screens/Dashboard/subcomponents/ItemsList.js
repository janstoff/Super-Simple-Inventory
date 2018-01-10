// ItemsList displays a collection of items
import React, { Component } from 'react'
import PropTypes from 'prop-types'
import { Collection, CollectionItem } from 'react-materialize'

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
			<div>
				<p style={{ fontWeight: 600 }}>INVENTORY</p>
				<Collection>
					{items.map(item => {
						return (
							<CollectionItem
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
							</CollectionItem>
						)
					})}
				</Collection>
		  </div>
		)
	}
}

export default ItemsList