import axios from 'axios';
import { SET_ITEMS, LOADING_DATA, LIKE_ITEM, UNLIKE_ITEM } from '../types';

const API_URL =
  'https://asia-southeast2-shelf-webapp-de58d.cloudfunctions.net/api';

export const putItemsInStates = (items) => (dispatch) => {
  dispatch({ type: LOADING_DATA });
  dispatch({
    type: SET_ITEMS,
    payload: items,
  });
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
