import React, { Component } from 'react'
import PropTypes from 'prop-types'
import { Link } from 'react-router-dom'
import { Navbar, NavItem, Icon, Dropdown, Button } from 'react-materialize'


class Header extends Component {
	static propTypes = {
		auth: PropTypes.object
	}

	renderLogStatus() {
		const { auth } = this.props

		switch (auth) {
			case null:
				return //nothing
			case false:
				return (
					<NavItem>
						<a href="/auth/google">Login with Google</a>
					</NavItem>
				)
			default:
      return [
				<li key="user"><Link to={`/user/${auth._id}`}>{auth.userName}</Link></li>,
				<NavItem key="logout" href="/api/logout">Logout</NavItem>
			]
		}
	}

	render() {
		return (
				<Navbar brand="Lager" right className="blue-grey darken-2" style={{ paddingLeft: 20 }}>
					<Dropdown options={{belowOrigin: true, hover: true}} trigger={<Button>Settings</Button>}>
						<Link to="/users" style={{ fontSize: 14, color: '#386b66' }}>users</Link>
						<Link to="/categories" style={{ fontSize: 14, color: '#386b66' }}>categories</Link>
					</Dropdown>
					<NavItem href='get-started.html'><Icon>refresh</Icon></NavItem>
					{this.renderLogStatus()}
				</Navbar>
		)
	}
}

export default (Header)
