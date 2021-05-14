import React, { useState, useEffect } from 'react';
import Modal from 'react-modal';

import { connect } from 'react-redux';
import { deleteItem } from '../../redux/actions/dataActions';

const modalStyles = {
  content: {
    top: '50%',
    left: '50%',
    right: 'auto',
    bottom: 'auto',
    marginRight: '-50%',
    transform: 'translate(-50%, -50%)',
  },
};

const DeleteItem = ({ itemId, deleteItem }) => {
  const [open, setOpen] = useState(false);

  const handleOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  const handleDelete = () => {
    deleteItem(itemId);
    handleClose();
  };

  return (
    <>
      <button className='btn btn-primary' onClick={handleOpen}>
        Delete
      </button>
      <Modal isOpen={open} style={modalStyles}>
        <h1>Are you sure to delete this item?</h1>
        <div>
          <button
            className='btn btn-primary'
            onClick={handleDelete}
            style={{ marginRight: '10px' }}
          >
            Delete Now
          </button>
          <button className='btn btn-primary' onClick={handleClose}>
            Cancel
          </button>
        </div>
      </Modal>
    </>
  );
};

const mapDispatchToProps = (dispatch) => ({
  deleteItem: (itemId) => {
    dispatch(deleteItem(itemId));
  },
});

export default connect(null, mapDispatchToProps)(DeleteItem);
