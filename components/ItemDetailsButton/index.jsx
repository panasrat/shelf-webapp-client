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
    top: '55%',
    left: '50%',
    bottom: 'auto',
    marginRight: '-10%',
    transform: 'translate(-50%, -50%)',
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
    shelfName,
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
    <div className='' style={{ marginBottom: '1rem' }}>
      <div className='d-flex' style={{ marginBottom: '15px' }}>
        <div
          className='d-flex align-items-start'
          style={{ width: '100px', marginRight: '15px' }}
        >
          <Link href={`/users/${userHandle}`}>
            <img
              className='cursor-pointer card-img-top clip-image-circle hover-darken'
              src={userImage}
            />
          </Link>
        </div>
        <div
          className='d-flex flex-column justify-content-center'
          style={{ width: '100%' }}
        >
          <div className='d-flex justify-content-between text-darkgrey'>
            <Link href={`/users/${userHandle}`}>
              <div
                className='cursor-pointer hover-peach'
                style={{ fontSize: '180%', fontWeight: '700' }}
              >
                @{userHandle}
              </div>
            </Link>
          </div>
          <div style={{ fontSize: '90%' }}>{dayjs(createdAt).fromNow()}</div>
          <div
            className='bg-lightgrey'
            style={{
              height: '1px',
              width: '100%',
              margin: '20px 0px 10px 0px',
            }}
          ></div>
          <div className='d-flex justify-content-between'>
            <div>
              <div className='d-flex' style={{ marginBottom: '0px' }}>
                <div
                  className='d-flex align-items-center'
                  style={{ width: '50px' }}
                >
                  Add:
                </div>
                <div style={{ fontSize: '160%', fontWeight: '700' }}>
                  {body}
                </div>
              </div>
              <div className='d-flex'>
                <div
                  className='d-flex align-items-center'
                  style={{ width: '50px' }}
                >
                  To:
                </div>
                <div style={{ fontSize: '100%', fontWeight: '700' }}>
                  {shelfName}
                </div>
              </div>
            </div>
            <div>{isUser ? <DeleteItem itemId={itemId} /> : null}</div>
          </div>
          <div
            className='bg-lightgrey'
            style={{
              height: '1px',
              width: '100%',
              margin: '20px 0px 10px 0px',
            }}
          ></div>
          <div
            className='d-flex justify-content-between align-items-center text-mute'
            style={{ fontSize: '80%' }}
          >
            <div className='d-flex'>
              {(
                likes && likes.find((like) => like.itemId === itemId)
                  ? true
                  : false
              ) ? (
                <div
                  className='d-flex align-items-center cursor-pointer'
                  onClick={handleUnlike}
                >
                  <img
                    alt='shelf'
                    src='/icons/heart-fill.svg'
                    style={{ width: '20px' }}
                  />
                </div>
              ) : (
                <div
                  className='d-flex align-items-center cursor-pointer'
                  onClick={handleLike}
                >
                  <img
                    alt='shelf'
                    src='/icons/heart-empty.svg'
                    style={{ width: '20px' }}
                  />
                </div>
              )}
              <div style={{ marginLeft: '10px' }}>
                <div>{likeCount} people like this</div>
              </div>
            </div>
            <div className='d-flex'>
              <div style={{ marginLeft: '10px' }}>{commentCount} Comments</div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
  return (
    <>
      <div className='cursor-pointer hover-light' onClick={handleOpen}>
        <img
          alt='shelf'
          src='/icons/arrow-down.svg'
          style={{ width: '17px' }}
        />
      </div>
      <Modal isOpen={open} style={modalStyles}>
        <div className='text-darkgrey' style={{ padding: '1rem 2rem' }}>
          <div className='d-flex justify-content-end'>
            <div className='cursor-pointer hover-light' onClick={handleClose}>
              <img
                alt='shelf'
                src='/icons/close.svg'
                style={{ width: '18px' }}
              />
            </div>
          </div>
          {detailsMarkup}
          <h4>Comments</h4>
          <CommentForm itemId={itemId} />
          <br />
          <Comments comments={comments} credentials={credentials} />
        </div>
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
