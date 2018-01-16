// DropDownSelect renders a dropdown selection button
import React, { Component } from 'react'
import PropTypes from 'prop-types'

class DropDownFilter extends Component {
	static propTypes = {
		title: PropTypes.string,
    filterItems: PropTypes.array,
		style: PropTypes.object,
    color: PropTypes.string,
		onFilterSelect: PropTypes.func
	}

	render() {
		const { title, filterItems, style, color, onFilterSelect } = this.props

		return (
			<div className="dropdown-filter" style={style}>
				<select
					className={`browser-default ${color} white-text`}
					onChange={event => onFilterSelect(title, event.target.value)}
				>
					<option value="">Select {title}</option>
					{filterItems.map(option => (
						<option key={option} value={option}>
							{option}
						</option>
					))}
				</select>
			</div>
		)
	}
}

export default DropDownFilter
