import React, { useState, useEffect } from 'react';
import Modal from 'react-modal';
import dayjs from 'dayjs';

import Item from '../Item';

import { connect } from 'react-redux';
import { getShelf } from '../../redux/actions/dataActions';

const modalStyles = {
  content: {
    top: '55%',
    left: '50%',
    bottom: 'auto',
    marginRight: '-50%',
    transform: 'translate(-50%, -50%)',
  },
};

const Shelf = ({
  shelf: { shelfId, shelfName, createdAt },
  getShelf,
  data: {
    shelf: { items },
  },
  UI: { loading },
}) => {
  const [open, setOpen] = useState(false);

  const detailsMarkup = loading ? (
    <h1>Loading...</h1>
  ) : !items ? null : (
    items.map((item) => <Item key={item.itemId} item={item} />)
  );

  const handleOpen = () => {
    setOpen(true);
    getShelf(shelfId);
  };

  const handleClose = () => {
    setOpen(false);
  };
  return (
    <>
      <div className='bg-pink text-brown'>
        <h4 onClick={handleOpen}>
          <a className='cursor-pointer hover-brown'>{shelfName}</a>
        </h4>
        <p>created on {dayjs(createdAt).format('MMM YYYY')}</p>
      </div>
      <Modal isOpen={open} style={modalStyles}>
        <h3>Items in {shelfName}</h3>
        <button className='btn btn-primary' onClick={handleClose}>
          Cancel
        </button>
        <p>{dayjs(createdAt).format('MMM YYYY')}</p>
        {detailsMarkup}
      </Modal>
    </>
  );
};

const mapStateToProps = (state) => ({
  user: state.user,
  data: state.data,
  UI: state.UI,
});

const mapDispatchToProps = (dispatch) => ({
  getShelf: (shelfId) => {
    dispatch(getShelf(shelfId));
  },
});

export default connect(mapStateToProps, mapDispatchToProps)(Shelf);
