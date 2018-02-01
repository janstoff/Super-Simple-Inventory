import React, { Component } from 'react'
import PropTypes from 'prop-types'
import { connect } from 'react-redux'

import ButtonSelectFilter from '../../../../../standard/ButtonSelectFilter'
import DropDownFilter from '../../../../../standard/DropDownFilter'

class FilterWeb extends Component {
  static propTypes = {
    warehouses: PropTypes.array,
    categories: PropTypes.array,
    subcategories: PropTypes.array,
    onFilterSelect: PropTypes.func,
    selectedWarehouse: PropTypes.string,
    selectedCategory: PropTypes.string
  }

  render () {
    const {
			categories,
			warehouses,
      subcategories,
			onFilterSelect,
      selectedWarehouse,
      selectedCategory
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
          activeButton={selectedWarehouse}
        />
        <ButtonSelectFilter
          title="Category"
          filterItems={categories}
          buttonColor="cyan darken-3"
          editButtonColor="cyan lighten-4"
          editRoute="/categories"
          onFilterSelect={onFilterSelect}
          activeButton={selectedCategory}
        />
        {subcategories.toString() && //toString() in order to force falsy evaluation if empty arr
          <DropDownFilter
            title="Sub-Category"
  					filterItems={subcategories}
  					color="cyan lighten-5"
            textColor="grey"
  					style={{ marginRight: 10 }}
  					onFilterSelect={onFilterSelect}
          />
        }
      </div>
    )
  }
}

function mapStateToProps({ filters }) {
  return {
    selectedWarehouse: filters.warehouse,
    selectedCategory: filters.category
  }
}

export default connect(mapStateToProps)(FilterWeb)
