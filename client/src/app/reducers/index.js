import { combineReducers } from 'redux'
import { reducer as formReducer } from 'redux-form'
import authReducer from './authReducer'
import itemsReducer from './itemsReducer'
import categoriesReducer from './categoriesReducer'
import warehousesReducer from './warehousesReducer'
import filtersReducer from './filtersReducer'
import errorsReducer from './errorsReducer'
import lastviewedReducer from './lastviewedReducer'

export default combineReducers({
  auth: authReducer,
  form: formReducer,
  items: itemsReducer,
  categories: categoriesReducer,
  warehouses: warehousesReducer,
  filters: filtersReducer,
  error: errorsReducer,
  lastviewed: lastviewedReducer
})
