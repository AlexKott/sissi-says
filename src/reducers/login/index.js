import * as t from '@/actions/types';

const initialState = {
  isContentLoaded: false,
  isStructureLoaded: false,
};

export default (state = initialState, action = {}) => {
  const { type } = action;

  if (type === t.SET_INITIAL_CONTENT) {
    return Object.assign({}, state, { isContentLoaded: true, isStructureLoaded: true });
  }

  return state;
};

export function getIsContentLoaded(state) {
  return state.login.isContentLoaded;
}

export function getIsStructureLoaded(state) {
  return state.login.isStructureLoaded;
}
