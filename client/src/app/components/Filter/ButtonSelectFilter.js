import React, { Component } from 'react'
import PropTypes from 'prop-types'
import { Button, Icon } from 'react-materialize'
import { Link } from 'react-router-dom'

class ButtonSelectFilter extends Component {
	static propTypes = {
		title: PropTypes.string,
		filterItems: PropTypes.array,
		buttonColor: PropTypes.string,
		editButtonColor: PropTypes.string,
		editRoute: PropTypes.string
	}

	render() {
		const {
			title,
			filterItems,
			buttonColor,
			editButtonColor,
			editRoute
		} = this.props

		return (
			<div className="filter">
				<p style={{ fontWeight: 600 }}>{title}</p>
				<ul>
					{filterItems.map(item => (
						<li key={item}>
							<Button
								waves="light"
								className={buttonColor}
								style={{ marginBottom: 5 }}
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
