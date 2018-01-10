// FormSwitch renders a form field as a switch between 2 options
import React from 'react'
import PropTypes from 'prop-types'

const FormSwitch = ({ input, label, ifFalse, ifTrue }) => {
  return(
    <div style={{ marginBottom: 15 }}>
      <div style={{ marginBottom: 5 }}>
        <label>{label}</label>
      </div>
      <div className="switch">
        <label>
          {ifFalse}
          <input {...input} type="checkbox"/>
          <span className="lever"></span>
          {ifTrue}
        </label>
      </div>
  </div>
  )
}

FormSwitch.propTypes = {
  input: PropTypes.object,
  label: PropTypes.string,
  ifFalse: PropTypes.string,
  ifTrue: PropTypes.string,
}

export default FormSwitch
