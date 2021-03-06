import axios from 'axios';
import {
  SET_ITEMS,
  LOADING_DATA,
  LIKE_ITEM,
  UNLIKE_ITEM,
  DELETE_ITEM,
  LOADING_UI,
  SET_ERRORS,
  CLEAR_ERRORS,
  POST_ITEM,
  SET_ITEM,
  STOP_LOADING_UI,
  SUBMIT_COMMENT,
  CLEAR_ITEM,
  SET_SHELF,
} from '../types';

const API_URL =
  'https://asia-southeast2-shelf-webapp-de58d.cloudfunctions.net/api';

export const putItemsInStates = (items) => (dispatch) => {
  dispatch({ type: LOADING_DATA });
  dispatch({
    type: SET_ITEMS,
    payload: items,
  });
};

export const getItem = (itemId) => {
  return (dispatch) => {
    dispatch({ type: LOADING_UI });
    axios
      .get(API_URL + `/item/${itemId}`)
      .then((res) => {
        dispatch({ type: SET_ITEM, payload: res.data });
        dispatch({ type: STOP_LOADING_UI });
      })
      .catch((err) => console.log(err));
  };
};

export const clearItem = () => {
  return (dispatch) => {
    dispatch({ type: CLEAR_ITEM });
  };
};

export const getShelf = (shelfId) => {
  return (dispatch) => {
    dispatch({ type: LOADING_UI });
    axios
      .get(API_URL + `/shelf/${shelfId}`)
      .then((res) => {
        dispatch({ type: SET_SHELF, payload: res.data });
        dispatch({ type: STOP_LOADING_UI });
      })
      .catch((err) => console.log(err));
  };
};

export const postItem = (newItem) => {
  return (dispatch) => {
    dispatch({ type: LOADING_UI });
    axios
      .post(API_URL + '/item', newItem)
      .then((res) => {
        dispatch({ type: POST_ITEM, payload: res.data });
        dispatch(clearErrors());
      })
      .catch((err) =>
        dispatch({ type: SET_ERRORS, payload: err.response.data })
      );
  };
};

export const likeItem = (itemId) => {
  return (dispatch) => {
    axios
      .get(API_URL + `/item/${itemId}/like`)
      .then((res) => {
        dispatch({ type: LIKE_ITEM, payload: res.data });
      })
      .catch((err) => console.log(err));
  };
};

export const unlikeItem = (itemId) => {
  return (dispatch) => {
    axios
      .get(API_URL + `/item/${itemId}/unlike`)
      .then((res) => {
        dispatch({ type: UNLIKE_ITEM, payload: res.data });
      })
      .catch((err) => console.log(err));
  };
};

export const submitComment = (itemId, commentData) => {
  return (dispatch) => {
    axios
      .post(API_URL + `/item/${itemId}/comment`, commentData)
      .then((res) => {
        dispatch({ type: SUBMIT_COMMENT, payload: res.data });
        dispatch(clearErrors());
      })
      .catch((err) =>
        dispatch({ type: SET_ERRORS, payload: err.response.data })
      );
  };
};

export const deleteItem = (itemId) => {
  return (dispatch) => {
    axios
      .delete(API_URL + `/item/${itemId}`)
      .then(() => {
        dispatch({ type: DELETE_ITEM, payload: itemId });
      })
      .catch((err) => console.log(err));
  };
};

// export const getUserData = (userhandle) => {
//   return (dispatch) => {
//     dispatch({ type: LOADING_DATA });
//     axios
//       .get(API_URL + `/user/${userhandle}`)
//       .then((res) => {
//         dispatch({ type: SET_ITEMS, payload: res.data.items });
//       })
//       .catch((err) => {
//         dispatch({ type: SET_ITEMS, payload: null });
//       });
//   };
// };

export const clearErrors = () => {
  return (dispatch) => {
    dispatch({ type: CLEAR_ERRORS });
  };
};
