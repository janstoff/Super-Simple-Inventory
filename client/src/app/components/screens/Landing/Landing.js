import React, { Component } from 'react'
import { connect } from 'react-redux'
import PropTypes from 'prop-types'


class Landing extends Component {
  static propTypes = {
    auth: PropTypes.any
  }

  render() {
    if(this.props.auth === null) {
      return <div></div>
    } else {
      return(
        <div style={{ textAlign: 'center' }}>
          <h2>
            Easy Inventory
          </h2>
          The iventory tool for when you don't need a warehouse management yet.
          [...Find, add, remove and analyze your shared inventory...]
        </div>
      )
    }
  }
}

const mapStateToProps = ({ auth }) => {
	return {
		auth
	}
}

export default connect(mapStateToProps)(Landing)
