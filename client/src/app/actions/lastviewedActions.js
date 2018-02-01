import { loadLastViewed, clearLastViewedStorage, saveLastViewed } from '../config/localStorage'

export const ADD_TO_LASTVIEWED = 'ADD_TO_LASTVIEWED'
export const POPULATE_LASTVIEWED = 'POPULATE_LASTVIEWED'

export const addToLastViewed = (viewed, updatedLastviewed) => dispatch => {
	dispatch({ type: ADD_TO_LASTVIEWED, payload: viewed })
  saveLastViewed(updatedLastviewed)
}

export const populateLastViewed = () => async dispatch => {
	const lastviewedFromLocalStorage = await loadLastViewed()

	dispatch({ type: POPULATE_LASTVIEWED, payload: lastviewedFromLocalStorage })

  // clearLastViewedStorage()
}
