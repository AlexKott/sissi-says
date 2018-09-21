import * as t from '@/actions/types';

const initialState = [];

export default (state = initialState, action = {}) => {
  const { type, payload } = action;

  switch (type) {
    case t.SEND_REQUEST:
      if (payload.dataType === 'images' && payload.method === 'get') {
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
