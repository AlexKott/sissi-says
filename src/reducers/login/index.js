import * as t from '@/actions/types';

const initialState = {
  isInitialDataFetched: false,
};

export default (state = initialState, action = {}) => {
  const { type } = action;

  if (type === t.FETCH_DATA_SUCCESS) {
    return Object.assign({}, state, { isInitialDataFetched: true });
  }

  return state;
};

export function getIsInitialDataFetched(state) {
  return state.login.isInitialDataFetched;
}
