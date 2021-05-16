import React, { useState } from 'react';

import { connect } from 'react-redux';
import { submitComment } from '../../redux/actions/dataActions';

const CommentForm = ({ itemId, submitComment }) => {
  const [comment, setComment] = useState('');

  const handleChange = (event) => {
    setComment(event.target.value);
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    setComment('');
    submitComment(itemId, { body: comment });
  };

  return (
    <form onSubmit={handleSubmit}>
      <div className='d-flex'>
        <input
          className='form-control'
          placeholder='Write a comment...'
          onChange={handleChange}
          value={comment}
        />
        <button
          className='btn btn-primary'
          style={{ marginLeft: '1rem' }}
          type='submit'
          disabled={!comment}
        >
          Submit
        </button>
      </div>
    </form>
  );
};

const mapDispatchToProps = (dispatch) => ({
  submitComment: (itemId, commentData) => {
    dispatch(submitComment(itemId, commentData));
  },
});

export default connect(null, mapDispatchToProps)(CommentForm);
