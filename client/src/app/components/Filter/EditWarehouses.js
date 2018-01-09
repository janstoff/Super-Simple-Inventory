import React, { Component } from 'react'
import PropTypes from 'prop-types'
import { Button, Icon } from 'react-materialize'
import { connect } from 'react-redux'
import { reduxForm, Field } from 'redux-form'
import { withRouter } from 'react-router-dom'

import * as actions from '../../actions'
import ItemFormTextField from '../Items/ItemForm/ItemFormTextField'
import Chip from '../_StandardComponents/Chip'

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
			<div className="edit-filters-container">
				<h5 style={{ marginTop: 25, marginBottom: 25 }}>edit your warehouses</h5>
				<form onSubmit={handleSubmit(this.onAdd)}>
					<Field
						placeholder="add..."
						name="name"
						component={ItemFormTextField}
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

function validate(values) {
	const errors = {}

	if (!values.name) {
		errors.itemName = 'You have not entered anything yet.'
	}
	return errors
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
