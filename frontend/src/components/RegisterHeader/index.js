import React, { useState, useMemo } from 'react';
import { MdSearch, MdAdd, MdKeyboardArrowLeft, MdDone } from 'react-icons/md';
import PropTypes from 'prop-types';
import { useSelector, useDispatch } from 'react-redux';

import {
  Container,
  LeftBox,
  Header,
  RightBox,
  Title,
  Subtitle,
} from './styles';

import {
  setDeliveriesFilter,
  setShowWithProblems,
} from '../../store/modules/deliveries/actions';
import { setDeliverymenFilter } from '../../store/modules/deliverymen/actions';

// import history from '../../services/history';

export default function RegisterHeader({ headerControls, title, subtitle }) {
  const { activeScreen } = useSelector((state) => state.auth);
  const [newFilter, setNewFilter] = useState('');

  const dispatch = useDispatch();

  const { onlyWithProblems } = useSelector(
    (state) => state.deliveries.deliveryDetails
  );

  const controls = useMemo(() => {
    return headerControls.map((control) => control.type);
  }, [headerControls]);

  const searchBy = useMemo(() => {
    const defaultObject = { type: '', searchBy: '' };
    const result =
      headerControls.find((hc) => hc.type === 'search') || defaultObject;
    return result.searchBy;
  }, [headerControls]);

  function applyFilter() {
    switch (activeScreen) {
      case 'deliveries':
        dispatch(setDeliveriesFilter(newFilter));
        break;

      case 'deliverymen':
        dispatch(setDeliverymenFilter(newFilter));
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

  function buttonClick(type) {
    const [button] = headerControls.filter((control) => control.type === type);

    if (button) {
      button.method();
    }
  }

  function handleChangeOnlyWithProblems(e) {
    dispatch(setShowWithProblems(!onlyWithProblems));
  }

  return (
    <Container>
      <Title show={title}>{title}</Title>
      <Header show={controls.length > 0}>
        <Subtitle show={subtitle}>{subtitle}</Subtitle>
        <LeftBox show={controls}>
          <div className="search">
            <MdSearch size={16} color="#999" onClick={applyFilter} />
            <input
              onChange={handleNewFilter}
              type="text"
              placeholder={`Search ${activeScreen} by ${searchBy}`}
              value={newFilter}
              onKeyDown={handleKeyDown}
            />
            <div className="check">
              <label htmlFor="onlyWithProblems">
                <input
                  className="check"
                  type="checkbox"
                  checked={onlyWithProblems}
                  id="onlyWithProblems"
                  onChange={handleChangeOnlyWithProblems}
                />
                Only with problems
              </label>
            </div>
          </div>
        </LeftBox>

        <RightBox controls={controls}>
          <button
            id="back"
            type="button"
            onClick={() => {
              buttonClick('back');
            }}
          >
            <MdKeyboardArrowLeft size={18} color="#fff" />
            <strong>BACK</strong>
          </button>
          <button
            id="save"
            type="button"
            onClick={() => {
              buttonClick('save');
            }}
          >
            <MdDone size={18} color="#fff" />
            <strong>SAVE</strong>
          </button>

          <button
            id="new"
            type="button"
            onClick={() => {
              buttonClick('new');
            }}
          >
            <MdAdd size={18} color="#fff" />
            <strong>NEW</strong>
          </button>
        </RightBox>
      </Header>
    </Container>
  );
}

RegisterHeader.propTypes = {
  headerControls: PropTypes.arrayOf(PropTypes.shape).isRequired,
  title: PropTypes.string,
  subtitle: PropTypes.string,
};

RegisterHeader.defaultProps = {
  title: '',
  subtitle: '',
};
