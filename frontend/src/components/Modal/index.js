import React from 'react';

import { ModalContainer, ModalContent } from './styles';

export default function Modal(props) {
  const { visible, children, toggleShowModal } = props;

  function handleClickOut(e) {
    if (e.target.id === 'modal-container') {
      toggleShowModal();
    }
  }

  return (
    <ModalContainer
      visible={visible}
      onClick={handleClickOut}
      id="modal-container"
    >
      <ModalContent onClick={null}>
        <h1>{children}</h1>
      </ModalContent>
    </ModalContainer>
  );
}
