import axios from 'axios'

export const FETCH_WAREHOUSES = 'FETCH_WAREHOUSES'
export const ADD_WAREHOUSE = 'ADD_WAREHOUSE'


export const fetchWarehouses = () => async dispatch => {
  const res = await axios.get('/api/warehouses')

  dispatch({ type: FETCH_WAREHOUSES, payload: res.data })
}


export const submitWarehouse = (values, history) => async dispatch => {
  const res = await axios.post('/api/warehouses', values)

  history.push('/items')
  dispatch({ type: ADD_WAREHOUSE, payload: res.data })
}
