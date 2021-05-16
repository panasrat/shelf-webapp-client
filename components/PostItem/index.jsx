import React, { useState, useEffect } from 'react';
import Modal from 'react-modal';

import Select from 'react-select';

import { connect } from 'react-redux';
import { postItem } from '../../redux/actions/dataActions';

const modalStyles = {
  content: {
    top: '50%',
    left: '50%',
    transform: 'translate(-50%, -50%)',
  },
};

const PostItem = ({ postItem, UI, shelves }) => {
  const [open, setOpen] = useState(false);
  const [post, setPost] = useState('');
  const [options, setOptions] = useState([]);
  const [shelfObj, setShelfObj] = useState({});
  const [errors, setErrors] = useState({});

  let shelvesOptions = [];

  useEffect(() => {
    if (UI.errors) {
      setErrors(UI.errors);
    }
  }, [UI.errors]);

  const handleOpen = () => {
    setOpen(true);
    setPost('');
    setShelfObj(null);
    shelves.map((shelf) =>
      shelvesOptions.push({
        value: shelf.shelfId,
        label: shelf.shelfName,
      })
    );
    setOptions(shelvesOptions);
  };

  const handleClose = () => {
    setOpen(false);
  };

  const handlePost = (event) => {
    event.preventDefault();
    const newPost = {
      body: post,
      shelfId: shelfObj.value,
      shelfName: shelfObj.label,
    };
    postItem(newPost);
    setPost('');
    handleClose();
  };

  const handleChangePost = (event) => {
    setPost(event.target.value);
  };

  // const handleChangeShelf = (event) => {
  //   setShelfId(event.value);
  // };

  return (
    <>
      <div
        className='d-flex align-items-center hover-light cursor-pointer'
        onClick={handleOpen}
      >
        <img alt='shelf' src='/icons/post.svg' style={{ width: '25px' }} />
      </div>
      <Modal isOpen={open} style={modalStyles}>
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
          <Select
            placeholder='Select Shelf...'
            options={options}
            // value={options.find((obj) => obj.value === shelfId)}
            onChange={setShelfObj}
          />
          <div style={{ marginTop: '20px' }}>
            <button
              className='btn btn-primary'
              type='submit'
              disabled={post && shelfObj ? false : true}
              style={{ marginRight: '10px' }}
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
  shelves: state.user.shelves,
});

const mapDispatchToProps = (dispatch) => ({
  postItem: (newPost) => {
    dispatch(postItem(newPost));
  },
});

export default connect(mapStateToProps, mapDispatchToProps)(PostItem);
