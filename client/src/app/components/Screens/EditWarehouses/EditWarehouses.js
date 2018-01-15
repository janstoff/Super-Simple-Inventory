import React, { Component } from 'react'
import PropTypes from 'prop-types'
import { connect } from 'react-redux'
import { reduxForm, Field } from 'redux-form'
import { withRouter } from 'react-router-dom'

import * as actions from '../../../actions'
import FormTextField from '../../standard/FormTextField'
import Chip from '../../standard/Chip'

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
		this.props.fetchWarehouses()
	}


  onAdd(){
    console.log('add')
  }

	render() {
		const {
			submitting,
			invalid,
			handleSubmit,
			warehouses,
		} = this.props

		return (
			<div className="container">
				<h5 style={{ marginTop: 25, marginBottom: 25 }}>edit your warehouses</h5>
				<form onSubmit={handleSubmit(this.onAdd)}>
					<Field
						placeholder="add..."
						name="name"
						component={FormTextField}
						onKeyDown={this.onAdd}
					/>
					<div className="filter-selected-container">
						<ul>
							{warehouses.map(warehouse => <Chip key={warehouse.name}>{warehouse.name}</Chip>)}
						</ul>
					</div>
					<button type="submit" className="teal btn-flat right white-text">
						Save
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
