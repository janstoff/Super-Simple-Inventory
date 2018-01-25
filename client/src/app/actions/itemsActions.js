import axios from 'axios'

export const FETCH_ITEMS = 'FETCH_ITEMS'
export const ADD_ITEM = 'ADD_ITEM'
export const CHANGE_ITEM_QUANTITY = 'CHANGE_ITEM_QUANTITY'


export const fetchItems = () => async dispatch => {
  const res = await axios.get('/api/items')

  dispatch({ type: FETCH_ITEMS, payload: res.data })
}


export const submitItem = (values, history) => async dispatch => {
  const res = await axios.post('/api/items', values)

  history.push('/items')
  dispatch({ type: ADD_ITEM, payload: res.data })
}

export const changeItemQuantity = (itemId, newQuantity) => dispatch => {
  //async action

  dispatch({ type: CHANGE_ITEM_QUANTITY, payload: { id: itemId, quantity: newQuantity } })
}
