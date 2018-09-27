import * as t from '@/actions/types';

const initialState = {
  type: '',
  message: '',
  title: '',
  trData: {},
};

export default (state = initialState, action = {}) => {
  const { type, payload } = action;

  if (type === t.SET_ALERT) {
    return payload;

  } else if (type === t.CLEAR_ALERTS) {
    return initialState;
  }

  return state;
}

export const getAlert = state => state.ui.alert;
