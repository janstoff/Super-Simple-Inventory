import axios from 'axios'

export const FETCH_CATEGORIES = 'FETCH_CATEGORIES'
export const ADD_CATEGORY = 'ADD_CATEGORY'


export const fetchCategories = () => async dispatch => {
  const res = await axios.get('/api/categories')

  dispatch({ type: FETCH_CATEGORIES, payload: res.data })
}


export const submitCategory = (values, history) => async dispatch => {
  const res = await axios.post('/api/categories', values)

  history.push('/items')
  dispatch({ type: ADD_CATEGORY, payload: res.data })
}
