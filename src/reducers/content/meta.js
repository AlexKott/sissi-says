import * as t from '../../actions/types';

export default (state = [], action = {}) => {
  const { type, payload } = action;

  if (type === t.SET_INITIAL_CONTENT) {
    return payload.meta;
  }

  return state;
}
