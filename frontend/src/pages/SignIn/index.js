import React from 'react';
import * as Yup from 'yup';
import { Link } from 'react-router-dom';
import { Form, Input } from '@rocketseat/unform';

import logo from '../../assets/logo.png';

export default function SignIn() {
  const schema = Yup.object().shape({
    email: Yup.string('Email must be a string')
      .email('Must be a valid email')
      .required('Email is required'),
    password: Yup.string().required('Password is required'),
  });

  function handleSubmit(data) {
    console.tron.log(data);
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

        <button type="submit">Login</button>
      </Form>
    </>
  );
}
