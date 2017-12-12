import { FETCH_WAREHOUSES, ADD_WAREHOUSE } from '../actions/warehousesActions'

export default function(state = [], action) {
  switch(action.type) {
    case FETCH_WAREHOUSES:
      return action.payload
    default:
      return state
  }
}
