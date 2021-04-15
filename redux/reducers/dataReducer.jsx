import {
  SET_ITEMS,
  SET_ITEM,
  LOADING_DATA,
  LIKE_ITEM,
  UNLIKE_ITEM,
  DELETE_ITEM,
  POST_ITEM,
  CLEAR_ITEMS,
  SUBMIT_COMMENT,
} from '../types';

const initialState = {
  items: [],
  item: {},
  loading: false,
};

const dataReducer = (state = initialState, action) => {
  switch (action.type) {
    case LOADING_DATA:
      return {
        ...state,
        loading: true,
      };
    case SET_ITEMS:
      return {
        ...state,
        items: action.payload,
        loading: false,
      };
    case SET_ITEM:
      return {
        ...state,
        item: action.payload,
      };
    case CLEAR_ITEMS:
      return initialState;
    case LIKE_ITEM:
    case UNLIKE_ITEM:
      let index = state.items.findIndex(
        (item) => item.itemId === action.payload.itemId
      );
      state.items[index] = action.payload;
      if (state.item.itemId === action.payload.itemId) {
        state.item.likeCount = action.payload.likeCount;
      }
      return {
        ...state,
      };
    case DELETE_ITEM:
      index = state.items.findIndex((item) => item.itemId === action.payload);
      state.items.splice(index, 1);
      return {
        ...state,
      };
    case POST_ITEM:
      return {
        ...state,
        items: [action.payload, ...state.items],
      };
    case SUBMIT_COMMENT:
      // console.log('before', state.items[index]);
      state.items[index] = action.payload;
      // console.log('after', state.items[index].commentCount);
      if (state.item.itemId === action.payload.itemId) {
        state.item.commentCount = action.payload.commentCount;
        state.item.comments.unshift(action.payload);
      }
      return {
        ...state,
      };
    default:
      return state;
  }
};

export default dataReducer;
