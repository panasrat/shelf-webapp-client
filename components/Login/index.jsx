import React, { useState, useContext } from 'react';
import Router from 'next/router';
import Link from 'next/link';
import axios from 'axios';
import { useAuth } from '../../util/auth';

const Login = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [loading, setLoading] = useState(false);
  const [errors, setErrors] = useState({});
  const { isAuthenticated, setAuthTrue } = useAuth();

  const handleSubmit = (event) => {
    event.preventDefault();
    setLoading(true);
    const userData = {
      email: email,
      password: password,
    };
    axios
      .post(
        'https://asia-southeast2-shelf-webapp-de58d.cloudfunctions.net/api/login',
        userData
      )
      .then((res) => {
        localStorage.setItem('FBIdToken', `Bearer ${res.data.token}`);
        setLoading(false);
        setAuthTrue();
        Router.push('/');
      })
      .catch((err) => {
        setErrors(err.response.data);
        setLoading(false);
      });
  };

  const handleChangeEmail = (event) => {
    setEmail(event.target.value);
  };

  const handleChangePassword = (event) => {
    setPassword(event.target.value);
  };

  return (
    <div className='bg-pink' style={{ padding: '50px' }}>
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
        <button type='submit' className='btn btn-primary' disabled={loading}>
          Login
        </button>
        <small id='submitHelpBlock' className='form-text text-muted'>
          {errors.general}
        </small>
        <small>
          Don't have an account? Sign up <Link href='/signup'>here</Link>
        </small>
      </form>
    </div>
  );
};

export default Login;
