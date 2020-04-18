import React from 'react';
import { useDispatch } from 'react-redux';

import { changeScreen } from '../../store/modules/auth/actions';
import { Container } from './styles';
import HeaderRegister from '../../components/RegisterHeader';

export default function Deliverymans() {
  const dispatch = useDispatch();
  dispatch(changeScreen('deliverymans'));
  return (
    <Container>
      <HeaderRegister screenName="deliverymans" showControls />
    </Container>
  );
}
