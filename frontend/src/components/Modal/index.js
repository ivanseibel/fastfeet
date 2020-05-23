import React from 'react';
import PropTypes from 'prop-types';
import { useDispatch, useSelector } from 'react-redux';

import { ModalContainer, ModalContent } from './styles';

import { setShowDetails as setShowDeliveryDetails } from '../../store/modules/deliveries/actions';
import { setShowDetails as setShowIssueDetails } from '../../store/modules/issues/actions';

export default function Modal(props) {
  const { children } = props;

  const dispatch = useDispatch();
  const screen = useSelector((state) => state.auth.activeScreen);

  function handleClickOut(e) {
    if (e.target.id === 'modal-container') {
      switch (screen) {
        case 'deliveries':
          dispatch(setShowDeliveryDetails(false));
          break;

        case 'issues':
          dispatch(setShowIssueDetails(false));
          break;
        default:
          break;
      }
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
