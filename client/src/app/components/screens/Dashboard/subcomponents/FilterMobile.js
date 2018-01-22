import React, { Component } from 'react'
import PropTypes from 'prop-types'

import DropDownFilter from '../../../standard/DropDownFilter'

class FilterMobile extends Component {
	static propTypes = {
		warehouses: PropTypes.array,
		categories: PropTypes.array,
    subcategories: PropTypes.array,
		onFilterSelect: PropTypes.func
	}

	render() {
		const { categories, warehouses, subcategories, onFilterSelect } = this.props

		return (
			<div className="filter-mobile">
				<DropDownFilter
					title="Location"
					filterItems={warehouses}
					color="brown lighten-2"
					textColor="white"
					style={{ margin: 5 }}
					onFilterSelect={onFilterSelect}
				/>
				<DropDownFilter
					title="Category"
					filterItems={categories}
					color="cyan lighten-3"
					textColor="white"
					style={{ margin: 5 }}
					onFilterSelect={onFilterSelect}
				/>
        {subcategories.toString() && //toString() in order to force falsy evaluation if empty arr
          <DropDownFilter
            title="Sub-Category"
  					filterItems={subcategories}
  					color="cyan lighten-5"
						textColor="grey"
  					style={{ margin: 5 }}
  					onFilterSelect={onFilterSelect}
          />
        }
			</div>
		)
	}
}

export default FilterMobile
