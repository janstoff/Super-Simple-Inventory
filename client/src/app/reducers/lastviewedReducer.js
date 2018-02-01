import { ADD_TO_LASTVIEWED, POPULATE_LASTVIEWED } from '../actions/lastviewedActions'

export default function(state = [], action) {
  switch(action.type) {
    case POPULATE_LASTVIEWED:
      return action.payload || []
    case ADD_TO_LASTVIEWED:
      return [ ...state, action.payload ]
    default:
      return state
  }
}
