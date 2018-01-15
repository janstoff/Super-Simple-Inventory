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
				<p className="item-list-header" style={{ color: '#d4d2d2' }}>
					<i className="item-property" style={{ fontWeight: 600 }}>item</i>
					<i className="item-property">category</i>
					<i className="item-property">location</i>
					<i className="item-property">usage</i>
					<i className="item-quantity" style={{ fontWeight: 500 }}>quantity</i>
				</p>
				<Collection>
					{items.map(item => {
						return (
							<CollectionItem
								key={item._id}
								style={
									item.rental ? { background: '#e7ecf4' } : { background: '#fff' }
								}
							>
								<i className="item-property" style={{ fontWeight: 600 }}>{item.itemName}</i>
								<i className="item-property">{item.category}</i>
								<i className="item-property">{item.warehouse}</i>
								<i className="item-property" style={{ color: '#8a9dbd' }}>{item.rental ? 'rental' : ''}</i>
								<i className="item-quantity" style={{ fontWeight: 500 }}>{item.quantity}</i>
							</CollectionItem>
						)
					})}
				</Collection>
		  </div>
		)
	}
}

export default ItemsList
