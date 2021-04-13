import React from 'react';
import Link from 'next/link';
import dayjs from 'dayjs';
import relativeTime from 'dayjs/plugin/relativeTime';

const Comments = ({ comments }) => {
  dayjs.extend(relativeTime);

  const commentsMarkup = comments ? (
    comments.map((comment) => {
      const { body, createdAt, userImage, userHandle } = comment;
      return (
        <div key={createdAt}>
          <div className='d-flex'>
            <img src={userImage} style={{ width: '120px' }} />
            <div style={{ paddingLeft: '20px' }}>
              <Link href={`/users/${userHandle}`}>
                <a className='card-text'>{userHandle}</a>
              </Link>
              <p>{body}</p>
              <p>{dayjs(createdAt).fromNow()}</p>
            </div>
          </div>
          <br />
        </div>
      );
    })
  ) : (
    <h2>Loading ja...</h2>
  );

  return <div>{commentsMarkup}</div>;
};

export default Comments;
