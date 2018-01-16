// ButtonSelectFilter enders a list of buttons which act as filters
import React, { Component } from 'react'
import PropTypes from 'prop-types'
import { Button } from 'react-materialize'
import { Link } from 'react-router-dom'

class ButtonSelectFilter extends Component {
	static propTypes = {
		title: PropTypes.string,
		filterItems: PropTypes.array,
		buttonColor: PropTypes.string,
		editButtonColor: PropTypes.string,
		editRoute: PropTypes.string,
		onFilterSelect: PropTypes.func
	}

	render() {
		const {
			title,
			filterItems,
			buttonColor,
			editButtonColor,
			editRoute,
			onFilterSelect
		} = this.props

		return (
			<div className="button-select-filter">
				<p style={{ fontWeight: 600 }}>{title}</p>
				<ul>
					{filterItems.map(item => (
						<li key={item}>
							<Button
								waves="light"
								value={item}
								className={`filter-button ${buttonColor}`}
								style={{ marginBottom: 5 }}
								onClick={(event) => onFilterSelect(title, event.target.value)}
							>
								{item}
							</Button>
						</li>
					))}
					<li>
						<Link
							to={editRoute}
							className={`btn waves-effect waves-light ${editButtonColor}`}
						>
							<i className="material-icons">edit</i>
						</Link>
					</li>
				</ul>
			</div>
		)
	}
}

export default ButtonSelectFilter
