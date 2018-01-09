// ItemField contains logic to render a single text input
import React from 'react'
import PropTypes from 'prop-types'

const ItemFormSwitch = ({ input, label }) => {
  return(
    <div style={{ marginBottom: 15 }}>
      <div style={{ marginBottom: 5 }}>
        <label>{label}</label>
      </div>
      <div className="switch">
        <label>
          USE
          <input {...input} type="checkbox"/>
          <span className="lever"></span>
          RENT
        </label>
      </div>
  </div>
  )
}

ItemFormSwitch.propTypes = {
  input: PropTypes.object,
  label: PropTypes.string
}

export default ItemFormSwitch
