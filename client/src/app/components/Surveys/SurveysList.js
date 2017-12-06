// SurveysList fetches and displays a users surveys
import React, { Component } from 'react'
import { connect } from 'react-redux'
import PropTypes from 'prop-types'

import * as actions from '../../actions'

class SurveysList extends Component {
	static propTypes = {
		surveys: PropTypes.array
	}

	componentDidMount() {
		this.props.fetchSurveys()
	}

	render() {
		const { surveys } = this.props

		return surveys.reverse().map(survey => {
			return (
				<div className="card blue-grey darken-1">
					<div className="card-content white-text">
						<span className="card-title">{survey.title}</span>
						<p>{survey.body}</p>
            <p className="right">Sent on: {new Date(survey.dateSent).toLocaleDateString()}</p>
					</div>
					<div className="card-action">
						<a>Yes: {survey.yes}</a>
						<a>No: {survey.no}</a>
					</div>
				</div>
			)
		})
	}
}

function mapStateToProps({ surveys }) {
	return { surveys }
}

export default connect(mapStateToProps, actions)(SurveysList)
