import React, { Component } from 'react'
import { connect } from 'react-redux'
import PropTypes from 'prop-types'


class Landing extends Component {
  static propTypes = {
    auth: PropTypes.object
  }

  render() {
    if(this.props.auth === null) {
      return <div></div>
    } else {
      return(
        <div style={{ textAlign: 'center' }}>
          <h2>
            OMR Inventory
          </h2>
          Find, add, analyze inventory...
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
