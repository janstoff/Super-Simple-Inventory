import { HANDLE_ERROR } from '../actions/errorsActions'

const initialState = null

export default function(state = initialState, action) {
	switch (action.type) {
		case HANDLE_ERROR:
			return action.payload
		default:
			return state
	}
}
