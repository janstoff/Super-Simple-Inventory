import { FETCH_ITEMS, ADD_ITEM } from '../actions/itemsActions'

export default function(state = [], action) {
  switch(action.type) {
    case FETCH_ITEMS:
      return action.payload
    case ADD_ITEM:
      return [
        ...state, action.payload
      ]
    default:
      return state
  }
}
