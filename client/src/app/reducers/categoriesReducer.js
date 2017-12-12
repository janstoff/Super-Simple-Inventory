import { FETCH_CATEGORIES, ADD_CATEGORY } from '../actions/categoriesActions'

export default function(state = [], action) {
  switch(action.type) {
    case FETCH_CATEGORIES:
      return action.payload
    default:
      return state
  }
}
