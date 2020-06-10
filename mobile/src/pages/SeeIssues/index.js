import React, { useState } from 'react';
import { StatusBar, Alert, TouchableWithoutFeedback } from 'react-native';

import {
  Container,
  PurpleHeader,
  IssuesList,
  Card,
  Title,
  CardDescription,
  CardDate,
  EmptyListText,
  RowSeparator,
} from './styles';

const SeeIssues = () => {
  const [issues, setIssues] = useState([
    {
      id: 3,
      description:
        'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Mauris in sagittis nisl, id interdum sem. Integer non ante et tellus viverra tristique vel eget neque. Proin in sagittis ligula. ',
      created_at: '2020-05-21T21:57:27.113Z',
      formattedDate: '2020-05-21',
    },
    {
      id: 4,
      description: 'This problem is very important as well!',
      created_at: '2020-05-26T18:50:34.052Z',
      formattedDate: '2020-05-26',
    },
    {
      id: 5,
      description: 'Problema na entrega 2.',
      created_at: '2020-06-09T21:47:02.108Z',
      formattedDate: '2020-06-09',
    },
    {
      id: 6,
      description: 'Problema na entrega 2.',
      created_at: '2020-06-09T21:47:02.108Z',
      formattedDate: '2020-06-09',
    },
    {
      id: 7,
      description: 'Problema na entrega 2.',
      created_at: '2020-06-09T21:47:02.108Z',
      formattedDate: '2020-06-09',
    },
    {
      id: 8,
      description: 'Problema na entrega 2.',
      created_at: '2020-06-09T21:47:02.108Z',
      formattedDate: '2020-06-09',
    },
    {
      id: 9,
      description: 'Problema na entrega 2.',
      created_at: '2020-06-09T21:47:02.108Z',
      formattedDate: '2020-06-09',
    },
    {
      id: 10,
      description: 'Problema na entrega 10.',
      created_at: '2020-06-09T21:47:02.108Z',
      formattedDate: '2020-06-09',
    },
  ]);

  return (
    <Container>
      <IssuesList
        data={issues}
        keyExtractor={(item) => String(item.id)}
        showsVerticalScrollIndicator={false}
        ListEmptyComponent={<Card />}
        renderItem={({ item }) => (
          <TouchableWithoutFeedback onPress={() => {}}>
            <>
              <Card>
                <CardDescription>{item.description}</CardDescription>
                <CardDate>{item.formattedDate}</CardDate>
              </Card>
              <RowSeparator height="10px" />
            </>
          </TouchableWithoutFeedback>
        )}
      />
      <PurpleHeader>
        <StatusBar barStyle="light-content" backgroundColor="#7D40E7" />

        <RowSeparator height="70px" />

        <Title>Delivery 1</Title>

        <RowSeparator height="15px" />

        <RowSeparator height="30px" />
      </PurpleHeader>
    </Container>
  );
};

export default SeeIssues;
