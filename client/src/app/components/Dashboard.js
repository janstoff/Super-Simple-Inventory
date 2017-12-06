import React from 'react'
import { Link } from 'react-router-dom'
import SurveysList from './Surveys/SurveysList'


const Dashboard = () => {
  return(
    <div>
      <h4>Dashboard</h4>
      <SurveysList />
      <div className="fixed-action-btn">
        <Link to="/surveys/new" className="btn-floating btn-large red">
          <i className="material-icons">add</i>
        </Link>
      </div>
    </div>
  )
}

export default Dashboard
