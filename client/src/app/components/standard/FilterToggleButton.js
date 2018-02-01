import React from 'react'
import { Button } from 'react-materialize'


const FilterToggleButton = ({ title, className, color, filter, onClick }) => (
  <Button
    waves="light"
    className={`${className} ${color}`}
    style={filter === true ? { opacity: 1 } : { opacity: 0.8 }}
    onClick={onClick}

  >
    {title}
    {filter === true && <i className="material-icons right">chevron_left</i>}
  </Button>
)

export default FilterToggleButton
