export const HANDLE_SEARCH = 'HANDLE_SEARCH'
export const HANDLE_LOCATION_SELECT = 'HANDLE_LOCATION_SELECT'
export const HANDLE_CATEGORY_SELECT = 'HANDLE_CATEGORY_SELECT'
export const HANDLE_SUBCATEGORY_SELECT = 'HANDLE_SUBCATEGORY_SELECT'

export const handleSearchInput = searchTerm => dispatch => {
	dispatch({ type: HANDLE_SEARCH, payload: searchTerm })
}

export const handleFilterSelect = (filter, filterValue) => dispatch => {
	if (filter === 'Locations') {
		dispatch({ type: HANDLE_LOCATION_SELECT, payload: filterValue })
	}
	if (filter === 'Categories') {
		dispatch({ type: HANDLE_CATEGORY_SELECT, payload: filterValue })
	}
	if (filter === 'Subcategories') {
		dispatch({ type: HANDLE_SUBCATEGORY_SELECT, payload: filterValue })
	}
}
