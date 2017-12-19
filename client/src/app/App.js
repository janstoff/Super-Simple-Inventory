import './style/style.css'
import React, { Component } from 'react';
import { BrowserRouter, Route, Redirect } from 'react-router-dom'
import { connect } from 'react-redux'
import PropTypes from 'prop-types'

import * as actions from './actions'
import Header from './components/Header'
import Landing from './components/Landing'
import Dashboard from './components/Dashboard'
import ItemNew from './components/Items/ItemNew'
import EditWarehouses from './components/Filter/EditWarehouses'
import EditCategories from './components/Filter/EditCategories'
import CategoriesOverview from './components/Filter/CategoriesOverview'
import EditCategory from './components/Filter/EditCategory'



const PrivateRoute = ({ component: Component, auth, ...rest }) => (
  <Route {...rest} render={(props) => (
    auth === null
      ? <Redirect to='/' />
      : <Component {...props}/>
  )} />
)

class App extends Component {
  static propTypes = {
    fetchUser: PropTypes.func,
    auth: PropTypes.object
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
            <div className="container" style={{ marginTop: 15 }}>
              <Route exact path="/" component={StartScreen} />
              <PrivateRoute exact path="/items" component={Dashboard} auth={auth} />
              <PrivateRoute path="/items/new" component={ItemNew} auth={auth} />
              <PrivateRoute path="/warehouses" component={EditWarehouses} />
              <PrivateRoute path="/categories" component={EditCategories} />
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
