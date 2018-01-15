import React from 'react';
import PropTypes from 'prop-types'

const SearchBar = ({ filterText, onSearchInput }) => (
  <input
      type="search"
      placeholder="Search"
      value={filterText}
      onChange={event => onSearchInput(event.target.value)}
  />
);

SearchBar.propTypes = {
  onSearchInput: PropTypes.func.isRequired,
  filterText: PropTypes.string.isRequired
};

export default SearchBar
