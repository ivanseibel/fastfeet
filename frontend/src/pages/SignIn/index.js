import React from 'react';
import { Link } from 'react-router-dom';
import { Form, Input } from '@rocketseat/unform';

import logo from '../../assets/logo.png';

export default function SignIn() {
  function handleSubmit(data) {
    console.tron.log(data);
  }

  return (
    <>
      <img src={logo} alt="FastFeet" />

      <Form onSubmit={handleSubmit}>
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
