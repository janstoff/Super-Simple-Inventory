import React from 'react'
import PropTypes from 'prop-types'

const Chip = ({ children }) => {
	return (
		<div className="chip">
			{children}
			<i className="close material-icons">close</i>
		</div>
	)
}

Chip.propTypes = {
	children: PropTypes.node
}

export default Chip
