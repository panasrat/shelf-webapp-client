import React, { useEffect, useState } from 'react';
import Link from 'next/link';
import styles from './Item.module.scss';
import dayjs from 'dayjs';
import relativeTime from 'dayjs/plugin/relativeTime';

import { connect } from 'react-redux';
import { likeItem, unlikeItem } from '../../redux//actions/dataActions';

const Item = ({
  item: {
    itemId,
    body,
    createdAt,
    userHandle,
    userImage,
    likeCount,
    commentCount,
  },
  user,
  likeItem,
  unlikeItem,
}) => {
  const [isLiked, setIsLiked] = useState(
    user.likes && user.likes.find((like) => like.itemId === itemId)
      ? true
      : false
  );

  dayjs.extend(relativeTime);

  const handleLike = () => {
    setIsLiked(!isLiked);
    likeItem(itemId);
  };

  const handleUnlike = () => {
    setIsLiked(!isLiked);
    unlikeItem(itemId);
  };

  return (
    <div className='card' style={{ width: '18rem', marginBottom: '1rem' }}>
      <img className='card-img-top' src={`${userImage}`} />
      <div className='card-body'>
        <p className='card-subtitle text-muted'>{dayjs(createdAt).fromNow()}</p>
        <p className='card-text'>{body}</p>
        <Link href={`/users/${userHandle}`}>
          <a className='card-text'>{userHandle}</a>
        </Link>
        {isLiked ? (
          <button onClick={handleUnlike}>undo like</button>
        ) : (
          <button onClick={handleLike}>do like</button>
        )}
        <span>{likeCount}</span>
        <p>
          comment: <span>{commentCount}</span>
        </p>
      </div>
    </div>
  );
};

const mapStateToProps = (state) => ({
  user: state.user,
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
