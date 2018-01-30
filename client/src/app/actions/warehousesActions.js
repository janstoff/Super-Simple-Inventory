import axios from 'axios'
import { HANDLE_ERROR } from './errorsActions'

export const FETCH_WAREHOUSES = 'FETCH_WAREHOUSES'
export const EDIT_WAREHOUSES = 'EDIT_WAREHOUSES'


export const fetchWarehouses = () => async dispatch => {
  let res
  try{
    res = await axios.get('/api/warehouses')
  } catch (error) {
    dispatch({ type: HANDLE_ERROR, payload: error})
  }
  if (res) {
    dispatch({ type: FETCH_WAREHOUSES, payload: res.data })
  }
}


export const editWarehouses = (values) => async dispatch => {
  const res = await axios.post('/api/warehouses', values)

  dispatch({ type: EDIT_WAREHOUSES, payload: res.data })
}
