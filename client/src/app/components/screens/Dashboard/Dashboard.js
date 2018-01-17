import React, { Component } from 'react'
import { Link } from 'react-router-dom'
import { connect } from 'react-redux'
import PropTypes from 'prop-types'
import escapeRegExp from 'escape-string-regexp'
import sortBy from 'sort-by'

import * as actions from '../../../actions'
import ItemsList from './subcomponents/ItemsList'
import SearchBar from '../../standard/SearchBar'
import FilterWeb from './subcomponents/FilterWeb'
import FilterMobile from './subcomponents/FilterMobile'

class Dashboard extends Component {
	static propTypes = {
		items: PropTypes.array,
		warehouses: PropTypes.array,
		categories: PropTypes.array,
		fetchItems: PropTypes.func,
		fetchCategories: PropTypes.func,
		fetchWarehouses: PropTypes.func,
		filters: PropTypes.object,
		handleSearchInput: PropTypes.func,
		clearFilters: PropTypes.func
	}

	componentDidMount() {
		this.props.fetchItems()
		this.props.fetchCategories()
		this.props.fetchWarehouses()
	}

	render() {
		const {
			items,
			categories,
			warehouses,
			handleSearchInput,
			handleFilterSelect
		} = this.props

		const { filterText, warehouse, category } = this.props.filters

		let showingItems
		if (filterText) {
			const match = new RegExp(escapeRegExp(filterText), 'i' /*ignore case*/)
			showingItems = items.filter(item => match.test(item.itemName))
		} else {
			showingItems = items
		}

		return (
			<div>
				<div className="dashboard-body">
					<div className="filters-container">
						<FilterWeb
							warehouses={warehouses}
							categories={categories}
							onFilterSelect={handleFilterSelect}
						/>
						<FilterMobile
							warehouses={warehouses}
							categories={categories}
							onFilterSelect={handleFilterSelect}
						/>
						{/* <div className="clear-filter">
							{filterText || warehouse || category && (
									<button className="red white-text btn-flat " onClick={() => this.props.clearFilters()}>
										Clear Filters
									</button>
								)
							}
						</div> */}
					</div>
					<div className="items-container">
						<div style={{ fontWeight: 600 }}>INVENTORY</div>
						<SearchBar
							className="search-bar"
							items={items}
							filterText={filterText}
							onSearchInput={handleSearchInput}
						/>
						<ItemsList items={showingItems} />
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

function mapStateToProps({ items, categories, warehouses, filters }) {
	let filteredByLocation
	if (filters.warehouse) {
		filteredByLocation = items.filter(
			item => item.warehouse === filters.warehouse
		)
	} else {
		filteredByLocation = items
	}

	let filteredByLocationAndCategory
	if (filters.category) {
		filteredByLocationAndCategory = filteredByLocation.filter(
			item => item.category === filters.category
		)
	} else {
		filteredByLocationAndCategory = filteredByLocation
	}

	let filteredByLocationAndCategoryAndSubcategory
	if (filters.category && filters.subcategory) {
		filteredByLocationAndCategoryAndSubcategory = filteredByLocationAndCategory.filter(
			item => item.subcategory === filters.subcategory
		)
	} else {
		filteredByLocationAndCategoryAndSubcategory = filteredByLocationAndCategory
	}

	return {
		items: filteredByLocationAndCategoryAndSubcategory,
		categories: categories.map(category => category.name),
		warehouses: warehouses.map(warehouse => warehouse.name),
		filters
	}
}

export default connect(mapStateToProps, actions)(Dashboard)
