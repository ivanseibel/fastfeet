import React from 'react';
import PropTypes from 'prop-types';
import { useDispatch } from 'react-redux';

import { ModalContainer, ModalContent } from './styles';

import { setShowDetails as setShowDeliveryDetails } from '../../store/modules/deliveries/actions';

export default function Modal(props) {
  const { children } = props;

  const dispatch = useDispatch();

  function handleClickOut(e) {
    if (e.target.id === 'modal-container') {
      dispatch(setShowDeliveryDetails(false));
    }
  }

  return (
    <ModalContainer onClick={handleClickOut} id="modal-container">
      <ModalContent onClick={null}>{children}</ModalContent>
    </ModalContainer>
  );
}

Modal.propTypes = {
  children: PropTypes.shape().isRequired,
};
