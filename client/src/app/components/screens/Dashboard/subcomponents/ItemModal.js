import React, { Component } from 'react'
import Modal from 'react-modal'
import PropTypes from 'prop-types'

class ItemModal extends Component {
	render() {
    const { isOpen, closeItemModal } = this.props

		return (
			<Modal
				className="modal"
				overlayClassName="overlay"
				isOpen={isOpen}
				onRequestClose={closeItemModal}
				contentLabel="Modal"
			/>
		)
	}
}

export default ItemModal
