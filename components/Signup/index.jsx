import React, { useState } from 'react';
import Router from 'next/router';
import Link from 'next/link';
import axios from 'axios';

const Signup = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [handle, setHandle] = useState('');
  const [loading, setLoading] = useState(false);
  const [errors, setErrors] = useState({});

  const handleSubmit = (event) => {
    event.preventDefault();
    setLoading(true);
    const newUserData = {
      email: email,
      password: password,
      confirmPassword: confirmPassword,
      handle: handle,
    };
    axios
      .post(
        'https://asia-southeast2-shelf-webapp-de58d.cloudfunctions.net/api/signup',
        newUserData
      )
      .then((res) => {
        localStorage.setItem('FBIdToken', `Bearer ${res.data.token}`);
        console.log(res.data);
        setLoading(false);
        Router.push('/');
      })
      .catch((err) => {
        // console.log('ERR');
        // console.error(err);
        setErrors(err.response.data);
        setLoading(false);
      });
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
        <button type='submit' className='btn btn-primary' disabled={loading}>
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

export default Signup;
