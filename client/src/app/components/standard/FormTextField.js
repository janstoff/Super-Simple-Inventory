// FormTextField contains logic to render a single text input
import React from 'react'
import PropTypes from 'prop-types'

const FormTextField = ({ input, style, label, placeholder, meta: { error, touched }}) => {
  return(
    <div>
      <label>{label}</label>
      <input { ...input } style={style} placeholder={placeholder}/>
      <div className="red-text" style={{ marginBottom: 20, fontSize: 12 }} >{touched ? error : null}</div>
    </div>
  )
}

FormTextField.propTypes = {
  input: PropTypes.object,
  style: PropTypes.object,
  error: PropTypes.object,
  touched: PropTypes.object,
  label: PropTypes.string,
  placeholder: PropTypes.string
}

export default FormTextField
