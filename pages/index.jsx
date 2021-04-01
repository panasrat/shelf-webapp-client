import React, { useEffect, useState } from 'react';
import Link from 'next/link';
// import dynamic from 'next/dynamic';
import styles from '../styles/pages.module.scss';

import Header from '../components/Header';
import Item from '../components/Item';
import SideProfile from '../components/SideProfile';

import { connect } from 'react-redux';
import { putItemsInStates } from '../redux/actions/dataActions';

const home = ({ putItemsInStates, items, loading }) => {
  // const [recentItems, setRecentItems] = useState([])

  useEffect(() => {
    putItemsInStates(items);
  }, []);
  // console.log(items);
  let recentItemsMarkup = !loading ? (
    items.map((item) => <Item key={item.itemId} item={item} />)
  ) : (
    <p>Loading...</p>
  );

  return (
    <>
      <Header title='Home Page' />
      <main>
        <div className='d-flex bg-lightgrey' style={{ padding: '20px 100px' }}>
          <div className='col-8 bg-pink'>{recentItemsMarkup}</div>
          <div className='col-4 bg-brown text-white'>
            <SideProfile />
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

const mapStateToProps = (state) => ({
  data: state.data,
});

const mapActionToProps = {
  putItemsInStates,
};

export default connect(mapStateToProps, mapActionToProps)(home);
