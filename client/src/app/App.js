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
    fetchUser: PropTypes.func
  }

  componentDidMount() {
    this.props.fetchUser()
  }

  render() {
    return (
      <div>
        <BrowserRouter>
          <div style={{ margin: 5 }}>
            <Header />
            <div className="container">
              <Route exact path="/" component={Landing} />
              <Route exact path="/items" component={Dashboard} />
              <Route path="/items/new" component={ItemNew} />
            </div>
          </div>
        </BrowserRouter>
      </div>
    )
  }
}

export default connect(null, actions)(App)
