import React, { useState } from 'react';
import { MdSearch, MdAdd } from 'react-icons/md';
import PropTypes from 'prop-types';
import { useSelector } from 'react-redux';

import { Container } from './styles';

export default function RegisterHeader({ showControls, setFilter }) {
  const { activeScreen } = useSelector((state) => state.auth);
  const [newFilter, setNewFilter] = useState('');

  function applyFilter() {
    setFilter(newFilter);
    setNewFilter('');
  }

  function handleKeyDown(e) {
    if (e.key === 'Enter') {
      applyFilter();
    }
  }

  function handleNewFilter(e) {
    setNewFilter(e.target.value);
  }

  return (
    <Container showControls={showControls ? 1 : 0}>
      <h1>Managing {activeScreen}</h1>
      <header>
        <div>
          <MdSearch size={16} color="#999" onClick={applyFilter} />
          <input
            onChange={handleNewFilter}
            type="text"
            placeholder={`Search by ${activeScreen}`}
            value={newFilter}
            onKeyDown={handleKeyDown}
          />
        </div>
        <button type="button">
          <MdAdd size={16} color="#fff" />
          <strong>NEW</strong>
        </button>
      </header>
    </Container>
  );
}

RegisterHeader.propTypes = {
  showControls: PropTypes.bool.isRequired,
  setFilter: PropTypes.func.isRequired,
};
