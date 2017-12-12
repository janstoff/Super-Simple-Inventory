import React, { Component } from 'react'
import { Link } from 'react-router-dom'
import { connect } from 'react-redux'
import PropTypes from 'prop-types'

import * as actions from '../actions'
import ItemsList from './Items/ItemsList'
import WarehouseFilter from './Warehouses/WarehouseFilter'

class Dashboard extends Component {
	static propTypes = {
		warehouses: PropTypes.array,
    fetchItems: PropTypes.func,
		fetchCategories: PropTypes.func,
		fetchWarehouses: PropTypes.func
	}

  componentDidMount() {
		this.props.fetchItems()
		this.props.fetchCategories()
		this.props.fetchWarehouses()
	}

	render() {
		const { items, categories, warehouses } = this.props

		return (
			<div>
        <WarehouseFilter warehouses={warehouses} />
				<ItemsList items={items} />
				<div className="fixed-action-btn">
					<Link to="/items/new" className="btn-floating btn-large red">
						<i className="material-icons">add</i>
					</Link>
				</div>
			</div>
		)
	}
}

function mapStateToProps({ items, categories, warehouses }) {
  return {
    items,
    categories,
    warehouses
  }
}

export default connect(mapStateToProps, actions)(Dashboard)
