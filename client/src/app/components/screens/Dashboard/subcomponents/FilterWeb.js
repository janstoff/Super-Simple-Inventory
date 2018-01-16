import React, { Component } from 'react'
import PropTypes from 'prop-types'

import ButtonSelectFilter from '../../../standard/ButtonSelectFilter'

class FilterWeb extends Component {
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
      <div className="filter-web">
        <ButtonSelectFilter
          title="Locations"
          filterItems={warehouses}
          buttonColor="brown darken-1"
          editButtonColor="brown lighten-4"
          editRoute="/warehouses"
          onFilterSelect={onFilterSelect}
        />
        <ButtonSelectFilter
          title="Categories"
          filterItems={categories}
          buttonColor="cyan darken-3"
          editButtonColor="cyan lighten-4"
          editRoute="/categories"
          onFilterSelect={onFilterSelect}
        />
      </div>
    )
  }
}

export default FilterWeb
