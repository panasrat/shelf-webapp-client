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

const MenuBar = ({ logoutUser, authenticated, myHandle }) => {
  const handleLogout = (event) => {
    event.preventDefault();
    logoutUser();
  };
  return (
    <div className='d-flex justify-content-between' style={{ width: '40%' }}>
      <>
        <Link href='/'>
          <a className='cursor-pointer hover-peach'>Home</a>
        </Link>
        <Link href={`/users/${myHandle}`}>
          <a className='cursor-pointer hover-peach'>Me</a>
        </Link>
        <PostItem />
        <button className='btn btn-primary' onClick={handleLogout}>
          Logout
        </button>
      </>
    </div>
  );
};

const Drop = ({ children }) => {
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
      {open ? <DropMenu /> : null}
    </>
  );
};

const DropMenu = () => (
  <div className={`bg-white text-brown shadow-box ${styles.dropdown}`}>Hi</div>
);

const Navbar = ({ logoutUser, authenticated, handle }) => {
  return (
    <>
      <div
        className={`d-flex bg-white text-white justify-content-between align-items-center position-relative fixed-top ${styles.navbar} ${styles.shadow}`}
      >
        <Logo />
        {authenticated ? (
          <>
            <MenuBar
              logoutUser={logoutUser}
              authenticated={authenticated}
              myHandle={handle}
            />
            <Drop />
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
