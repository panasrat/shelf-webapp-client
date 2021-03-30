import React from 'react';
import Head from 'next/head';
import Navbar from '../Navbar';

const Header = ({ title }) => {
  return (
    <>
      <Head>
        <title>{title}</title>
      </Head>
      <Navbar />
    </>
  );
};

export default Header;
