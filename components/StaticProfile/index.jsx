import React from 'react';
import dayjs from 'dayjs';

import EditDetails from '../EditDetails';

import { connect } from 'react-redux';

const StaticProfile = ({
  user: { handle, bio, createdAt, email, imageUrl, location, website },
  credentials,
}) => {
  return (
    <div className='bg-peach'>
      <div className='d-flex flex-column align-items-center'>
        <h1>{handle}</h1>
        <img src={imageUrl} style={{ width: '200px' }} />
        <p>{bio}</p>
        <p>{email}</p>
        <p>{dayjs(createdAt).format('MMM YYYY')}</p>
        {handle === credentials.handle ? <EditDetails /> : null}
      </div>
    </div>
  );
};

const mapStateToProps = (state) => ({
  credentials: state.user.credentials,
});

export default connect(mapStateToProps)(StaticProfile);
