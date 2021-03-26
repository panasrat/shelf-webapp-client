import axios from 'axios';
import { SET_USER, SET_ERRORS, CLEAR_ERRORS, LOADING_UI } from '../types';
import Router from 'next/router';

export const loginUser = (userData) => (dispatch) => {
  dispatch({ type: LOADING_UI });
  axios
    .post(
      'https://asia-southeast2-shelf-webapp-de58d.cloudfunctions.net/api/login',
      userData
    )
    .then((res) => {
      const FBIdToken = `Bearer ${res.data.token}`;
      localStorage.setItem('FBIdToken', FBIdToken);
      axios.defaults.headers.common['Authorization'] = FBIdToken;
      dispatch(getUserData());
      dispatch({ type: CLEAR_ERRORS });
      Router.push('/');
    })
    .catch((err) => {
      dispatch({ type: SET_ERRORS, payload: err.response.data });
    });
};

export const getUserData = () => (dispatch) => {
  axios
    .get(
      'https://asia-southeast2-shelf-webapp-de58d.cloudfunctions.net/api/user'
    )
    .then((res) => {
      dispatch({
        type: SET_USER,
        payload: res.data,
      });
    })
    .catch((err) => console.log(err));
};
