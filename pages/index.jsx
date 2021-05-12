import React, { useEffect, useState } from 'react';

import Header from '../components/Header';
import Item from '../components/Item';
import SideProfile from '../components/SideProfile';

import { connect } from 'react-redux';
import { putItemsInStates } from '../redux/actions/dataActions';

const home = ({ putItemsInStates, items, data }) => {
  // const [recentItems, setRecentItems] = useState([])

  useEffect(() => {
    putItemsInStates(items);
  }, []);
  let recentItemsMarkup = !data.loading ? (
    data.items.map((item) => <Item key={item.itemId} item={item} />)
  ) : (
    <p>Loading...</p>
  );

  return (
    <>
      <Header title='Home Page' />
      <main style={{ zIndex: '0' }}>
        <div
          className='d-flex justify-content-between'
          style={{ padding: '30px 200px' }}
        >
          <div className='bg-brown text-white shadow-box' style={{}}>
            <SideProfile />
          </div>
          <div className='col-7 bg-pink shadow-box' style={{}}>
            {recentItemsMarkup}
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
