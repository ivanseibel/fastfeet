import React, { useState } from 'react';
import { MdSearch, MdAdd, MdKeyboardArrowLeft, MdDone } from 'react-icons/md';
import PropTypes from 'prop-types';
import { useSelector, useDispatch } from 'react-redux';

import { Container, SearchBox, Header, Buttons } from './styles';

import { setDeliveriesFilter } from '../../store/modules/deliveries/actions';

export default function RegisterHeader({ controls, title }) {
  const { activeScreen } = useSelector((state) => state.auth);
  const [newFilter, setNewFilter] = useState('');

  const dispatch = useDispatch();

  function applyFilter() {
    switch (activeScreen) {
      case 'deliveries':
        dispatch(setDeliveriesFilter(newFilter));
        break;

      default:
        break;
    }

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
    <Container>
      <h1>{title}</h1>
      <Header show={controls.length > 0}>
        <SearchBox show={controls.includes('search')}>
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
        </SearchBox>

        <Buttons controls={controls}>
          <button id="back" type="button">
            <MdKeyboardArrowLeft size={18} color="#fff" />
            <strong>BACK</strong>
          </button>
          <button id="save" type="button">
            <MdDone size={18} color="#fff" />
            <strong>SAVE</strong>
          </button>

          <button id="new" type="button">
            <MdAdd size={18} color="#fff" />
            <strong>NEW</strong>
          </button>
        </Buttons>
      </Header>
    </Container>
  );
}

RegisterHeader.propTypes = {
  controls: PropTypes.arrayOf(PropTypes.string).isRequired,
  title: PropTypes.string.isRequired,
};
