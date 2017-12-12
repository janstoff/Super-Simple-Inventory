import React, { Component } from 'react'
import PropTypes from 'prop-types'


class WarehouseFilter extends Component {
  static propTypes = {
		warehouses: PropTypes.array
	}

  render() {
    const { warehouses } = this.props

    return(
      <div className="filter-container">
        {warehouses.map(warehouse => (
          <button className="waves-effect waves-light btn" style={{ marginRight: 5 }}>{warehouse.name}</button>
        ))}
        <button className="teal lighten-3 btn"><i className="material-icons">add</i></button>
      </div>
    )
  }
}

export default WarehouseFilter
