import React, { Component } from 'react';
import { BrowserRouter, Route } from 'react-router-dom'
import { connect } from 'react-redux'
import PropTypes from 'prop-types'

import * as actions from './actions'
import Header from './components/Header'
import Landing from './components/Landing'
import Dashboard from './components/Dashboard'
import SurveyNew from './components/Surveys/SurveyNew'


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
              <Route exact path="/surveys" component={Dashboard} />
              <Route path="/surveys/new" component={SurveyNew} />
            </div>
          </div>
        </BrowserRouter>
      </div>
    )
  }
}

export default connect(null, actions)(App)
