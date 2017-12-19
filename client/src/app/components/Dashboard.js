import React, { Component } from 'react'
import { Link } from 'react-router-dom'
import { connect } from 'react-redux'
import PropTypes from 'prop-types'

import * as actions from '../actions'
import ItemsList from './Items/ItemsList'
import ButtonSelectFilter from './Filter/ButtonSelectFilter'

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
				<div className="dashboard-body">
					<div className="filter-container">
						<ButtonSelectFilter
							title="Locations"
							filterItems={warehouses}
							buttonColor="brown darken-1"
							editButtonColor="brown lighten-4"
							editRoute="/warehouses"
						/>
						<ButtonSelectFilter
							title="Categories"
							filterItems={categories}
							buttonColor="cyan darken-3"
							editButtonColor="cyan lighten-4"
							editRoute="/categories"
						/>
					</div>
					<div className="items-list">
						<ItemsList items={items} />
					</div>
				</div>
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
		categories: categories.map(category => category.name),
		warehouses: warehouses.map(warehouse => warehouse.name)
	}
}

export default connect(mapStateToProps, actions)(Dashboard)
