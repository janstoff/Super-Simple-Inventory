import axios from 'axios'

export const FETCH_WAREHOUSES = 'FETCH_WAREHOUSES'
export const EDIT_WAREHOUSES = 'EDIT_WAREHOUSES'


export const fetchWarehouses = () => async dispatch => {
  const res = await axios.get('/api/warehouses')

  dispatch({ type: FETCH_WAREHOUSES, payload: res.data })
}


export const editWarehouses = (values) => async dispatch => {
  const res = await axios.post('/api/warehouses', values)
  
  dispatch({ type: EDIT_WAREHOUSES, payload: res.data })
}
