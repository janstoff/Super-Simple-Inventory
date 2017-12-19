import React, { Component } from 'react'
import PropTypes from 'prop-types'
import { connect } from 'react-redux'
import { withRouter, Link } from 'react-router-dom'
import { Collection, CollectionItem } from 'react-materialize'

import * as actions from '../../actions'
import EditCategory from './EditCategory'

class CategoriesOverview extends Component {
	componentDidMount() {
		this.props.fetchCategories()
	}

	render() {
		const { categories} = this.props

		return (
			<div>
				<h5 style={{ marginBottom: 15 }}>Select Category to edit</h5>
				<Collection>
					{categories.map(category =>
						<CollectionItem key={category._id}>
							<Link to={`/categories/${category._id}`}>
								{category.name}
							</Link>
						</CollectionItem>
					)}
				</Collection>
			</div>
		)
	}
}

function mapStateToProps({ categories }) {
	return {
		categories
	}
}

export default connect(mapStateToProps, actions)(withRouter(CategoriesOverview))
