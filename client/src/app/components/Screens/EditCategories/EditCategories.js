import React, { Component } from 'react'
import PropTypes from 'prop-types'
import { Button, Icon } from 'react-materialize'
import { connect } from 'react-redux'
import { reduxForm, Field, FieldArray } from 'redux-form'
import { withRouter } from 'react-router-dom'

import * as actions from '../../../actions'
import FormTextField from '../../_StandardComponents/FormTextField'


const renderSubCategories = ({ fields, meta: { error, submitFailed } }) => (
	<ul className="sub-category-container">
		<div style={{ flex: 1 }}>
			<Button
				className="cyan darken-1"
				style={{ marginBottom: 25, fontSize: 10 }}
				type="button"
				onClick={() => fields.push({})}
			>
				add sub-category
			</Button>
		</div>
    <div style={{ flex: 3 }}>
      {fields.map((subCategory, index) => (
  			<li key={index}>
  				<div className="filter-add">
  					<div style={{ flex: 40, marginRight: 50 }}>
  						<Field
  							style={{ fontSize: 10 }}
  							name={`${subCategory}.name`}
  							type="text"
  							component={FormTextField}
  							placeholder="sub-category name"
  						/>
  					</div>
  					<Button
  						style={{ padding: 0 }}
  						type="button"
  						className="red btn-flat right white-text"
  						onClick={() => fields.remove(index)}
  					>
  						<Icon>remove</Icon>
  					</Button>
  				</div>
  			</li>
      ))}
    </div>
	</ul>
)

const renderCategories = ({ fields, meta: { error, submitFailed } }) => (
	<ul>
		{fields.map((category, index) => (
			<li key={index} style={{ marginTop: 25 }}>
				<div className="filter-add">
					<div style={{ flex: 40, marginRight: 50 }}>
						<Field
							name={`${category}.name`}
							component={FormTextField}
							placeholder="Category Name"
						/>
					</div>
					<Button
						style={{ flex: 1, width: 10 }}
						type="button"
						className="red btn-flat right white-text"
						onClick={() => fields.remove(index)}
					>
						<Icon className="red">delete</Icon>
					</Button>
				</div>
				<FieldArray
					name={`${category}.subCategories`}
					component={renderSubCategories}
				/>
			</li>
		))}
		<li>
			<Button
				className="cyan darken-3"
				style={{ marginTop: 25 }}
				type="button"
				onClick={() => fields.push({})}
			>
				<Icon>add</Icon>
			</Button>
		</li>
	</ul>
)

class EditCategories extends Component {
	static propTypes = {
		fetchCategories: PropTypes.func, //from actions
		initialize: PropTypes.func, //from reduxForm
		submitting: PropTypes.bool, //from reduxForm
		pristine: PropTypes.bool, //from reduxForm
		handleSubmit: PropTypes.func //from reduxForm
	}

	componentDidMount() {
		this.props.fetchCategories().then(() => this.handleInitialize())
	}

	handleInitialize() {
		const { categories } = this.props

		const initData = {
			categories: categories
		}
		this.props.initialize(initData)
	}

	render() {
		const { handleSubmit, pristine, submitting } = this.props

		return (
			<form onSubmit={handleSubmit}>
				<FieldArray name="categories" component={renderCategories} />
				<Button
					className="right"
					type="submit"
					disabled={submitting || pristine}
				>
					<Icon>save</Icon>
				</Button>
			</form>
		)
	}
}

function validate(values) {
	const errors = {}

	if (!values.name) {
		errors.itemName = 'You have not entered anything yet.'
	}
	return errors
}

function mapStateToProps({ categories }) {
	return {
		categories
	}
}

export default connect(mapStateToProps, actions)(
	withRouter(
		reduxForm({
			form: 'categoriesForm',
			destroyOnUnmount: false
		})(EditCategories)
	)
)
