import React from 'react';

import Header from '../components/Header';
import Login from '../components/Login';

const login = () => {
  return (
    <>
      <Header title='Login Page'></Header>
      <main>
        <Login />
      </main>
    </>
  );
};

export default login;
