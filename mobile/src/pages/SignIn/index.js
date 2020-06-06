import React, { useState, useEffect } from 'react';
import PropTypes from 'prop-types';
import { useDispatch, useSelector } from 'react-redux';

import { StatusBar, Image, ActivityIndicator } from 'react-native';
import { Container, Input, SubmitButton, ButtonLabel } from './styles';

import logo from '~/assets/logo.png';

import { signInRequest } from '~/store/modules/auth/actions';

const SignIn = ({ navigation }) => {
  const [id, setId] = useState();
  const dispatch = useDispatch();
  const loading = useSelector(state => state.auth.loading);
  const signed = useSelector(state => state.auth.signed);

  useEffect(() => {
    if (signed) {
      navigation.navigate('Dashboard');
    }
  }, [signed]);

  const handleLogin = () => {
    dispatch(signInRequest(id));
  };

  return (
    <Container>
      <StatusBar barStyle="light-content" backgroundColor="#7D40E7" />

      <Image source={logo} />

      <Input onChangeText={setId} value={id} />
      <SubmitButton onPress={handleLogin} loading={loading}>
        {loading ? (
          <ActivityIndicator size="small" color="fff" />
        ) : (
          <ButtonLabel>Login</ButtonLabel>
        )}
      </SubmitButton>
    </Container>
  );
};

SignIn.propTypes = {
  navigation: PropTypes.shape().isRequired,
};

export default SignIn;
