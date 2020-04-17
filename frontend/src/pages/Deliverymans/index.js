import React from 'react';

import { Container } from './styles';
import HeaderRegister from '../../components/RegisterHeader';

export default function Deliverymans() {
  const screenName = 'deliverymans';
  return (
    <Container>
      <HeaderRegister screenName={screenName} showControls />
    </Container>
  );
}
