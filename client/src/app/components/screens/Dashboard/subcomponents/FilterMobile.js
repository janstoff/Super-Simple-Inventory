import React, { Component } from 'react'
import PropTypes from 'prop-types'

import DropDownFilter from '../../../standard/DropDownFilter'

class FilterMobile extends Component {
  static propTypes = {
    warehouses: PropTypes.array,
    categories: PropTypes.array,
    onFilterSelect: PropTypes.func
  }

  render () {
    const {
			categories,
			warehouses,
			onFilterSelect
		} = this.props

    return (
      <div className="filter-mobile">
        <DropDownFilter
          title="Locations"
          filterItems={warehouses}
          color="brown lighten-2"
          style={{ margin: 5 }}
          onFilterSelect={onFilterSelect}
        />
        <DropDownFilter
          title="Categories"
          filterItems={categories}
          color="cyan lighten-2"
          style={{ margin: 5 }}
          onFilterSelect={onFilterSelect}
        />
      </div>
    )
  }
}

export default FilterMobile
