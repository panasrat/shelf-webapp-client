import React from 'react';
import Link from 'next/link';
import Router from 'next/router';
import styles from './Navbar.module.scss';

import { connect } from 'react-redux';
import { logoutUser } from '../../redux/actions/userActions';

const Logo = () => {
  return <h1>Logo</h1>;
};

const MenuBar = ({ logoutUser }) => {
  const handleLogout = (event) => {
    event.preventDefault();
    logoutUser();
  };
  return (
    <div className='d-flex justify-content-between' style={{ width: '40%' }}>
      <Link href='/login'>
        <a>Login</a>
      </Link>
      <Link href='/'>
        <a>Home</a>
      </Link>
      <Link href='/signup'>
        <a>Singup</a>
      </Link>
      <button className='btn btn-primary' onClick={handleLogout}>
        Logout
      </button>
    </div>
  );
};

const Drop = () => {
  return <h1>Drop</h1>;
};

const Navbar = ({ logoutUser }) => {
  return (
    <div
      className={`d-flex bg-brown text-white justify-content-between align-items-center ${styles.navbar}`}
    >
      <Logo />
      <MenuBar logoutUser={logoutUser} />
      <Drop />
    </div>
  );
};

const mapStateToProps = (state) => ({
  user: state.user,
  UI: state.UI,
});

const mapActionToProps = {
  logoutUser,
};

export default connect(mapStateToProps, mapActionToProps)(Navbar);
