import React, { useState, useEffect } from 'react';
import { StatusBar, Alert, TouchableWithoutFeedback } from 'react-native';

import { format, parseISO } from 'date-fns';
import api from '~/services/api';

import {
  Container,
  PurpleHeader,
  IssuesList,
  Card,
  Title,
  CardDescription,
  CardDate,
  CardEmptyDescription,
  RowSeparator,
} from './styles';

const SeeIssues = ({ route }) => {
  const [issues, setIssues] = useState([]);
  const { id } = route.params;

  useEffect(() => {
    const loadIssues = async () => {
      try {
        const { data } = await api.get(`delivery/${id}/problems`);

        if (data.count === 0) {
          return;
        }

        const loadedIssues = data.rows[0].problem;

        setIssues(
          loadedIssues.map((issue) => {
            return {
              ...issue,
              formattedDate: format(parseISO(issue.created_at), 'yyyy-MM-dd'),
            };
          })
        );
      } catch (error) {
        Alert.alert('Network error', error.message);
      }
    };

    loadIssues();
  }, []);

  return (
    <Container>
      <IssuesList
        data={issues}
        keyExtractor={(item) => String(item.id)}
        showsVerticalScrollIndicator={false}
        ListEmptyComponent={
          <Card>
            <CardEmptyDescription>No issues found</CardEmptyDescription>
          </Card>
        }
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

        <Title>Delivery {id}</Title>

        <RowSeparator height="15px" />

        <RowSeparator height="30px" />
      </PurpleHeader>
    </Container>
  );
};

export default SeeIssues;
