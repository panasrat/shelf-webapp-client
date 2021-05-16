import React from 'react';
import Link from 'next/link';
import dayjs from 'dayjs';

import EditDetails from '../EditDetails';

import { connect } from 'react-redux';
import { uploadImage } from '../../redux/actions/userActions';

const StaticProfile = ({
  user: { handle, bio, createdAt, email, imageUrl, location, website },
  credentials,
  uploadImage,
}) => {
  const handleImageChange = (event) => {
    const image = event.target.files[0];
    const formData = new FormData();
    formData.append('image', image, image.name);
    uploadImage(formData);
  };

  const handleEditPicture = () => {
    const fileInput = document.getElementById('imageInput');
    fileInput.click();
  };

  return (
    <div className='bg-white shadow-drop'>
      <div className='d-flex flex-column align-items-center'>
        <div style={{ paddingTop: '50px', width: '15rem' }}>
          <img
            className='clip-image-circle'
            src={imageUrl}
            style={{ width: '100%' }}
          />
        </div>
        <div className='d-flex justify-content-end' style={{ width: '250px' }}>
          {handle === credentials.handle ? (
            <>
              <input
                type='file'
                id='imageInput'
                hidden='hidden'
                onChange={handleImageChange}
              />
              <div
                className='d-flex align-items-center cursor-pointer'
                onClick={handleEditPicture}
              >
                <img
                  alt='shelf'
                  src='/icons/edit-pic.svg'
                  style={{ width: '15px' }}
                />
              </div>
            </>
          ) : null}
        </div>
        <div
          className='d-flex justify-content-center text-darkgrey'
          style={{ marginTop: '10px' }}
        >
          <Link href={`/users/${handle}`}>
            <div
              className='cursor-pointer hover-peach'
              style={{
                fontSize: '200%',
                fontWeight: '700',
                paddingBottom: '10px',
              }}
            >
              @{handle}
            </div>
          </Link>
        </div>
        <div className='text-center' style={{ fontSize: '90%' }}>
          {bio && <div>{credentials.bio}</div>}
          <div>{location && <div>Live in {credentials.location}</div>}</div>
          <div>
            {website && (
              <a href={credentials.website} target='_blank'>
                {credentials.website}
              </a>
            )}
          </div>
          <div style={{ marginTop: '20px' }}>
            Join since {dayjs(createdAt).format('MMM YYYY')}
          </div>
        </div>
        <div className='d-flex' style={{ width: '250px' }}>
          {handle === credentials.handle ? <EditDetails /> : null}
        </div>
        <div
          className='bg-lightgrey'
          style={{
            width: '100%',
            height: '1px',
            margin: '15px 0px 7px 0px',
          }}
        ></div>
      </div>
    </div>
  );
};

const mapStateToProps = (state) => ({
  credentials: state.user.credentials,
});

const mapActionsToProp = { uploadImage };

export default connect(mapStateToProps, mapActionsToProp)(StaticProfile);
