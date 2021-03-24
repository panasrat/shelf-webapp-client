import React from 'react';
import Link from 'next/link';
import styles from './Item.module.scss';
import dayjs from 'dayjs';
import relativeTime from 'dayjs/plugin/relativeTime';

const Item = ({
  item: { body, createdAt, userHandle, userImage, likeCount, commentCount },
}) => {
  dayjs.extend(relativeTime);
  return (
    <div className='card' style={{ width: '18rem', marginBottom: '1rem' }}>
      <img className='card-img-top' src={`${userImage}`} />
      <div className='card-body'>
        <p className='card-subtitle text-muted'>{dayjs(createdAt).fromNow()}</p>
        <p className='card-text'>{body}</p>
        <Link href={`/users/${userHandle}`}>
          <a className='card-text'>{userHandle}</a>
        </Link>
      </div>
    </div>
  );
};

export default Item;
