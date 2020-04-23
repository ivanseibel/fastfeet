import styled from 'styled-components';

export const ModalContainer = styled.div`
  display: ${(props) => (props.visible ? 'flex' : 'none')};

  position: fixed;
  top: 0;
  left: 0;
  z-index: 9;

  width: 100%;
  height: 100%;

  background: rgba(0, 0, 0, 0.3);
`;

export const ModalContent = styled.div`
  max-width: 450px;
  max-height: 350px;
  height: 100%;
  width: 100%;

  margin: auto;
  padding: 25px;

  background: #fff;

  border: 0;
  border-radius: 4px;
  box-shadow: 0px 0px 10px #00000033;
`;
