// Shows users their form inputs for review
import React from 'react'
import { connect } from 'react-redux'
import PropTypes from 'prop-types'
import { withRouter } from 'react-router-dom'

import * as actions from '../../../actions'

const ItemNewReview = ({ onCancel, formValues, submitItem, history }) => {
	return (
		<div>
			<h5 style={{ marginBottom: 30 }}>Review your entry before saving...</h5>
      <div style={{ marginBottom: 30 }}>
          <div style={{ marginBottom: 10 }}>
            <div style={{ marginBottom: 10 }}>Item: {formValues.itemName}</div>
            <div style={{ marginBottom: 10 }}>Category: {formValues.category}</div>
						<div style={{ marginBottom: 10 }}>Sub-Category: {formValues.subcategory || 'not defined'}</div>
						<div style={{ marginBottom: 10 }}>Warehouse: {formValues.warehouse}</div>
						<div style={{ marginBottom: 10 }}>Rental: {formValues.rental === true ? 'Yes' : 'No'}</div>
						<div style={{ marginBottom: 10 }}>Quantity: {formValues.quantity}</div>
          </div>
      </div>
			<button className="yellow darken-3 white-text btn-flat" onClick={onCancel}>
				Back
			</button>
      <button className="green white-text btn-flat right " onClick={() => submitItem(formValues, history)}>
				Save
        <i className="material-icons right">save</i>
			</button>
		</div>
	)
}

ItemNewReview.propTypes = {
	onCancel: PropTypes.func, // from ItemNew
  formValues: PropTypes.object, //from reduxForm state
  submitItem: PropTypes.func,// from actions
  history: PropTypes.object // from withRouter
}

function mapStateToProps({ form }) {
  return {
    formValues: form.itemForm.values
  }
}

export default connect(mapStateToProps, actions)(withRouter(ItemNewReview))
