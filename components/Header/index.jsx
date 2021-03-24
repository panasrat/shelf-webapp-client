import React from 'react';
import Head from 'next/head';
import Navbar from '../Navbar';

const Header = ({ title }) => {
  return (
    <div>
      <Head>
        <title>{title}</title>
      </Head>
      <Navbar />
    </div>
  );
};

export default Header;
