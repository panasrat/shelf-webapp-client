import React from 'react';
import Link from 'next/link';
import dayjs from 'dayjs';
import relativeTime from 'dayjs/plugin/relativeTime';

const Comments = ({ comments, credentials }) => {
  dayjs.extend(relativeTime);

  const commentsMarkup = comments ? (
    comments.map((comment) => {
      const { body, createdAt, userImage, userHandle } = comment;
      const isUser = userHandle === credentials.handle ? true : false;
      return (
        <div key={createdAt} style={{ marginBottom: '1rem' }}>
          <div className='d-flex'>
            <div
              className='d-flex align-items-start'
              style={{ width: '60px', marginRight: '15px', marginTop: '6px' }}
            >
              <Link href={`/users/${userHandle}`}>
                <img
                  className='cursor-pointer card-img-top clip-image-circle hover-darken'
                  src={userImage}
                />
              </Link>
            </div>
            <div>
              <Link href={`/users/${userHandle}`}>
                <div
                  className='cursor-pointer hover-peach'
                  style={{ fontWeight: '700' }}
                >
                  @{userHandle}
                </div>
              </Link>
              <div>{body}</div>
              <div className='' style={{ fontSize: '80%' }}>
                {dayjs(createdAt).fromNow()}
              </div>
              {/* {isUser ? <button disabled={true}>Delete Comment</button> : null} */}
            </div>
          </div>
        </div>
      );
    })
  ) : (
    <h2>Loading ja...</h2>
  );

  return <div>{commentsMarkup}</div>;
};

export default Comments;
