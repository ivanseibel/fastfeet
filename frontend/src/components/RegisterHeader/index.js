import React from 'react';
import { MdSearch, MdAdd } from 'react-icons/md';
import PropTypes from 'prop-types';
import { useSelector } from 'react-redux';

import { Container } from './styles';

export default function RegisterHeader({ showControls }) {
  const { activeScreen } = useSelector((state) => state.auth);
  return (
    <Container showControls={showControls ? 1 : 0}>
      <h1>Managing {activeScreen}</h1>
      <header>
        <div>
          <MdSearch size={16} color="#999" />
          <input type="text" placeholder={`Search by ${activeScreen}`} />
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
};
