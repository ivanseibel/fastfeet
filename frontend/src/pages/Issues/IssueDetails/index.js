import React from 'react';
import { useSelector } from 'react-redux';

import * as S from './styles';

export default function IssueDetails(props) {
  const issueDescription = useSelector(
    (state) => state.issues.issueDetails.description
  );

  return (
    <S.Container>
      <h4>Issue description</h4>
      <p>{issueDescription}</p>
    </S.Container>
  );
}
