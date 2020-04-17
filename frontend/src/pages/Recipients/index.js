import React from 'react';

import { Container } from './styles';
import RegisterHeader from '../../components/RegisterHeader';

export default function Recipients() {
  const screenName = 'recipients';
  return (
    <Container>
      <RegisterHeader screenName={screenName} showControls />
    </Container>
  );
}
