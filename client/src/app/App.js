import './style/style.css'
import React, { Component } from 'react'
import { BrowserRouter, Route, Redirect } from 'react-router-dom'
import { connect } from 'react-redux'
import PropTypes from 'prop-types'

import * as actions from './actions'
import Header from './components/Header'
import Landing from './components/screens/Landing'
import Dashboard from './components/screens/Dashboard/Dashboard'
import ItemNew from './components/screens/ItemNew/ItemNew'
import EditWarehouses from './components/screens/EditWarehouses/EditWarehouses'
import EditCategories from './components/screens/EditCategories/EditCategories'

const PrivateRoute = ({ component: Component, auth, ...rest }) => (
	<Route
		{...rest}
		render={props => (auth ? <Component {...props} /> : <Redirect to="/" />)}
	/>
)

class App extends Component {
	static propTypes = {
		fetchUser: PropTypes.func,
		auth: PropTypes.any
	}

	componentDidMount() {
		this.props.fetchUser()
	}

	render() {
		const { auth } = this.props

		const StartScreen = auth ? Dashboard : Landing

		return (
			<BrowserRouter>
				<div>
					<Header auth={auth} />
					<div className="app-body" style={{ marginTop: 15 }}>
						<Route exact path="/" component={StartScreen} />
						<PrivateRoute
							exact
							path="/items"
							component={Dashboard}
							auth={auth}
						/>
						<PrivateRoute path="/items/new" component={ItemNew} auth={auth} />
						<PrivateRoute
							path="/warehouses"
							component={EditWarehouses}
							auth={auth}
						/>
						<PrivateRoute
							path="/categories"
							component={EditCategories}
							auth={auth}
						/>
					</div>
				</div>
			</BrowserRouter>
		)
	}
}

const mapStateToProps = ({ auth }) => {
	return {
		auth
	}
}

export default connect(mapStateToProps, actions)(App)
