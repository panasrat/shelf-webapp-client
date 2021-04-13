import React, { useEffect, useState } from 'react';
import Link from 'next/link';
import styles from './Item.module.scss';
import dayjs from 'dayjs';
import relativeTime from 'dayjs/plugin/relativeTime';

import DeleteItem from '../DeleteItem';
import ItemDetails from '../ItemDetails';

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
  likes,
  credentials,
  likeItem,
  unlikeItem,
}) => {
  const [isLiked, setIsLiked] = useState(
    likes && likes.find((like) => like.itemId === itemId) ? true : false
  );

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

  return (
    <div className='card' style={{ width: '18rem', marginBottom: '1rem' }}>
      <img className='card-img-top' src={userImage} />
      <div className='card-body'>
        <p className='card-subtitle text-muted'>{dayjs(createdAt).fromNow()}</p>
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
        <div>
          <ItemDetails itemId={itemId} />
        </div>
      </div>
    </div>
  );
};

const mapStateToProps = (state) => ({
  likes: state.user.likes,
  credentials: state.user.credentials,
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
