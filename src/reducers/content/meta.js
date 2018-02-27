import * as t from '@/actions/types';

const initialState = {};

export default (state = initialState, action = {}) => {
  const { type, payload } = action;

  if (type === t.FETCH_DATA_SUCCESS && payload.dataType === 'content') {
    return payload.data.meta;

  } else if (type === t.RESET_SESSION) {
    return initialState;
  }

  return state;
}

export function getMetaData(state) {
  return state.content.meta;
}
