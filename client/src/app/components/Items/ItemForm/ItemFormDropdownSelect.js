// ItemField contains logic to render a single text input
import React, { Component } from 'react'
import PropTypes from 'prop-types'


class ItemFormDropdownSelect extends Component {
  renderSelectOptions = (option) => (
    <option key={option} value={option}>{option}</option>
  )

  render() {
    const { input, label, dropdownOptions, meta: { error, touched }} = this.props

    return(
      <div>
        <label>{label}</label>
        <select className="browser-default" {...input}>
            <option value="">Select</option>
            {dropdownOptions.map(this.renderSelectOptions)}
        </select>
        <div className="red-text" style={{ marginBottom: 20, fontSize: 12 }} >{touched ? error : null}</div>
      </div>
    )
  }
}

ItemFormDropdownSelect.propTypes = {
  input: PropTypes.object,
  label: PropTypes.string,
  name: PropTypes.string,
  error: PropTypes.object,
  touched: PropTypes.object,
  dropdownOptions: PropTypes.array
}

export default ItemFormDropdownSelect
