import { combineReducers } from 'redux'
import { reducer as formReducer } from 'redux-form'
import authReducer from './authReducer'
import itemsReducer from './itemsReducer'
import categoriesReducer from './categoriesReducer'
import warehousesReducer from './warehousesReducer'

export default combineReducers({
  auth: authReducer,
  form: formReducer,
  items: itemsReducer,
  categories: categoriesReducer,
  warehouses: warehousesReducer
})
