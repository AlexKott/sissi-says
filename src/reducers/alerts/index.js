import * as t from '@/actions/types';

const initialState = {
  loading: 0,
  error: '',
  message: '',
};

export default (state = initialState, action = {}) => {
  const { type, payload } = action;

  return state;
};
