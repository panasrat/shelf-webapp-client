import React from 'react';
import { connect } from 'react-redux';
import dayjs from 'dayjs';

const SideProfile = ({
  user: {
    authenticated,
    loading,
    credentials: { bio, handle, imageUrl, createdAt },
  },
}) => {
  return (
    <>
      <h2>{handle}</h2>
      <div style={{ width: '300px' }}>
        <img src={imageUrl} style={{ width: '100% ' }} />
      </div>
      {bio && <p>{bio}</p>}
      <p>{dayjs(createdAt).format('MMM YYYY')}</p>
    </>
  );
};

const mapStateToProps = (state) => ({
  user: state.user,
});

export default connect(mapStateToProps)(SideProfile);
