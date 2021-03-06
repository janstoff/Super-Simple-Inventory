import { FETCH_ITEMS, ADD_ITEM, CHANGE_ITEM_QUANTITY } from '../actions/itemsActions'

export default function(state = [], action) {
  switch(action.type) {
    case FETCH_ITEMS:
      return action.payload
    case ADD_ITEM:
      return [
        ...state, action.payload
      ]
    case CHANGE_ITEM_QUANTITY:
      return state.map(item => {
        if (item._id !== action.payload.id) {
          return item
        }
        return {
          ...item,
          quantity: item.quantity + action.payload.quantity
        }
      })
    default:
      return state
  }
}
