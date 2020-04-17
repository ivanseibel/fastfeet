import React from 'react';

import { Container } from './styles';
import RegisterHeader from '../../components/RegisterHeader';

export default function Issues() {
  const screenName = 'issues';
  return (
    <Container>
      <RegisterHeader screenName={screenName} showControls={false} />
    </Container>
  );
}
