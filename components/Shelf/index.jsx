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
    marginRight: '-10%',
    transform: 'translate(-50%, -50%)',
  },
};

const Shelf = ({
  shelf: { shelfId, shelfName, createdAt, userHandle },
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
      <div
        className='bg-pink text-darkgrey border-smooth shadow-drop cursor-pointer hover-darken'
        style={{ padding: '10px', marginBottom: '15px' }}
        onClick={handleOpen}
      >
        <div>
          <div
            className='text-center'
            style={{ fontWeight: '700', fontSize: '150%' }}
          >
            {shelfName}
          </div>
        </div>
        <div className='text-center' style={{ marginTop: '10px' }}>
          Created on {dayjs(createdAt).format('DD MMM YYYY')}
        </div>
      </div>
      <Modal isOpen={open} style={modalStyles}>
        <div className='' style={{ padding: '0px 3rem' }}>
          <div>
            <div className='d-flex justify-content-between'>
              <div style={{ fontWeight: '700', fontSize: '200%' }}>
                {shelfName}
              </div>
              <div className='cursor-pointer hover-light' onClick={handleClose}>
                <img
                  alt='shelf'
                  src='/icons/close.svg'
                  style={{ width: '18px' }}
                />
              </div>
            </div>
            <div>Owner: @{userHandle}</div>
            <p>Created on {dayjs(createdAt).format('DD MMM YYYY')}</p>
          </div>
          {detailsMarkup}
        </div>
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
