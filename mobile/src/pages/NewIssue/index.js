import React, { useState } from 'react';
import { StatusBar, Alert, ActivityIndicator } from 'react-native';
import PropTypes from 'prop-types';

import api from '~/services/api';

import {
  Container,
  PurpleHeader,
  WhiteContainer,
  CardSeparator,
  IssueDescription,
  SubmitButton,
  SubmitButtonText,
} from './styles';

const NewIssue = ({ navigation, route }) => {
  const [description, setDescription] = useState('');
  const [submitting, setSubmitting] = useState(false);
  const { delivery } = route.params;

  const handleSubmitIssue = async () => {
    setSubmitting(true);
    try {
      await api.post(`delivery/${delivery.id}/problems`, { description });
      setSubmitting(false);
      Alert.alert('Success', 'Issue was registered');
      navigation.goBack();
    } catch (error) {
      setSubmitting(false);
      Alert.alert('Submit error', error.message);
    }
  };

  return (
    <Container>
      <PurpleHeader>
        <StatusBar barStyle="light-content" backgroundColor="#7D40E7" />
        <CardSeparator height="80px" />
        <WhiteContainer>
          <IssueDescription
            value={description}
            maxLength={255}
            multiline
            onChangeText={setDescription}
            style={{ textAlignVertical: 'top' }}
          />
        </WhiteContainer>

        <CardSeparator height="30px" />

        <SubmitButton onPress={handleSubmitIssue}>
          {submitting ? (
            <ActivityIndicator />
          ) : (
            <SubmitButtonText>Submit</SubmitButtonText>
          )}
        </SubmitButton>
      </PurpleHeader>
    </Container>
  );
};

NewIssue.propTypes = {
  navigation: PropTypes.shape().isRequired,
  route: PropTypes.shape().isRequired,
};

export default NewIssue;
