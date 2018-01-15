// FormDropdownSelect renders a dropdown selection form field
import React, { Component } from 'react'
import PropTypes from 'prop-types'


class FormDropdownSelect extends Component {
  renderSelectOptions = (option) => (
    <option key={option} value={option}>{option}</option>
  )

  render() {
    const { input, label, dropdownOptions, style, disabled, meta: { error, touched }} = this.props

    return(
      <div>
        <label>{label}</label>
        <select className="browser-default" disabled={disabled} {...input}>
            <option value="">Select</option>
            {dropdownOptions.map(this.renderSelectOptions)}
        </select>
        <div className="red-text" style={style} >{touched ? error : null}</div>
      </div>
    )
  }
}

FormDropdownSelect.propTypes = {
  input: PropTypes.object,
  label: PropTypes.string,
  name: PropTypes.string,
  error: PropTypes.object,
  touched: PropTypes.object,
  dropdownOptions: PropTypes.array
}

export default FormDropdownSelect
