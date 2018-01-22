export const HANDLE_SEARCH = 'HANDLE_SEARCH'
export const HANDLE_LOCATION_SELECT = 'HANDLE_LOCATION_SELECT'
export const HANDLE_CATEGORY_SELECT = 'HANDLE_CATEGORY_SELECT'
export const HANDLE_SUBCATEGORY_SELECT = 'HANDLE_SUBCATEGORY_SELECT'
export const CLEAR_FILTERS = 'CLEAR_FILTERS'

export const handleSearchInput = searchTerm => dispatch => {
	dispatch({ type: HANDLE_SEARCH, payload: searchTerm })
}

export const handleFilterSelect = (filter, filterValue) => dispatch => {
	if (filter === 'Location') {
		dispatch({ type: HANDLE_LOCATION_SELECT, payload: filterValue })
	}
	if (filter === 'Category') {
		dispatch({ type: HANDLE_CATEGORY_SELECT, payload: filterValue })
	}
	if (filter === 'Sub-Category') {
		dispatch({ type: HANDLE_SUBCATEGORY_SELECT, payload: filterValue })
	}
}

export const clearFilters = () => dispatch => {
	dispatch({ type: CLEAR_FILTERS, payload: '' })
}
