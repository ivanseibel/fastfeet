import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import * as Yup from 'yup';
import { Form, Input } from '@rocketseat/unform';

import { signInRequest } from '../../store/modules/auth/actions';
import logo from '../../assets/logo.svg';

export default function SignIn() {
  const schema = Yup.object().shape({
    email: Yup.string('Email must be a string')
      .email('Must be a valid email')
      .required('Email is required'),
    password: Yup.string().required('Password is required'),
  });

  const dispatch = useDispatch();
  const loading = useSelector((state) => state.auth.loading);

  function handleSubmit({ email, password }) {
    dispatch(signInRequest(email, password));
  }

  return (
    <>
      <img src={logo} alt="FastFeet" />

      <Form onSubmit={handleSubmit} schema={schema}>
        <strong>YOUR EMAIL</strong>
        <Input
          type="email"
          id="email"
          name="email"
          placeholder="example@email.com"
        />
        <strong>YOUR PASSWORD</strong>
        <Input
          type="password"
          id="password"
          name="password"
          placeholder="******"
        />

        <button type="submit">{loading ? 'Loading...' : 'Login'}</button>
      </Form>
    </>
  );
}
