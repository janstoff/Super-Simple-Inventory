import './style/style.css'
import React, { Component } from 'react'
import { BrowserRouter, Route, Redirect, Switch } from 'react-router-dom'
import { connect } from 'react-redux'
import PropTypes from 'prop-types'

import * as actions from './actions'
import Header from './components/Header'
import Landing from './components/screens/Landing/Landing'
import Dashboard from './components/screens/Dashboard/Dashboard'
import ItemNew from './components/screens/ItemNew/ItemNew'
import EditWarehouses from './components/screens/EditWarehouses/EditWarehouses'
import EditCategories from './components/screens/EditCategories/EditCategories'
import ItemView from './components/screens/ItemView/ItemView'

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
						<Switch>
							<PrivateRoute exact path="/items/new" component={ItemNew} auth={auth} />
							<PrivateRoute path="/items/:id" component={ItemView} auth={auth} />
							<PrivateRoute
								exact
								path="/items"
								component={Dashboard}
								auth={auth}
							/>
							<PrivateRoute
								exact
								path="/warehouses"
								component={EditWarehouses}
								auth={auth}
							/>
							<PrivateRoute
								exact
								path="/categories"
								component={EditCategories}
								auth={auth}
							/>
							<Route exact path="/" component={StartScreen} />
						</Switch>
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
