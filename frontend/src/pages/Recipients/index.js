import React from 'react';
import { useDispatch } from 'react-redux';

import { changeScreen } from '../../store/modules/auth/actions';
import { Container } from './styles';
import RegisterHeader from '../../components/RegisterHeader';

export default function Recipients() {
  const dispatch = useDispatch();
  dispatch(changeScreen('recipients'));

  return (
    <Container>
      <RegisterHeader screenName="recipients" showControls />
    </Container>
  );
}
