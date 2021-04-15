import React from 'react';
import axios from 'axios';

import Header from '../../components/Header';

import { connect } from 'react-redux';
import { getUserData } from '../../redux/actions/dataActions';

const user = () => {
  return (
    <>
      <Header />
      <main>
        <h1>hi</h1>
      </main>
    </>
  );
};

const mapStateToProps = (state) => ({
  data: state.data,
});

const mapDispatchToProps = (dispatch) => ({
  getUserData: (handle) => {
    dispatch(getUserData(handle));
  },
});

export default connect(mapStateToProps, mapDispatchToProps)(user);
