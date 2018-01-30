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
import ErrorHandler from '../../standard/ErrorHandler'

class Dashboard extends Component {
	static propTypes = {
		items: PropTypes.array,
		categories: PropTypes.array,
		warehouses: PropTypes.array,
		categoriesDropdownOptions: PropTypes.array,
		warehousesDropdownOptions: PropTypes.array,
		fetchItems: PropTypes.func,
		fetchCategories: PropTypes.func,
		fetchWarehouses: PropTypes.func,
		filteredCategory: PropTypes.string,
		handleSearchInput: PropTypes.func,
		clearFilters: PropTypes.func,
		error: PropTypes.object
	}

	componentDidMount() {
		const {
			items,
			categories,
			warehouses,
			fetchItems,
			fetchCategories,
			fetchWarehouses
		} = this.props

		if (items.length < 1) { fetchItems() }
		if (categories.length < 1) { fetchCategories() }
		if (warehouses.length < 1) { fetchWarehouses() }
	}

	render() {
		const {
			items,
			categories,
			categoriesDropdownOptions,
			warehousesDropdownOptions,
			handleSearchInput,
			handleFilterSelect,
			filteredCategory,
			error
		} = this.props

		const { filterText, warehouse, category, subcategory } = this.props.filters

		const filtering = () => {
			if (filterText || warehouse || category || subcategory) {
				return true
			}
		}

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

		if (error) {
			return <ErrorHandler/>
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
					</div>
					<div className="items-container">
						<div style={{ fontWeight: 600 }}>INVENTORY</div>
						<div className="search-bar-container">
							<SearchBar
								items={items}
								filterText={filterText}
								onSearchInput={handleSearchInput}
							/>
							<div className="clear-filter">
								{filtering() && (
									<button
										className="clear-filter-btn amber darken-4 white-text btn-flat "
										onClick={() => this.props.clearFilters()}
									>
										Clear Filters
									</button>
								)}
							</div>
						</div>
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

function mapStateToProps({ items, categories, warehouses, filters, error }) {
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
		warehouses,
		filteredCategory: filters.category,
		items: filteredByLocationAndCategoryAndSubcategory,
		categoriesDropdownOptions: categories.map(category => category.name),
		warehousesDropdownOptions: warehouses.map(warehouse => warehouse.name),
		filters,
		error
	}
}

export default connect(mapStateToProps, actions)(Dashboard)
