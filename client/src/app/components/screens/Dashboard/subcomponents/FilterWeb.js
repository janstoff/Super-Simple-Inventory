import React, { Component } from 'react'
import PropTypes from 'prop-types'

import ButtonSelectFilter from '../../../standard/ButtonSelectFilter'
import DropDownFilter from '../../../standard/DropDownFilter'

class FilterWeb extends Component {
  static propTypes = {
    warehouses: PropTypes.array,
    categories: PropTypes.array,
    subcategories: PropTypes.array,
    onFilterSelect: PropTypes.func
  }

  render () {
    const {
			categories,
			warehouses,
      subcategories,
			onFilterSelect
		} = this.props

    return (
      <div className="filter-web">
        <ButtonSelectFilter
          title="Location"
          filterItems={warehouses}
          buttonColor="brown darken-1"
          editButtonColor="brown lighten-4"
          editRoute="/warehouses"
          onFilterSelect={onFilterSelect}
        />
        <ButtonSelectFilter
          title="Category"
          filterItems={categories}
          buttonColor="cyan darken-3"
          editButtonColor="cyan lighten-4"
          editRoute="/categories"
          onFilterSelect={onFilterSelect}
        />
        {subcategories.toString() && //toString() in order to force falsy evaluation if empty arr
          <DropDownFilter
            title="Sub-Category"
  					filterItems={subcategories}
  					color="cyan lighten-3"
            textColor="grey"
  					style={{ marginRight: 10 }}
  					onFilterSelect={onFilterSelect}
          />
        }
      </div>
    )
  }
}

export default FilterWeb
