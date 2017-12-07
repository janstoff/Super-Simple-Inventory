import React from 'react'
import { Link } from 'react-router-dom'

import ItemsList from './Items/ItemsList'


const Dashboard = () => {
  return(
    <div>
      <h4>Dashboard</h4>
      <ItemsList />
      <div className="fixed-action-btn">
        <Link to="/items/new" className="btn-floating btn-large red">
          <i className="material-icons">add</i>
        </Link>
      </div>
    </div>
  )
}

export default Dashboard
