// SurveyNew shows a survey input form and a review form
import React, { Component } from 'react'
import { reduxForm } from 'redux-form'

import ItemForm from './ItemForm/ItemForm'
import ItemFormReview from './ItemForm/ItemFormReview'

class ItemNew extends Component {
	state = { showFormReview: false }

	render() {
		if (this.state.showFormReview) {
			return (
				<ItemFormReview
					onCancel={() => this.setState({ showFormReview: false })}
				/>
			)
		}

		return (
			<ItemForm
				onItemSubmit={() => this.setState({ showFormReview: true })}
			/>
		)
	}
}

export default reduxForm({
	form: 'itemForm'
	// destroyOnUnmount: true by default breaking the formValue persist when cancelling
})(ItemNew)
