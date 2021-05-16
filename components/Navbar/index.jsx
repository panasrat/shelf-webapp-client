import React, { useState } from 'react';
import Link from 'next/link';
import styles from './Navbar.module.scss';

import PostItem from '../PostItem';
import NotificationsMenu from '../NotificationsMenu';

import { connect } from 'react-redux';
import { logoutUser } from '../../redux/actions/userActions';

const Logo = () => (
  <div className='cursor-pointer hover-darken'>
    <Link href='/'>
      <picture>
        <img
          className=''
          alt='shelf'
          src='/icons/logo-brown.svg'
          style={{ width: '50px' }}
        />
      </picture>
    </Link>
  </div>
);

const MenuBar = ({ myHandle }) => {
  return (
    <div className='d-flex justify-content-between' style={{ width: '40%' }}>
      <>
        <Link href={`/users/${myHandle}`}>
          <div className='d-flex align-items-center hover-light cursor-pointer'>
            <img
              alt='shelf'
              src='/icons/profile.svg'
              style={{ width: '27px' }}
            />
          </div>
        </Link>
        <Link href='/'>
          <div className='d-flex align-items-center hover-light cursor-pointer'>
            <img alt='shelf' src='/icons/home.svg' style={{ width: '29px' }} />
          </div>
        </Link>
        <div className='d-flex align-items-center cursor-not-allowed'>
          <img alt='shelf' src='/icons/search.svg' style={{ width: '27px' }} />
        </div>
        <PostItem />
      </>
    </div>
  );
};

const Drop = ({ logoutUser }) => {
  const [open, setOpen] = useState(false);

  return (
    <>
      <div
        className='cursor-pointer hover-darken'
        onClick={() => setOpen(!open)}
      >
        <picture>
          <img
            className=''
            alt='shelf'
            src='/icons/dropdown.svg'
            style={{ width: '50px' }}
          />
        </picture>
      </div>
      {open ? <DropMenu logoutUser={logoutUser} /> : null}
    </>
  );
};

const DropMenu = ({ logoutUser }) => {
  const handleLogout = (event) => {
    event.preventDefault();
    logoutUser();
  };
  return (
    <div
      className={`bg-white text-brown shadow-box ${styles.dropdown} border-smooth`}
    >
      <button className='btn btn-primary' onClick={handleLogout}>
        Logout
      </button>
    </div>
  );
};

const Navbar = ({ logoutUser, authenticated, handle }) => {
  return (
    <>
      <div
        className={`d-flex bg-white text-white justify-content-between align-items-center fixed-top ${styles.navbar} ${styles.shadow}`}
      >
        <Logo />
        {authenticated ? (
          <>
            <MenuBar authenticated={authenticated} myHandle={handle} />
            <Drop logoutUser={logoutUser} />
          </>
        ) : null}
      </div>
    </>
  );
};

const mapStateToProps = (state) => ({
  handle: state.user.credentials.handle,
  authenticated: state.user.authenticated,
  UI: state.UI,
});

const mapActionToProps = {
  logoutUser,
};

export default connect(mapStateToProps, mapActionToProps)(Navbar);
