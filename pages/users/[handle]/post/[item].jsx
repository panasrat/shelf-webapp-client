import React from 'react';
import { useRouter } from 'next/router';
import axios from 'axios';

import Header from '../../../../components/Header';
import ItemDetailsButton from '../../../../components/ItemDetailsButton';

import { connect } from 'react-redux';
// import { putItemsInStates } from '../redux/actions/dataActions';

const post = () => {
  return (
    <>
      <Header title='Post'></Header>
      <main>
        <h1>Item:</h1>
        <ItemDetailsButton itemId='T0ZqJhV5HBINdEBKt1zV' fromUrl />
      </main>
    </>
  );
};

const mapStateToProps = (state) => ({
  likes: state.user.likes,
  credentials: state.user.credentials,
  item: state.data.item,
  UI: state.UI,
});

const mapDispatchToProps = (dispatch) => ({
  getItem: (itemId) => {
    dispatch(getItem(itemId));
  },
  likeItem: (itemId) => {
    dispatch(likeItem(itemId));
  },
  unlikeItem: (itemId) => {
    dispatch(unlikeItem(itemId));
  },
  clearItem: () => {
    dispatch(clearItem());
  },
});

export default connect(mapStateToProps, mapDispatchToProps)(post);
