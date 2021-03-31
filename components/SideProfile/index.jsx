import React from 'react';
import Link from 'next/link';
import dayjs from 'dayjs';

import { connect } from 'react-redux';
import { logoutUser, uploadImage } from '../../redux/actions/userActions';

const SideProfile = ({
  user: {
    authenticated,
    loading,
    credentials: { bio, handle, imageUrl, createdAt },
  },
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
    <>
      <Link href={`users/${handle}`}>
        <h2 className='cursor-pointer hover-peach'>@{handle}</h2>
      </Link>
      <div style={{ width: '300px' }}>
        <img src={imageUrl} style={{ width: '100% ' }} />
        <input
          type='file'
          id='imageInput'
          hidden='hidden'
          onChange={handleImageChange}
        />
        <button className='btn btn-primary' onClick={handleEditPicture}>
          Change Image
        </button>
      </div>
      {bio && <p>{bio}</p>}
      <p>{dayjs(createdAt).format('MMM YYYY')}</p>
    </>
  );
};

const mapStateToProps = (state) => ({
  user: state.user,
});

const mapActionsToProp = { logoutUser, uploadImage };

export default connect(mapStateToProps, mapActionsToProp)(SideProfile);
