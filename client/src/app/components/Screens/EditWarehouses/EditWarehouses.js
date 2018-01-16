import React, { Component } from 'react'
import PropTypes from 'prop-types'
import { connect } from 'react-redux'
import { Button, Icon } from 'react-materialize'
import { reduxForm, Field, FieldArray } from 'redux-form'
import { withRouter } from 'react-router-dom'

import * as actions from '../../../actions'
import FormTextField from '../../standard/FormTextField'


const renderWarehouses = ({ fields, meta: { error, submitFailed } }) => (
	<ul>
		{fields.map((warehouse, index) => (
			<li key={index} style={{ marginTop: 25 }}>
				<div className="filter-add">
					<div style={{ flex: 40, marginRight: 50 }}>
						<Field
							name={`${warehouse}.name`}
							component={FormTextField}
							placeholder="Warehouse Name"
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

class EditWarehouses extends Component {
	static propTypes = {
    submitting: PropTypes.bool,
    invalid: PropTypes.bool,
    handleSubmit: PropTypes.func,
		warehouses: PropTypes.array,
		location: PropTypes.object,
		fetchCategories: PropTypes.func,
		fetchWarehouses: PropTypes.func
	}

	componentDidMount(){
		this.props.fetchWarehouses().then(() => this.handleInitialize())
	}

	handleInitialize() {
		const { warehouses } = this.props

		const initData = {
			warehouses: warehouses
		}
		this.props.initialize(initData)
	}

	render() {
		const {
			submitting,
			pristine,
			handleSubmit,
		} = this.props

		return (
			<div className="container">
				<form onSubmit={handleSubmit}>
					<FieldArray name="warehouses" component={renderWarehouses} />
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

function mapStateToProps({ warehouses }) {
	return {
		warehouses
	}
}

export default connect(mapStateToProps, actions)(
	withRouter(
		reduxForm({
			form: 'warehousesForm',
			destroyOnUnmount: false
		})(EditWarehouses)
	)
)
