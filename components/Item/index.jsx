import React, { useEffect, useState } from 'react';
import Link from 'next/link';
import styles from './Item.module.scss';
import dayjs from 'dayjs';
import relativeTime from 'dayjs/plugin/relativeTime';

import DeleteItem from '../DeleteItem';
import ItemDetailsButton from '../ItemDetailsButton';

import { connect } from 'react-redux';
import { likeItem, unlikeItem } from '../../redux//actions/dataActions';

const TripplePoints = ({ isUser, itemId }) => {
  const [open, setOpen] = useState(false);
  return (
    <div className='position-relative'>
      <div className='cursor-pointer' onClick={() => setOpen(!open)}>
        <img
          alt='shelf'
          src='/icons/tripple-points.svg'
          style={{ width: '25px' }}
        />
      </div>
      {open ? <TripplePointsMenu isUser={isUser} itemId={itemId} /> : null}
    </div>
  );
};

const TripplePointsMenu = ({ isUser, itemId }) => {
  return (
    <div
      className='bg-white text-brown shadow-box border-smooth'
      style={{
        position: 'absolute',
        width: '200px',
        top: '30px',
        right: '-40px',
        padding: '20px',
      }}
    >
      {isUser ? <DeleteItem itemId={itemId} /> : <div>No menu</div>}
    </div>
  );
};

const Item = ({
  item: {
    itemId,
    body,
    shelfId,
    shelfName,
    createdAt,
    userHandle,
    userImage,
    likeCount,
    commentCount,
  },
  likes,
  credentials,
  shelves,
  likeItem,
  unlikeItem,
}) => {
  const [isLiked, setIsLiked] = useState(
    likes && likes.find((like) => like.itemId === itemId) ? true : false
  );
  // const [commentCount, setCommentCount] = useState();

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

  // const shelf = shelves.find((obj) => obj.shelfId === shelfId);

  return (
    <>
      <div
        className='bg-white border-smooth shadow-drop text-darkgrey'
        style={{ width: '100%', padding: '25px', marginBottom: '20px' }}
      >
        <div className='d-flex' style={{ marginBottom: '15px' }}>
          <div
            className='d-flex align-items-center'
            style={{ width: '60px', marginRight: '15px' }}
          >
            <Link href={`/users/${userHandle}`}>
              <img
                className='cursor-pointer card-img-top clip-image-circle hover-darken'
                src={userImage}
              />
            </Link>
          </div>
          <div style={{ width: '100%' }}>
            <div className='d-flex justify-content-between'>
              <Link href={`/users/${userHandle}`}>
                <div
                  className='cursor-pointer hover-peach'
                  style={{ fontSize: '120%', fontWeight: '700' }}
                >
                  @{userHandle}
                </div>
              </Link>
              <TripplePoints isUser={isUser} itemId={itemId} />
            </div>
            <div style={{ fontSize: '75%' }}>{dayjs(createdAt).fromNow()}</div>
          </div>
        </div>
        <div className='d-flex' style={{ marginBottom: '0px' }}>
          <div className='d-flex align-items-center' style={{ width: '50px' }}>
            Add:
          </div>
          <div style={{ fontSize: '160%', fontWeight: '700' }}>{body}</div>
        </div>
        <div className='d-flex'>
          <div className='d-flex align-items-center' style={{ width: '50px' }}>
            To:
          </div>
          <div style={{ fontSize: '100%', fontWeight: '700' }}>{shelfName}</div>
        </div>
        <div
          className='bg-lightgrey'
          style={{ width: '100%', height: '1px', margin: '15px 0px 7px 0px' }}
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
            <ItemDetailsButton itemId={itemId} />
            <div style={{ marginLeft: '10px' }}>{commentCount} Comments</div>
          </div>
        </div>
        <div
          className='bg-lightgrey'
          style={{ width: '100%', height: '1px', margin: '7px 0px 0px 0px' }}
        ></div>
      </div>
    </>
  );
};

const mapStateToProps = (state) => ({
  likes: state.user.likes,
  credentials: state.user.credentials,
  shelves: state.user.shelves,
});

const mapDispatchToProps = (dispatch) => ({
  likeItem: (itemId) => {
    dispatch(likeItem(itemId));
  },
  unlikeItem: (itemId) => {
    dispatch(unlikeItem(itemId));
  },
});

export default connect(mapStateToProps, mapDispatchToProps)(Item);
