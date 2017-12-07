import React, { Component } from 'react';
import { BrowserRouter, Route } from 'react-router-dom'
import { connect } from 'react-redux'
import PropTypes from 'prop-types'

import * as actions from './actions'
import Header from './components/Header'
import Landing from './components/Landing'
import Dashboard from './components/Dashboard'
import ItemNew from './components/Items/ItemNew'


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
      <div>
        <BrowserRouter>
          <div style={{ margin: 5 }}>
            <Header auth={auth}/>
            <div className="container">
              <Route exact path="/" component={StartScreen} />
              <Route exact path="/items" component={Dashboard} />
              <Route path="/items/new" component={ItemNew} />
            </div>
          </div>
        </BrowserRouter>
      </div>
    )
  }
}

const mapStateToProps = ({ auth }) => {
	return {
		auth
	}
}

export default connect(mapStateToProps, actions)(App)
