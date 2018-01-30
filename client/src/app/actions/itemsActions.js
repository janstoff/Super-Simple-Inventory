import axios from 'axios'
import { HANDLE_ERROR } from './errorsActions'

export const FETCH_ITEMS = 'FETCH_ITEMS'
export const ADD_ITEM = 'ADD_ITEM'
export const CHANGE_ITEM_QUANTITY = 'CHANGE_ITEM_QUANTITY'


export const fetchItems = () => async dispatch => {
  let res
  try {
    res = await axios.get('/api/items')
  } catch (error) {
    dispatch({ type: HANDLE_ERROR, payload: error })
  }
  if (res) {
    dispatch({ type: FETCH_ITEMS, payload: res.data })
  }
}


export const submitItem = (values, history) => async dispatch => {
  const res = await axios.post('/api/items', values)

  history.push('/items')
  dispatch({ type: ADD_ITEM, payload: res.data })
}

export const changeItemQuantity = (id, quantity) => dispatch => {
  //async action

  dispatch({ type: CHANGE_ITEM_QUANTITY, payload: { id, quantity } })
}
