import React, { Component } from 'react'
import PropTypes from 'prop-types'
import { Link } from 'react-router-dom'

class Header extends Component {
	static propTypes = {
		auth: PropTypes.object
	}

	renderContent() {
		const { auth } = this.props

		switch (auth) {
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
				<li key="user"><Link to={`/user/${auth._id}`}>{auth.userName}</Link></li>,
				<li key="logout"><a href="/api/logout">Logout</a></li>
			]
		}
	}

	render() {
		return (
			<nav>
				<div className="nav-wrapper blue-grey darken-2">
					<Link
            to={this.props.auth ? "/items" : "/"}
            className="left brand-logo"
						style={{ paddingLeft: 12 }}
            >
              Lager
          </Link>

					<ul className="right">{this.renderContent()}</ul>
				</div>
			</nav>
		)
	}
}

export default (Header)
