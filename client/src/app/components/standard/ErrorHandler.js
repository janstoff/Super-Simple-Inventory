import React from 'react'
import { Button } from 'react-materialize'

const ErrorHandler = () => (
	<div
		style={{
			display: 'flex',
			flexDirection: 'column',
			alignItems: 'center',
			justifyContent: 'center',
			marginTop: '10%'
		}}
	>
		<p>Oops, something went wrong.</p>
		<Button onClick={() => window.location.reload()}>Refresh the App</Button>
	</div>
)

export default ErrorHandler
