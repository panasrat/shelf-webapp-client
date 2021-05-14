import React from 'react';

import Header from '../components/Header';
import Login from '../components/Login';
import Signup from '../components/Signup';

const login = () => {
  return (
    <>
      <Header title='Login Page' />
      <div className='position-relative d-flex justify-content center nav-offset-m'>
        <div className=''>
          <img src='/images/login-bg.png' width='100%' />
        </div>
        <div
          className='position-absolute center-absolute text-brown'
          style={{ top: '5rem', textAlign: 'center' }}
        >
          <h1 style={{ fontSize: '450%', fontWeight: '900' }}>Shelf</h1>
          <div>Organize your own items</div>
          <div>Let them be yours</div>
        </div>
        <div
          className='position-absolute center-absolute'
          id='login'
          style={{ top: '16rem' }}
        >
          <Login />
        </div>
        <div
          className='position-absolute center-absolute d-flex justify-content-between'
          id='signup'
          style={{ bottom: '10rem', width: '800px' }}
        >
          <div className='text-white d-flex flex-column justify-content-center'>
            <picture>
              <img
                className=''
                alt='shelf'
                src='/icons/logo-pink.svg'
                style={{ width: '200px' }}
              />
            </picture>
            <div style={{ marginTop: '2rem' }}>
              <h3>Shelf organizes your stuff</h3>
              <div>
                No matter what you see it on your everyday, put it on yourshelf,
                and find it whenever you want
              </div>
            </div>
          </div>
          <div style={{ marginLeft: '2rem' }}>
            <h1 className='text-white'>Get yourself a shelf.</h1>
            <Signup />
          </div>
        </div>
      </div>
    </>
  );
};

export default login;
