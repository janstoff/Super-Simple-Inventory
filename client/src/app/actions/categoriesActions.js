import axios from 'axios'
import { HANDLE_ERROR } from './errorsActions'

export const FETCH_CATEGORIES = 'FETCH_CATEGORIES'
export const ADD_CATEGORY = 'ADD_CATEGORY'


export const fetchCategories = () => async dispatch => {
  let res
  try {
    res = await axios.get('/api/categories')
  } catch (error) {
    dispatch({ type: HANDLE_ERROR, payload: error })
  }

  if (res) { dispatch({ type: FETCH_CATEGORIES, payload: res.data }) }
}


export const submitCategory = (values, history) => async dispatch => {
  const res = await axios.post('/api/categories', values)

  history.push('/items')
  dispatch({ type: ADD_CATEGORY, payload: res.data })
}
