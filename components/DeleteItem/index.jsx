import React, { useState } from 'react';
import Modal from 'react-modal';

import { connect } from 'react-redux';
import { deleteItem } from '../../redux/actions/dataActions';

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
      <Modal isOpen={open}>
        <h1>Are you sure to delete {itemId} item?</h1>
        <div>
          <button className='btn btn-primary' onClick={handleDelete}>
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
