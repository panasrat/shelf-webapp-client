import React, { useEffect } from 'react';
import axios from 'axios';

import Header from '../../components/Header';
import StaticProfile from '../../components/StaticProfile';
import Item from '../../components/Item';
import Shelf from '../../components/Shelf';
import AddShelf from '../../components/AddShelf';

import { connect } from 'react-redux';
import { putItemsInStates } from '../../redux/actions/dataActions';

const API_URL =
  'https://asia-southeast2-shelf-webapp-de58d.cloudfunctions.net/api';

const user = ({
  userDetails,
  userItems,
  userShelves,
  data,
  user: {
    shelves,
    credentials: { handle },
  },
  putItemsInStates,
}) => {
  useEffect(() => {
    putItemsInStates(userItems);
    console.log('am i run');
  }, []);

  let recentItemsMarkup =
    handle === userDetails.handle
      ? data.items.map((item) => <Item key={item.itemId} item={item} />)
      : userItems.map((item) => <Item key={item.itemId} item={item} />);

  let recentShelvesMarkup =
    handle === userDetails.handle
      ? shelves.map((shelf) => <Shelf key={shelf.shelfId} shelf={shelf} />)
      : userShelves.map((shelf) => <Shelf key={shelf.shelfId} shelf={shelf} />);

  return (
    <>
      <Header />
      <main>
        <StaticProfile user={userDetails} />
        <div
          className='d-flex justify-content-between'
          style={{ padding: '30px 200px' }}
        >
          <div className='bg-brown text-white shadow-box'>
            {handle === userDetails.handle ? <AddShelf /> : null}
            {recentShelvesMarkup}
          </div>
          <div className='col-7 bg-pink shadow-box'>{recentItemsMarkup}</div>
        </div>
      </main>
    </>
  );
};

export const getStaticPaths = async () => {
  const res = await axios.get(API_URL + '/users');
  const allUsers = await res.data;
  const paths = allUsers.map((user) => ({
    params: { handle: user.handle },
  }));
  return { paths, fallback: false };
};

export const getStaticProps = async (context) => {
  const handle = context.params.handle;
  const res = await axios.get(API_URL + `/user/${handle}`);
  const userDetails = await res.data.user;
  const userItems = await res.data.items;
  const userShelves = await res.data.shelves;
  return {
    props: { userDetails, userItems, userShelves },
  };
};

const mapStateToProps = (state) => ({
  user: state.user,
  data: state.data,
});

const mapDispatchToProps = (dispatch) => ({
  putItemsInStates: (items) => {
    dispatch(putItemsInStates(items));
  },
});

export default connect(mapStateToProps, mapDispatchToProps)(user);
