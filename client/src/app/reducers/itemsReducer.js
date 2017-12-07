import { FETCH_ITEMS } from '../actions/itemsActions'

export default function(state = [], action) {
  switch(action.type) {
    case FETCH_ITEMS:
      return action.payload
    default:
      return state
  }
}
