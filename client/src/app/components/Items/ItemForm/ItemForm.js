// SurveyForm shows an input form for users to create a survey
import React, { Component } from 'react'
import { connect } from 'react-redux'
import { reduxForm, Field } from 'redux-form' //enables component to access redux form functionality
import PropTypes from 'prop-types'
import { Link, withRouter } from 'react-router-dom'

import ItemFormTextField from './ItemFormTextField'
import ItemFormDropdownSelect from './ItemFormDropdownSelect'
import ItemFormSwitch from './ItemFormSwitch'

const DROPDOWN_OPTIONS = ['Option1', 'Option2', 'Option3']

class ItemForm extends Component {
	static propTypes = {
		submitting: PropTypes.bool,
		invalid: PropTypes.bool,
		location: PropTypes.object, //from React Router
		handleSubmit: PropTypes.func, //from reduxForm
		onItemSubmit: PropTypes.func, //from ItemNew
		categoriesSelection: PropTypes.array,
		warehousesSelection: PropTypes.array,
	}

	render() {
		const {
			submitting,
			invalid,
			location,
			handleSubmit,
			onItemSubmit,
			categoriesSelection,
			warehousesSelection
		} = this.props

		return (
			<div>
				<h5 style={{ marginTop: 25, marginBottom: 25 }}>
					{location.pathname === '/items/new' ? 'Create' : 'Edit'} Item
				</h5>
				<form onSubmit={handleSubmit(onItemSubmit)}>
					<Field
						placeholder="Item"
						name="itemName"
						component={ItemFormTextField}
					/>
					<Field
						label="Category"
						name="category"
						dropdownOptions={categoriesSelection}
						component={ItemFormDropdownSelect}
					/>
					<Field
						label="Sub-Category"
						name="subcategory"
						dropdownOptions={DROPDOWN_OPTIONS}
						component={ItemFormDropdownSelect}
					/>
					<Field
						label="Warehouse"
						name="warehouse"
						dropdownOptions={warehousesSelection}
						component={ItemFormDropdownSelect}
					/>
					<Field
						label="Is this item for use or for rent?"
						name="rental"
						component={ItemFormSwitch}
					/>
					<Field
						placeholder="Quantity"
						name="quantity"
						parse={value => Number(value)}
						component={ItemFormTextField}
					/>
					<Link to="/items" className="red btn-flat white-text">
						cancel
					</Link>
					<button
						type="submit"
						className="teal btn-flat right white-text"
						disabled={submitting || invalid}
					>
						Next
						<i className="material-icons right">done</i>
					</button>
				</form>
			</div>
		)
	}
}

function validate(values) {
	const errors = {}

	if (!values.itemName) {
		errors.itemName = 'Please enter a item name.'
	}
	if (!values.category) {
		errors.category = 'Please select an item category.'
	}
	if (!values.subcategory) {
		errors.subcategory = 'Please select an item category.'
	}
	if (!values.warehouse) {
		errors.warehouse =
			'Please select which warehoues this item will be stored in.'
	}
	if (!values.quantity) {
		errors.quantity = 'Please state the new amount in storage.'
	}

	return errors //if errors empty form is considered valid
}

function mapStateToProps({ categories, warehouses }) {
	return {
		categoriesSelection: categories.map(category => category.name),
		warehousesSelection: warehouses.map(warehouse => warehouse.name)
	}
}

export default connect(mapStateToProps)(
	withRouter(
		reduxForm({
			validate,
			form: 'itemForm',
			destroyOnUnmount: false
		})(ItemForm)
	)
)
