import {
	HANDLE_SEARCH,
	HANDLE_LOCATION_SELECT,
	HANDLE_CATEGORY_SELECT,
	HANDLE_SUBCATEGORY_SELECT,
	HANDLE_LASTVIEWED_SELECT,
	CLEAR_FILTERS
} from '../actions/filtersActions'

const initialState = {
	filterText: '',
	warehouse: '',
	category: '',
	subcategory: '',
	lastViewedFilter: false
}

export default function(state = initialState, action) {
	switch (action.type) {
		case HANDLE_SEARCH:
			return {
				...state,
				filterText: action.payload
			}
		case HANDLE_LOCATION_SELECT:
			return {
				...state,
				warehouse: action.payload
			}
		case HANDLE_CATEGORY_SELECT:
			return {
				...state,
				category: action.payload
			}
		case HANDLE_SUBCATEGORY_SELECT:
			return {
				...state,
				subcategory: action.payload
			}
		case HANDLE_LASTVIEWED_SELECT:
			return {
				...state,
				lastViewedFilter: action.payload
			}
		case CLEAR_FILTERS:
			return {
				...state,
				filterText: action.payload,
				warehouse: action.payload,
				category: action.payload,
				subcategory: action.payload,
				lastViewedFilter: false
			}
		default:
			return state
	}
}
