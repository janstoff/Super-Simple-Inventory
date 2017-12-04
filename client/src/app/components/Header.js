import React, { Component } from 'react'
import { connect } from 'react-redux'
import PropTypes from 'prop-types'
import { Link } from 'react-router-dom'

import Payments from './Payments'

class Header extends Component {
	static propTypes = {
		auth: PropTypes.any
	}

	renderContent() {
		switch (this.props.auth) {
			case null:
				return //nothing
			case false:
				return (
					<li>
						<a href="/auth/google">Login with Google</a>
					</li>
				)
			default:
      return [
				<li key="payments"><Payments /></li>,
				<li key="credits" style={{ margin: '0 10px' }}>Credits: {this.props.auth.credits}</li>,
				<li key="logout"><a href="/api/logout">Logout</a></li>
			]
		}
	}

	render() {
		return (
			<nav>
				<div className="nav-wrapper blue-grey darken-2">
					<Link
            to={this.props.auth ? "/surveys" : "/"}
            className="left brand-logo"
						style={{ paddingLeft: 12 }}
            >
              Emaily
          </Link>

					<ul className="right">{this.renderContent()}</ul>
				</div>
			</nav>
		)
	}
}

const mapStateToProps = ({ auth }) => {
	return {
		auth
	}
}

export default connect(mapStateToProps)(Header)
