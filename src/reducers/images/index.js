import * as t from '@/actions/types';

const initialState = [];

export default (state = initialState, action = {}) => {
  const { type, payload } = action;

  if (type === t.FETCH_DATA_SUCCESS && payload.dataType === 'images') {
    return payload.data;

  } else if (type === t.SAVE_IMAGE_SUCCESS) {
    return [...state, payload];

  } else if (type === t.RESET_SESSION) {
    return initialState;
  }

  return state;
};

export function getAllImages(state) {
  return state.images;
}
