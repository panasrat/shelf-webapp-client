import React, { useState, useEffect } from 'react';
import Modal from 'react-modal';

import { connect } from 'react-redux';
import { editUserDetails } from '../../redux/actions/userActions';

const EditDetails = ({ credentials, editUserDetails }) => {
  const [bio, setBio] = useState('');
  const [location, setLocation] = useState('');
  const [website, setWebsite] = useState('');
  const [open, setOpen] = useState(false);

  useEffect(() => {
    mapUserDetailsToState(credentials);
  }, []);

  const mapUserDetailsToState = (credentials) => {
    setBio(credentials.bio ? credentials.bio : '');
    setLocation(credentials.location ? credentials.location : '');
    setWebsite(credentials.website ? credentials.website : '');
  };

  const handleOpen = () => {
    setOpen(true);
    mapUserDetailsToState(credentials);
  };

  const handleClose = () => {
    setOpen(false);
  };

  const handleChangeBio = (event) => {
    setBio(event.target.value);
  };

  const handleChangeLocation = (event) => {
    setLocation(event.target.value);
  };

  const handleChangeWebsite = (event) => {
    setWebsite(event.target.value);
  };

  const handleSubmit = () => {
    const userDetails = {
      bio: bio,
      location: location,
      website: website,
    };
    editUserDetails(userDetails);
    handleClose();
  };

  return (
    <>
      <button className='btn btn-primary' onClick={handleOpen}>
        Edit Profile
      </button>
      <Modal isOpen={open}>
        <h1>This is {credentials.handle}'s Profile</h1>
        <form onSubmit={handleSubmit}>
          <div className='form-group'>
            <label>Bio</label>
            <input
              className='form-control'
              placeholder='Enter Bio'
              onChange={handleChangeBio}
              value={bio}
            />
          </div>
          <div className='form-group'>
            <label>Location</label>
            <input
              className='form-control'
              placeholder='Enter Location'
              onChange={handleChangeLocation}
              value={location}
            />
          </div>
          <div className='form-group'>
            <label>Website</label>
            <input
              className='form-control'
              placeholder='Enter Website'
              onChange={handleChangeWebsite}
              value={website}
            />
          </div>
          <div>
            <button className='btn btn-primary' type='submit'>
              Save
            </button>
            <button className='btn btn-primary' onClick={handleClose}>
              Cancel
            </button>
          </div>
        </form>
      </Modal>
    </>
  );
};

const mapStateToProps = (state) => ({
  credentials: state.user.credentials,
});

export default connect(mapStateToProps, { editUserDetails })(EditDetails);
