// SurveyNew shows a survey input form and a review form
import React, { Component } from 'react'
import { reduxForm } from 'redux-form'

import SurveyForm from './SurveyForm'
import SurveyFormReview from './SurveyFormReview'

class SurveyNew extends Component {
	state = { showFormReview: false }

	render() {
		if (this.state.showFormReview) {
			return (
				<SurveyFormReview
					onCancel={() => this.setState({ showFormReview: false })}
				/>
			)
		}

		return (
			<SurveyForm
				onSurveySubmit={() => this.setState({ showFormReview: true })}
			/>
		)
	}
}

export default reduxForm({
	form: 'surveyForm'
	// destroyOnUnmount: true by default breaking the formValue persist when cancelling
})(SurveyNew)
