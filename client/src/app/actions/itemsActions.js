import axios from 'axios'

export const FETCH_USER = 'FETCH_USER'
export const FETCH_ITEMS = 'FETCH_ITEMS'


export const fetchItems = () => async dispatch => {
  const res = await axios.get('/api/items')

  dispatch({ type: FETCH_ITEMS, payload: res.data })
}


export const submitItem = (values, history) => async dispatch => {
  const res = await axios.post('/api/items', values)

  history.push('/items')
  dispatch({ type: FETCH_USER, payload: res.data })
}
