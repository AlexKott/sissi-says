import * as t from '@/actions/types';

const initialState = {
  displayImagePopup: false,
};

export default (state = initialState, action = {}) => {
  const { type, payload } = action;

  if (type === t.SET_IMAGE_POPUP) {
    return Object.assign({}, state, { displayImagePopup: payload });
  }

  return state;
};

export function getDisplayImagePopup(state) {
  return state.popup.displayImagePopup;
}
