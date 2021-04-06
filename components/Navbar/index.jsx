import React from 'react';
import Link from 'next/link';
import Router from 'next/router';
import Modal from 'react-modal';
import styles from './Navbar.module.scss';

import PostItem from '../PostItem';

import { connect } from 'react-redux';
import { logoutUser } from '../../redux/actions/userActions';

const Logo = () => {
  return <h1>Logo</h1>;
};

const MenuBar = ({ logoutUser, authenticated }) => {
  const handleLogout = (event) => {
    event.preventDefault();
    logoutUser();
  };
  return (
    <div className='d-flex justify-content-between' style={{ width: '40%' }}>
      {authenticated ? (
        <>
          <Link href='/'>
            <a className='cursor-pointer hover-peach'>Home</a>
          </Link>
          <PostItem />
          <button className='btn btn-primary'>Noti</button>
          <button className='btn btn-primary' onClick={handleLogout}>
            Logout
          </button>
        </>
      ) : (
        <>
          <Link href='/login'>
            <a>Login</a>
          </Link>
          <Link href='/signup'>
            <a>Signup</a>
          </Link>
        </>
      )}
    </div>
  );
};

const Drop = () => {
  return <h1>Drop</h1>;
};

const Navbar = ({ logoutUser, authenticated }) => {
  return (
    <div
      className={`d-flex bg-brown text-white justify-content-between align-items-center ${styles.navbar}`}
    >
      <Logo />
      <MenuBar logoutUser={logoutUser} authenticated={authenticated} />
      <Drop />
    </div>
  );
};

const mapStateToProps = (state) => ({
  user: state.user,
  authenticated: state.user.authenticated,
  UI: state.UI,
});

const mapActionToProps = {
  logoutUser,
};

export default connect(mapStateToProps, mapActionToProps)(Navbar);
