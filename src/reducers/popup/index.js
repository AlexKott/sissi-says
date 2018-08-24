import * as t from '@/actions/types';

const initialState = {
  guide: false,
};

export default (state = initialState, action = {}) => {
  const { type, payload } = action;

  if (type === t.TOGGLE_POPUP) {
    return Object.assign({}, state, { [payload.type]: payload.isVisible });
  }

  return state;
};

export function getDisplayGuidePopup(state) {
  return state.popup.guide;
}
