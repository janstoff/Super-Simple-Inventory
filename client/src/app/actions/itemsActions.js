import axios from 'axios'

export const FETCH_ITEMS = 'FETCH_ITEMS'
export const ADD_ITEM = 'ADD_ITEM'


export const fetchItems = () => async dispatch => {
  const res = await axios.get('/api/items')

  dispatch({ type: FETCH_ITEMS, payload: res.data })
}


export const submitItem = (values, history) => async dispatch => {
  const res = await axios.post('/api/items', values)

  history.push('/items')
  dispatch({ type: ADD_ITEM, payload: res.data })
}
