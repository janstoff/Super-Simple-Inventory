import React, { Component } from 'react'
import { Link } from 'react-router-dom'
import { connect } from 'react-redux'
import PropTypes from 'prop-types'
import escapeRegExp from 'escape-string-regexp'
import { Button } from 'react-materialize'

import * as actions from '../../../actions'
import Filters from './subcomponents/Filters/Filters'
import ItemsList from './subcomponents/ItemsList'
import SearchBar from '../../standard/SearchBar'
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
		error: PropTypes.object,
		addToLastViewed: PropTypes.func,
		populateLastViewed: PropTypes.func
	}

	componentDidMount() {
		const {
			items,
			categories,
			warehouses,
			fetchItems,
			fetchCategories,
			fetchWarehouses,
			lastviewed,
			populateLastViewed
		} = this.props

		/* ONLY FETCH ALL ONCE PER APP LOAD */
		if (items.length < 1) {
			fetchItems()
		}
		if (categories.length < 1) {
			fetchCategories()
		}
		if (warehouses.length < 1) {
			fetchWarehouses()
		}
		if (lastviewed.length < 1) {
			populateLastViewed()
		}
	}

	/* ON VIEWING AN ITEM ADD IT TO LASTVIEWED FOR FUTURE FAST SEARCH */
	onViewItem = id => {
		const { lastviewed } = this.props
		const viewed = {
			id: id,
			dateTime: Date.now()
		}
		const updatedLastviewed = [...lastviewed, viewed]

		this.props.addToLastViewed(viewed, updatedLastviewed)
	}

	render() {
		const {
			items,
			handleSearchInput,
			error,
			filters,
			lastviewed
		} = this.props

		const {
			filterText,
			lastViewedFilter
		} = this.props.filters

		/* GENERATE DISPLAYED ITEMS IF "LAST VIEWED" IS SELECTED */
		let filteredForLastViewedItems
		if (filters.lastViewedFilter) {
			const lastViewedIds = lastviewed.map(entry => entry.id)

			filteredForLastViewedItems = items.filter(item =>
				lastViewedIds.includes(item._id)
			)
		} else {
			filteredForLastViewedItems = items
		}

		/* GENERATE DISPLAYED ITEMS BASED SEARCH INPUT */
		let showingItems
		if (filterText) {
			const match = new RegExp(escapeRegExp(filterText), 'i' /*ignore case*/)
			showingItems = filteredForLastViewedItems.filter(item =>
				match.test(item.itemName)
			)
		} else {
			showingItems = filteredForLastViewedItems
		}

		/* IN CASE OF A FETCHING ERROR DISPLAY ERROR MESSAGE AND RELOAD BUTTON*/
		if (error) {
			return <ErrorHandler />
		}

		return (
			<div>
				<div className="dashboard-body">
					<Filters />
					<div className="items-container">
						<div style={{ fontWeight: 600 }}>INVENTORY</div>
						<div className="search-bar-container">
							<SearchBar
								items={items}
								filterText={filterText}
								onSearchInput={handleSearchInput}
							/>
						</div>
						<ItemsList items={showingItems} onViewItem={this.onViewItem} />
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

function mapStateToProps({
	items,
	categories,
	warehouses,
	filters,
	error,
	lastviewed
}) {
	
	/* GENERATE ITEMS ARRAY BASED ON ACTIVE FILTERS */
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
		items: filteredByLocationAndCategoryAndSubcategory,
		filters,
		error,
		lastviewed
	}
}

export default connect(mapStateToProps, actions)(Dashboard)
