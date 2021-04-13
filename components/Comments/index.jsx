import React from 'react';
import dayjs from 'dayjs';
import relativeTime from 'dayjs/plugin/relativeTime';

const Comments = ({ comments }) => {
  dayjs.extend(relativeTime);

  let commentsMarkup = comments ? (
    comments.map((comment) => {
      const { body, createdAt, userImage, userHandle } = comment;
      return (
        <div key={createdAt}>
          <div className='d-flex'>
            <img src={userImage} style={{ width: '100px' }} />
            <div style={{ paddingLeft: '20px' }}>
              <p>{body}</p>
              <p>{dayjs(createdAt).fromNow()}</p>
            </div>
          </div>
        </div>
      );
    })
  ) : (
    <h2>Loading ja...</h2>
  );

  return (
    <div>
      <h4>Comments</h4>
      <div>{commentsMarkup}</div>
    </div>
  );
};

export default Comments;
