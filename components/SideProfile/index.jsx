import React from 'react';
import { connect } from 'react-redux';
import dayjs from 'dayjs';

const SideProfile = ({ user, loading }) => {
  return <div>Hi</div>;
};

const mapStateToProps = (state) => ({
  user: state.user,
});

export default connect(mapStateToProps)(SideProfile);
