import { HANDLE_SEARCH } from '../actions/filtersActions'
import { HANDLE_LOCATION_SELECT } from '../actions/filtersActions'
import { HANDLE_CATEGORY_SELECT } from '../actions/filtersActions'
import { HANDLE_SUBCATEGORY_SELECT } from '../actions/filtersActions'
import { CLEAR_FILTERS } from '../actions/filtersActions'

const initialState = {
	filterText: '',
	warehouse: '',
	category: '',
	subcategory: ''
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
		case CLEAR_FILTERS:
		return {
			...state,
			filterText: action.payload,
			warehouse: action.payload,
			category: action.payload,
			subcategory: action.payload
		}
		default:
			return state
	}
}
