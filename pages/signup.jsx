import React from 'react';

import Header from '../components/Header';
import Signup from '../components/Signup';

const signup = () => {
  return (
    <>
      <Header title='Sign Up Page'></Header>
      <main>
        <Signup />
      </main>
    </>
  );
};

export default signup;
