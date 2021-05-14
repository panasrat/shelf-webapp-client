import React, { useState, useEffect } from 'react';
import Router from 'next/router';
import Link from 'next/link';
import axios from 'axios';
// import { useAuth } from '../../util/auth';

import { connect } from 'react-redux';
import { signupUser } from '../../redux/actions/userActions';

const Signup = ({ UI, signupUser }) => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [handle, setHandle] = useState('');
  const [errors, setErrors] = useState({});
  // const { isAuthenticated, setAuthTrue } = useAuth();

  useEffect(() => {
    if (UI.errors) {
      setErrors(UI.errors);
    }
  }, [UI.errors]);

  const handleSubmit = (event) => {
    event.preventDefault();
    const newUserData = {
      email: email,
      password: password,
      confirmPassword: confirmPassword,
      handle: handle,
    };
    signupUser(newUserData);
  };

  const handleChangeEmail = (event) => {
    // console.log(event.target.value);
    setEmail(event.target.value);
  };

  const handleChangePassword = (event) => {
    // console.log(event.target.value);
    setPassword(event.target.value);
  };

  const handleChangeConfirmPassword = (event) => {
    // console.log(event.target.value);
    setConfirmPassword(event.target.value);
  };

  const handleChangeHandle = (event) => {
    // console.log(event.target.value);
    setHandle(event.target.value);
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
        <div className='form-group'>
          <label>Confirm Password</label>
          <input
            type='password'
            className='form-control'
            id='exampleInputConfirmPassword'
            placeholder='Confirm Password'
            onChange={handleChangeConfirmPassword}
            value={confirmPassword}
          />
        </div>
        <small id='confirmPasswordHelpBlock' className='form-text text-muted'>
          {errors.confirmPassword}
        </small>
        <div className='form-group'>
          <label>Username</label>
          <input
            type='text'
            className='form-control'
            id='exampleInputHandle'
            placeholder='Username'
            onChange={handleChangeHandle}
            value={handle}
          />
        </div>
        <small id='passwordHelpBlock' className='form-text text-muted'>
          {errors.handle}
        </small>
        <button type='submit' className='btn btn-primary' disabled={UI.loading}>
          Signup
        </button>
        <small id='submitHelpBlock' className='form-text text-muted'>
          {errors.general}
        </small>
        <small>
          Already have an account? Login <Link href='/login'>here.</Link>
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
  signupUser,
};

export default connect(mapStateToProps, mapActionToProps)(Signup);
