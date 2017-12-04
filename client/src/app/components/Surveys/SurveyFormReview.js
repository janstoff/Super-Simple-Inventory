// Shows users their form inputs for review
import React from 'react'
import { connect } from 'react-redux'
import PropTypes from 'prop-types'
import { withRouter } from 'react-router-dom'

import formFields from './formFields'
import * as actions from '../../actions'

const SurveyFormReview = ({ onCancel, formValues, submitSurvey, history }) => {
	return (
		<div>
			<h5 style={{ marginBottom: 30 }}>Review your Survey before sending...</h5>
      <div style={{ marginBottom: 30 }}>
        {formFields.map(({ label, name }) => (
          <div key={name} style={{ marginBottom: 10 }}>
            <label>{label}</label>
            <div>{formValues[name]}</div>
          </div>
        ))}
      </div>
			<button className="yellow darken-3 white-text btn-flat" onClick={onCancel}>
				Back
			</button>
      <button className="green white-text btn-flat right " onClick={() => submitSurvey(formValues, history)}>
				Send
        <i className="material-icons right">email</i>
			</button>
		</div>
	)
}

SurveyFormReview.propTypes = {
	onCancel: PropTypes.func, // from SurveyNew
  formValues: PropTypes.object, //from reduxForm state
  submitSurvey: PropTypes.func,// from actions
  history: PropTypes.object // from withRouter
}

function mapStateToProps({ form }) {
  return {
    formValues: form.surveyForm.values
  }
}

export default connect(mapStateToProps, actions)(withRouter(SurveyFormReview))
