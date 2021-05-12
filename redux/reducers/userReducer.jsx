import {
  SET_USER,
  SET_AUTHENTICATED,
  SET_UNAUTHENTICATED,
  ADD_SHELF,
  LOADING_USER,
  LIKE_ITEM,
  UNLIKE_ITEM,
} from '../types';

const initialState = {
  authenticated: false,
  loading: false,
  credentials: {},
  likes: [],
  notifications: [],
  shelves: [],
};

const userReducer = (state = initialState, action) => {
  switch (action.type) {
    case SET_AUTHENTICATED:
      return {
        ...state,
        authenticated: true,
      };
    case SET_UNAUTHENTICATED:
      return initialState;
    case SET_USER:
      return {
        authenticated: true,
        loading: false,
        ...action.payload,
      };
    case LOADING_USER:
      return {
        ...state,
        loading: true,
      };
    case LIKE_ITEM:
      return {
        ...state,
        likes: [
          ...state.likes,
          {
            userHandle: state.credentials.handle,
            itemId: action.payload.itemId,
          },
        ],
      };
    case UNLIKE_ITEM:
      return {
        ...state,
        likes: state.likes.filter(
          (like) => like.itemId !== action.payload.itemId
        ),
      };
    case ADD_SHELF:
      return {
        ...state,
        shelves: [action.payload, ...state.shelves],
      };
    default:
      return state;
  }
};

export default userReducer;
