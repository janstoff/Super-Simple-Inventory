import axios from 'axios'

export const FETCH_USER = 'FETCH_USER'
export const FETCH_SURVEYS = 'FETCH_SURVEYS'


export const fetchSurveys = () => async dispatch => {
  const res = await axios.get('/api/surveys')

  dispatch({ type: FETCH_SURVEYS, payload: res.data })
}


export const submitSurvey = (values, history) => async dispatch => {
  const res = await axios.post('/api/surveys', values)

  history.push('/surveys')
  dispatch({ type: FETCH_USER, payload: res.data })
}
