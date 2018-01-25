import { FETCH_WAREHOUSES, EDIT_WAREHOUSES } from '../actions/warehousesActions'

export default function(state = [], action) {
  switch(action.type) {
    case FETCH_WAREHOUSES:
      return action.payload
    case EDIT_WAREHOUSES:
      return action.payload
    default:
      return state
  }
}
