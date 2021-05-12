import React, { useState, useEffect } from 'react';
import Modal from 'react-modal';

import { connect } from 'react-redux';
import { addShelf } from '../../redux/actions/userActions';

const AddShelf = ({ addShelf }) => {
  const [open, setOpen] = useState(false);
  const [shelfName, setShelfName] = useState('');

  const handleOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  const handleShelf = (event) => {
    event.preventDefault();
    const newShelf = {
      body: shelfName,
    };
    addShelf(newShelf);
    console.log(newShelf);
    setShelfName('');
    handleClose();
  };

  const handleChangeShelf = (event) => {
    setShelfName(event.target.value);
  };
  return (
    <>
      <button className='btn btn-primary' onClick={handleOpen}>
        Add Shelf
      </button>
      <Modal isOpen={open}>
        <h1>Add New Shelf</h1>
        <form onSubmit={handleShelf}>
          <div className='form-group'>
            <input
              className='form-control'
              placeholder='New Shelf...'
              onChange={handleChangeShelf}
              value={shelfName}
            />
          </div>
          <div>
            <button
              className='btn btn-primary'
              type='submit'
              disabled={shelfName.trim() ? false : true}
            >
              Add Shelf
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
  addShelf: (newShelf) => {
    dispatch(addShelf(newShelf));
  },
});

export default connect(mapStateToProps, mapDispatchToProps)(AddShelf);
