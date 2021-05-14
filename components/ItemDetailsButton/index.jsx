import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import Modal from 'react-modal';
import dayjs from 'dayjs';
import relativeTime from 'dayjs/plugin/relativeTime';

import DeleteItem from '../DeleteItem';
import Comments from '../Comments';
import CommentForm from '../CommentForm';

import styles from './ItemDetailsButton.module.scss';

import { connect } from 'react-redux';
import {
  getItem,
  likeItem,
  unlikeItem,
  clearItem,
} from '../../redux/actions/dataActions';

const modalStyles = {
  content: {
    top: '30%',
    left: '50%',
    transform: 'translate(-50%, -20%)',
  },
};

const ItemDetailsButton = ({
  fromUrl,
  itemId,
  getItem,
  item: {
    userImage,
    createdAt,
    body,
    userHandle,
    likeCount,
    commentCount,
    comments,
  },
  UI: { loading },
  likes,
  credentials,
  likeItem,
  unlikeItem,
  clearItem,
}) => {
  const [open, setOpen] = useState(false);
  const [isLiked, setIsLiked] = useState();

  const isUser = userHandle === credentials.handle ? true : false;

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
    setIsLiked(
      likes && likes.find((like) => like.itemId === itemId) ? true : false
    );
    getItem(itemId);
  };

  const handleClose = () => {
    setOpen(false);
    clearItem();
  };

  const detailsMarkup = loading ? (
    <h1>Loading...</h1>
  ) : (
    <div className='d-flex' style={{ marginBottom: '1rem' }}>
      <div className={styles.cardHorizontal}>
        <img
          className='card-img-top'
          src={userImage}
          style={{ width: '300px', height: '300px' }}
        />
        <div className='card-body'>
          <p className='card-subtitle text-muted'>
            {dayjs(createdAt).fromNow()}
          </p>
          <p className='card-text'>{body}</p>
          <Link href={`/users/${userHandle}`}>
            <a className='card-text'>{userHandle}</a>
          </Link>
          <br />
          {(
            likes && likes.find((like) => like.itemId === itemId) ? true : false
          ) ? (
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
    </div>
  );
  return (
    <>
      <button className='btn btn-primary' onClick={handleOpen}>
        Item Details
      </button>
      <Modal isOpen={open} style={modalStyles}>
        <h1>Details</h1>
        <button className='btn btn-primary' onClick={handleClose}>
          Close
        </button>
        {detailsMarkup}
        <h4>Comments</h4>
        <CommentForm itemId={itemId} />
        <br />
        <Comments comments={comments} credentials={credentials} />
      </Modal>
    </>
  );
};

const mapStateToProps = (state) => ({
  likes: state.user.likes,
  credentials: state.user.credentials,
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
  clearItem: () => {
    dispatch(clearItem());
  },
});

export default connect(mapStateToProps, mapDispatchToProps)(ItemDetailsButton);
