import React from 'react';
import { useDispatch } from 'react-redux';

import { changeScreen } from '../../store/modules/auth/actions';
import { Container } from './styles';
import HeaderRegister from '../../components/RegisterHeader';

export default function Deliveries() {
  const dispatch = useDispatch();

  dispatch(changeScreen('deliveries'));

  return (
    <Container>
      <HeaderRegister screenName="deliveries" showControls />
    </Container>
  );
}
