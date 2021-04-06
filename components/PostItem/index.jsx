import React, { useState, useEffect } from 'react';
import Modal from 'react-modal';

import { connect } from 'react-redux';
import { postItem } from '../../redux/actions/dataActions';

const PostItem = ({ postItem, UI }) => {
  const [open, setOpen] = useState(false);
  const [post, setPost] = useState('');
  const [errors, setErrors] = useState({});

  useEffect(() => {
    if (UI.errors) {
      setErrors(UI.errors);
    }
  }, [UI.errors]);

  const handleOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  const handlePost = (event) => {
    event.preventDefault();
    const newPost = {
      body: post,
    };
    postItem(newPost);
    setPost('');
    handleClose();
  };

  const handleChangePost = (event) => {
    setPost(event.target.value);
  };
  return (
    <>
      <button className='btn btn-primary' onClick={handleOpen}>
        Post
      </button>
      <Modal isOpen={open}>
        <h1>Post New Item</h1>
        <form onSubmit={handlePost}>
          <div className='form-group'>
            <input
              className='form-control'
              placeholder='Post Item Here'
              onChange={handleChangePost}
              value={post}
            />
          </div>
          <div>
            <button
              className='btn btn-primary'
              type='submit'
              disabled={post ? false : true}
            >
              Post
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
  UI: state.UI,
});

const mapDispatchToProps = (dispatch) => ({
  postItem: (newPost) => {
    dispatch(postItem(newPost));
  },
});

export default connect(mapStateToProps, mapDispatchToProps)(PostItem);
