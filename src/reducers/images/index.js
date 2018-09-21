import * as t from '@/actions/types';

const initialState = [];

export default (state = initialState, action = {}) => {
  const { type, payload } = action;

  switch (type) {
    case t.FETCH_DATA_SUCCESS:
      if (payload.dataType === 'images') {
        return payload.responseData;
      }
      return state;

    case t.SAVE_IMAGE_SUCCESS:
      return [...state, payload];

    case t.RESET_SESSION:
      return initialState;

    default:
      return state;
  }
};

export const getAllImages = state => state.images;
