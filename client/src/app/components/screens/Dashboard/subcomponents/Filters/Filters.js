import React, { Component } from 'react'
import { connect } from 'react-redux'
import { Button } from 'react-materialize'

import * as actions from '../../../../../actions'
import FilterWeb from './subcomponents/FilterWeb'
import FilterMobile from './subcomponents/FilterMobile'
import FilterToggleButton from '../../../../standard/FilterToggleButton'

class Filters extends Component {
	state = {
		showFilters: false
	}

	toggleFilters = () => {
		this.state.showFilters
			? this.setState({ showFilters: false })
			: this.setState({ showFilters: true })
	}

	render() {
		const {
			clearFilters,
			handleFilterSelect,
			lastviewed,
			lastViewedFilter,
			filters,
			warehousesDropdownOptions,
			categoriesDropdownOptions,
      filteredCategory,
      categories
		} = this.props

		const { filterText, warehouse, category, subcategory } = filters

		/* DETERMINE IF ANY KIND OF FILTER IS ACTIVE TO DISPLAY "CLEAR FILTER" BUTTON */
		const filtering = () => {
			if (
				filterText ||
				warehouse ||
				category ||
				subcategory ||
				lastViewedFilter
			) {
				return true
			}
		}

		/* GENERATE SUBCATEGORY DROPDOWN OPTIONS ARRAY BASED ON SELECTED CATEGORY */
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
			<div className="filters-container">
				<Button
					waves="light"
					className="filters-title black"
					style={{ fontWeight: 600, marginBottom: '10px' }}
					onClick={() => this.toggleFilters()}
				>
					FILTERS
					<i className="material-icons right">chevron_right</i>
				</Button>
				<div
					className="filters-modal"
					style={
						this.state.showFilters ? { display: 'block' } : { display: 'none' }
					}
				>
					{filtering() && (
						<Button
							waves="light"
							className="filter-button amber darken-4"
							style={{ marginBottom: '10px' }}
							onClick={() => this.props.clearFilters()}
						>
							Clear Filters
						</Button>
					)}
					{filtering() && (
						<hr style={{ size: 1, width: '30%', marginBottom: '10px' }} />
					)}
					{lastviewed.length > 0 && (
						<FilterToggleButton
							title="Last Viewed"
							className="filter-button"
							color="grey darken-4"
							filter={lastViewedFilter}
							onClick={() => {
								handleFilterSelect(
									'Last-Viewed',
									lastViewedFilter === true ? false : true
								)
							}}
						/>
					)}
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
			</div>
		)
	}
}

function mapStateToProps({
	categories,
	warehouses,
	filters,
	error,
	lastviewed
}) {
	return {
    categories,
		filteredCategory: filters.category,
		categoriesDropdownOptions: categories.map(category => category.name),
		warehousesDropdownOptions: warehouses.map(warehouse => warehouse.name),
		filters,
		lastviewed
	}
}

export default connect(mapStateToProps, actions)(Filters)
