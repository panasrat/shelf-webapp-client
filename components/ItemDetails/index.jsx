import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import Modal from 'react-modal';
import dayjs from 'dayjs';
import relativeTime from 'dayjs/plugin/relativeTime';

import DeleteItem from '../DeleteItem';

import { connect } from 'react-redux';
import { getItem, likeItem, unlikeItem } from '../../redux/actions/dataActions';

const ItemDetails = ({
  itemId,
  getItem,
  item: { userImage, createdAt, body, userHandle, likeCount, commentCount },
  UI: { loading },
  user,
  likeItem,
  unlikeItem,
}) => {
  const [open, setOpen] = useState(false);
  const [isLiked, setIsLiked] = useState(
    user.likes && user.likes.find((like) => like.itemId === itemId)
      ? true
      : false
  );

  const isUser = userHandle === user.credentials.handle ? true : false;

  dayjs.extend(relativeTime);

  const handleLike = () => {
    setIsLiked(!isLiked);
    likeItem(itemId);
  };

  const handleUnlike = () => {
    setIsLiked(!isLiked);
    unlikeItem(itemId);
  };

  const handleOpen = () => {
    setOpen(true);
    getItem(itemId);
  };

  const handleClose = () => {
    setOpen(false);
  };

  const detailsMarkup = loading ? (
    <h1>Loading...</h1>
  ) : (
    <div className='card' style={{ width: '18rem', marginBottom: '1rem' }}>
      <img className='card-img-top' src={`${userImage}`} />
      <div className='card-body'>
        <p className='card-subtitle text-muted'>{dayjs(createdAt).fromNow()}</p>
        <p className='card-text'>{body}</p>
        <Link href={`/users/${userHandle}`}>
          <a className='card-text'>{userHandle}</a>
        </Link>
        <br />
        {isLiked ? (
          <button onClick={handleUnlike}>undo like</button>
        ) : (
          <button onClick={handleLike}>do like</button>
        )}
        <span> {likeCount}</span>
        <p>
          comment: <span>{commentCount}</span>
        </p>
        {isUser ? <DeleteItem itemId={itemId} /> : null}
      </div>
    </div>
  );
  return (
    <>
      <button className='btn btn-primary' onClick={handleOpen}>
        Item Details
      </button>
      <Modal isOpen={open}>
        <h1>Details</h1>
        <button className='btn btn-primary' onClick={handleClose}>
          Close
        </button>
        {detailsMarkup}
      </Modal>
    </>
  );
};

const mapsStateToProps = (state) => ({
  user: state.user,
  item: state.data.item,
  UI: state.UI,
});

const mapDispatchToProps = (dispatch) => ({
  getItem: (itemId) => {
    dispatch(getItem(itemId));
  },
  likeItem: (itemId) => {
    dispatch(likeItem(itemId));
  },
  unlikeItem: (itemId) => {
    dispatch(unlikeItem(itemId));
  },
});

export default connect(mapsStateToProps, mapDispatchToProps)(ItemDetails);
