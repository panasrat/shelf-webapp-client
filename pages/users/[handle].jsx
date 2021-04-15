import React, { useEffect } from 'react';
import axios from 'axios';

import Header from '../../components/Header';
import StaticProfile from '../../components/StaticProfile';
import Item from '../../components/Item';

import { connect } from 'react-redux';
import { putItemsInStates } from '../../redux/actions/dataActions';

const API_URL =
  'https://asia-southeast2-shelf-webapp-de58d.cloudfunctions.net/api';

const user = ({ userDetails, userItems, data, putItemsInStates }) => {
  useEffect(() => {
    putItemsInStates(userItems);
  }, []);

  let recentItemsMarkup = !data.loading ? (
    data.items.map((item) => <Item key={item.itemId} item={item} />)
  ) : (
    <p>Loading...</p>
  );
  return (
    <>
      <Header />
      <main>
        <StaticProfile user={userDetails} />
        <div className='d-flex justify-content-center'>
          <div className='col-8 bg-pink'>{recentItemsMarkup}</div>
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
  return {
    props: { userDetails, userItems },
  };
};

const mapStateToProps = (state) => ({
  data: state.data,
});

const mapDispatchToProps = (dispatch) => ({
  putItemsInStates: (items) => {
    dispatch(putItemsInStates(items));
  },
});

export default connect(mapStateToProps, mapDispatchToProps)(user);
