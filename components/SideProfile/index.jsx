import React from 'react';
import Link from 'next/link';
import dayjs from 'dayjs';

import { connect } from 'react-redux';

const SideProfile = ({
  credentials: { bio, handle, imageUrl, createdAt, location, website },
}) => {
  return (
    <div
      className='bg-white shadow-drop border-smooth text-darkgrey'
      style={{ padding: '3rem' }}
    >
      <div className='d-flex' style={{ padding: '0px 1rem 1rem 1rem' }}>
        <Link href={`/users/${handle}`}>
          <img
            className='clip-image-circle hover-darken'
            src={imageUrl}
            style={{ width: '100%' }}
          />
        </Link>
      </div>
      <div className='d-flex justify-content-center'>
        <Link href={`/users/${handle}`}>
          <div
            className='cursor-pointer hover-peach'
            style={{ fontSize: '200%', fontWeight: '700' }}
          >
            @{handle}
          </div>
        </Link>
      </div>
      <div className='text-center' style={{ fontSize: '80%' }}>
        {bio && <div style={{ paddingBottom: '20px' }}>{bio}</div>}
        <div>{location && <div>Live in {location}</div>}</div>
        <div>
          {website && (
            <a href={website} target='_blank'>
              {website}
            </a>
          )}
        </div>
        <div style={{ marginTop: '20px' }}>
          Join since {dayjs(createdAt).format('MMM YYYY')}
        </div>
      </div>
    </div>
  );
};

const mapStateToProps = (state) => ({
  credentials: state.user.credentials,
});

export default connect(mapStateToProps)(SideProfile);
