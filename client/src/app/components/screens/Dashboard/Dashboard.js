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
		categories: PropTypes.array,
		categoriesDropdownOptions: PropTypes.array,
		warehousesDropdownOptions: PropTypes.array,
		fetchItems: PropTypes.func,
		fetchCategories: PropTypes.func,
		fetchWarehouses: PropTypes.func,
		filteredCategory: PropTypes.string,
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
			categoriesDropdownOptions,
			warehousesDropdownOptions,
			handleSearchInput,
			handleFilterSelect,
			filteredCategory
		} = this.props

		const { filterText } = this.props.filters

		let showingItems
		if (filterText) {
			const match = new RegExp(escapeRegExp(filterText), 'i' /*ignore case*/)
			showingItems = items.filter(item => match.test(item.itemName))
		} else {
			showingItems = items
		}

		let subcategoriesDropdownOptions
		if (filteredCategory) {
			subcategoriesDropdownOptions = categories
				.filter(category => category.name === filteredCategory)
				.map(category => category.subcategories)[0] //[0] to 'remove' outer array bracket
				.map(subcategory => subcategory.name)
		} else {
			subcategoriesDropdownOptions = []
		}

		return (
			<div>
				<div className="dashboard-body">
					<div className="filters-container">
						<FilterWeb
							warehouses={warehousesDropdownOptions}
							categories={categoriesDropdownOptions}
							subcategories={subcategoriesDropdownOptions}
							onFilterSelect={handleFilterSelect}
						/>
						<FilterMobile
							warehouses={warehousesDropdownOptions}
							categories={categoriesDropdownOptions}
							subcategories={subcategoriesDropdownOptions}
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
		categories,
		filteredCategory: filters.category,
		items: filteredByLocationAndCategoryAndSubcategory,
		categoriesDropdownOptions: categories.map(category => category.name),
		warehousesDropdownOptions: warehouses.map(warehouse => warehouse.name),
		filters
	}
}

export default connect(mapStateToProps, actions)(Dashboard)
