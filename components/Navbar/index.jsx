import React from 'react';
import Link from 'next/link';
import styles from './Navbar.module.scss';

const Logo = () => {
  return <h1>Logo</h1>;
};

const MenuBar = () => {
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
    </div>
  );
};

const Drop = () => {
  return <h1>Drop</h1>;
};

const Navbar = () => {
  return (
    <div
      className={`d-flex bg-white justify-content-between align-items-center ${styles.navbar}`}
    >
      <Logo />
      <MenuBar />
      <Drop />
    </div>
  );
};

export default Navbar;
