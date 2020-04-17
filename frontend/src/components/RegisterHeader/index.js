import React from 'react';
import { MdSearch, MdAdd } from 'react-icons/md';
import PropTypes from 'prop-types';

import { Container } from './styles';

export default function RegisterHeader({ screenName, showControls }) {
  return (
    <Container showControls={showControls ? 1 : 0}>
      <h1>Managing {screenName}</h1>
      <header>
        <div>
          <MdSearch size={16} color="#999" />
          <input type="text" placeholder={`Search by ${screenName}`} />
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
  screenName: PropTypes.string.isRequired,
  showControls: PropTypes.bool.isRequired,
};
