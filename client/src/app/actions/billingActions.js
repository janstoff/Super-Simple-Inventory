import axios from 'axios'

export const FETCH_USER = 'FETCH_USER'

export const handleToken = (token) => async dispatch => {
  const res = await axios.post('/api/stripe', token)

  dispatch({ type: FETCH_USER, payload: res.data })
}
