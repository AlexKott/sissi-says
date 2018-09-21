import * as t from '@/actions/types';

const initialState = {
  isInitialDataFetched: false,
  token: window.localStorage.getItem('token') || null,
};

export default (state = initialState, action = {}) => {
  const { type, payload } = action;

  if (type === t.SEND_REQUEST && payload.dataType === 'content') {
    return Object.assign({}, state, { isInitialDataFetched: true });

  } else if (type === t.LOGIN_SUCCESS) {
    return Object.assign({}, state, { token: payload });

  } else if (type === t.RESET_SESSION) {
    return Object.assign({}, initialState, { token: null });
  }

  return state;
};

export function getIsInitialDataFetched(state) {
  return state.login.isInitialDataFetched;
}

export function getAuthToken(state) {
  return state.login.token;
}
