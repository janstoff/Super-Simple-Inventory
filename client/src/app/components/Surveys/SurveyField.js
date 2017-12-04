// SurveyField contains logic to render a single text input
import React from 'react'
import PropTypes from 'prop-types'

const SurveyField = ({ input, label, meta: { error, touched }}) => {
  return(
    <div>
      <label>{label}</label>
      <input { ...input } style={{ marginBottom: 5 }} />
      <div className="red-text" style={{ marginBottom: 20, fontSize: 12 }} >{touched ? error : null}</div>
    </div>
  )
}

SurveyField.propTypes = {
  input: PropTypes.object,
  error: PropTypes.object,
  touched: PropTypes.object,
  label: PropTypes.string
}

export default SurveyField
