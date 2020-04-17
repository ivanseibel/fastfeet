import React from 'react';

import { Container } from './styles';
import HeaderRegister from '../../components/RegisterHeader';

export default function Deliveries() {
  const screenName = 'deliveries';
  return (
    <Container>
      <HeaderRegister screenName={screenName} showControls />
    </Container>
  );
}
