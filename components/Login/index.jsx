import React, { useState, useContext, useEffect } from 'react';
import Router from 'next/router';
import Link from 'next/link';
import axios from 'axios';
// import { useAuth } from '../../util/auth';

import { connect } from 'react-redux';
import { loginUser } from '../../redux/actions/userActions';

const Login = ({ UI, loginUser }) => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [errors, setErrors] = useState({});
  // const { isAuthenticated, setAuthTrue } = useAuth();

  useEffect(() => {
    if (UI.errors) {
      setErrors(UI.errors);
    }
  }, [UI.errors]);

  const handleSubmit = (event) => {
    event.preventDefault();
    const userData = {
      email: email,
      password: password,
    };
    loginUser(userData);
  };

  const handleChangeEmail = (event) => {
    setEmail(event.target.value);
  };

  const handleChangePassword = (event) => {
    setPassword(event.target.value);
  };

  return (
    <div
      className='bg-white shadow-drop border-smooth'
      style={{ padding: '30px', width: '400px' }}
    >
      <form noValidate onSubmit={handleSubmit}>
        <div className='form-group'>
          <label>Email address</label>
          <input
            type='email'
            className='form-control'
            id='exampleInputEmail1'
            aria-describedby='emailHelp'
            placeholder='Enter email'
            onChange={handleChangeEmail}
            value={email}
          />
        </div>
        <small id='emailHelpBlock' className='form-text text-muted'>
          {errors.email}
        </small>
        <div className='form-group'>
          <label>Password</label>
          <input
            type='password'
            className='form-control'
            id='exampleInputPassword1'
            placeholder='Password'
            onChange={handleChangePassword}
            value={password}
          />
        </div>
        <small id='passwordHelpBlock' className='form-text text-muted'>
          {errors.password}
        </small>
        <button type='submit' className='btn btn-primary'>
          Login
        </button>
        <small id='submitHelpBlock' className='form-text text-muted'>
          {errors.general}
        </small>
        <small>
          Don't have an account? Sign up <a href='#signup'>here</a>
        </small>
      </form>
    </div>
  );
};

const mapStateToProps = (state) => ({
  user: state.user,
  UI: state.UI,
});

const mapActionToProps = {
  loginUser,
};

export default connect(mapStateToProps, mapActionToProps)(Login);
