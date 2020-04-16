import React from 'react';
import { Link } from 'react-router-dom';

// import { Container } from './styles';

import logo from '../../assets/logo.png';

export default function SignIn() {
  return (
    <>
      <img src={logo} alt="GoBarber" />

      <form>
        <label htmlFor="email">YOUR EMAIL</label>
        <input type="email" id="email" placeholder="example@email.com" />
        <label htmlFor="email">YOUR PASSWORD</label>
        <input type="password" id="password" placeholder="******" />

        <button type="submit">Login</button>
      </form>
    </>
  );
}
