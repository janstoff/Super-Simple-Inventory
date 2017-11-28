import React, { Component } from 'react'
import StripeCheckout from 'react-stripe-checkout'
import { connect } from 'react-redux'
import PropTypes from 'prop-types'

import * as actions from '../actions'

class Payments extends Component {
	static propTypes = {
		handleToken: PropTypes.func
	}

	render() {
		return (
			<StripeCheckout
				name="Emaily"
				description="$5 for 5 Email Credits"
				amount={500} //cents
				token={token => this.props.handleToken(token)} //onReceiveToken callback function
				stripeKey={process.env.REACT_APP_STRIPE_KEY}
			>
				<button className="btn">Add Credits</button>
			</StripeCheckout>
		)
	}
}

export default connect(null, actions)(Payments)
