import React, { useState } from 'react';
import styles from '../styles/pages.module.scss';

import Header from '../components/Header';
import Item from '../components/Item';

const home = ({ items }) => {
  // console.log(items);
  let recentItemsMarkup = items ? (
    items.map((item) => <Item key={item.itemId} item={item}></Item>)
  ) : (
    <p>Loading...</p>
  );
  // console.log(recentItemsMarkup);
  return (
    <>
      <Header title='Home Page'></Header>
      <main>
        <div className='d-flex bg-lightgrey' style={{ padding: '20px 100px' }}>
          <div className='col-8 bg-pink'>{recentItemsMarkup}</div>
          <p className='col-4 bg-brown text-white'>Profile</p>
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
