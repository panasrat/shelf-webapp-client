import { SET_ITEMS, LOADING_DATA, LIKE_ITEM, UNLIKE_ITEM } from '../types';

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
    case LIKE_ITEM:
    case UNLIKE_ITEM:
      let index = state.items.findIndex(
        (item) => item.itemId === action.payload.itemId
      );
      state.items[index] = action.payload;
      // if (state.item.itemId === action.payload.itemId) {
      //   state.item = action.payload;
      // }
      return {
        ...state,
      };
    default:
      return state;
  }
};

export default dataReducer;
