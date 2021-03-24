import React, { useState } from 'react';
import styles from '../styles/pages.module.scss';

import Header from '../components/Header';
import Item from '../components/Item';

const home = ({ items }) => {
  //const [items, setItems] = useState([])
  let recentItemsMarkup = items ? (
    items.map((item) => <Item key={`${item.itemId}`} item={item}></Item>)
  ) : (
    <p>Loading...</p>
  );
  // console.log(recentItemsMarkup);
  return (
    <div className='bg-lightgrey'>
      <Header title='Home Page'></Header>
      <div className='d-flex bg-lightgrey' style={{ padding: '100px' }}>
        <p className='col-8 bg-pink'>{recentItemsMarkup}</p>
        <p className='col-4 bg-brown text-white'>Profile</p>
      </div>
    </div>
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
