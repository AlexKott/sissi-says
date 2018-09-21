import * as t from '@/actions/types';

const initialState = {};

export default (state = initialState, action = {}) => {
  const { type, payload } = action;

  if (type === t.SEND_REQUEST && payload.dataType === 'structure') {
    return payload.responseData.global;

  } else if (type === t.RESET_SESSION) {
    return initialState;
  }

  return state;
}

export const getMaxAmountOfPages = state => state.structure.global.maxItems;
