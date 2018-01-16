import React, { Component } from 'react'
import PropTypes from 'prop-types'
import { Button, Icon } from 'react-materialize'
import { connect } from 'react-redux'
import { reduxForm, Field, FieldArray } from 'redux-form'
import { withRouter } from 'react-router-dom'

import * as actions from '../../../actions'
import FormTextField from '../../standard/FormTextField'

const renderSubCategories = ({ fields, meta: { error, submitFailed } }) => (
	<ul className="sub-category-container">
		<div style={{ flex: 1 }}>
			<Button
				className="cyan lighten-3"
				style={{ marginBottom: 25, fontSize: 10 }}
				type="button"
				onClick={() => fields.push({})}
			>
				add sub-category
			</Button>
		</div>
		<div style={{ flex: 3 }}>
			{fields.map((subcategory, index) => (
				<li key={index}>
					<div className="filter-add">
						<div style={{ flex: 40, marginRight: 50 }}>
							<Field
								style={{ fontSize: 13 }}
								name={`${subcategory}.name`}
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
					name={`${category}.subcategories`}
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
			<div className="container">
				<form onSubmit={handleSubmit}>
					<FieldArray name="categories" component={renderCategories} />
					<button
						type="submit"
						className="teal btn-flat right white-text"
						disabled={submitting || pristine}
						>Save
						<i className="material-icons right">save</i>
					</button>
				</form>
			</div>
		)
	}
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
