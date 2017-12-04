import axios from 'axios'

export const FETCH_USER = 'FETCH_USER'

export const submitSurvey = (values, history) => async dispatch => {
  const res = await axios.post('/api/surveys', values)

  history.push('/surveys')
  dispatch({ type: FETCH_USER, payload: res.data })
}
