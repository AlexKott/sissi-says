import * as t from '@/actions/types';

const initialState = {
  loading: 0,
  error: '',
  message: '',
};

export default (state = initialState, action = {}) => {
  const { type, payload } = action;

  if (type === t.START_LOADING) {
    return Object.assign({}, state, { loading: state.loading + 1 });

  } else if (type === t.END_LOADING) {
    return Object.assign({}, state, { loading: state.loading - 1 });

  } else if (type === t.SET_ERROR) {
    return Object.assign({}, state, { error: payload });

  } else if (type === t.SET_ALERT) {
    return Object.assign({}, state, { message: payload });
  }

  return state;
};
