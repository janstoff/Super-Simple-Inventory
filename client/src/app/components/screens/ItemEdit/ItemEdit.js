import React, { Component } from 'react'
import { reduxForm } from 'redux-form'

import ItemForm from '../ItemNew/subcomponents/ItemForm'

class ItemNew extends Component {
	render() {
		return <ItemForm />
	}
}

export default reduxForm({
	form: 'itemForm'
})(ItemNew)
