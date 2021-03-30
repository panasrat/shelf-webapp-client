import React, { useEffect, useState } from 'react';
import Router from 'next/router';
import jwtDecode from 'jwt-decode';
import styles from '../styles/pages.module.scss';

import Header from '../components/Header';
import Item from '../components/Item';
import SideProfile from '../components/SideProfile';

const home = ({ items }) => {
  // console.log(items);
  let recentItemsMarkup = items ? (
    items.map((item) => <Item key={item.itemId} item={item}></Item>)
  ) : (
    <p>Loading...</p>
  );

  return (
    <>
      <Header title='Home Page'></Header>
      <main>
        <div className='d-flex bg-lightgrey' style={{ padding: '20px 100px' }}>
          <div className='col-8 bg-pink'>{recentItemsMarkup}</div>
          <div className='col-4 bg-brown text-white'>
            <SideProfile></SideProfile>
          </div>
        </div>
      </main>
    </>
  );
};

export const getStaticProps = async () => {
  const res = await fetch(
    `https://asia-southeast2-shelf-webapp-de58d.cloudfunctions.net/api/items`
  );
  const items = await res.json();
  return {
    props: { items },
  };
};

export default home;
