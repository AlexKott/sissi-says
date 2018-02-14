import * as t from '@/actions/types';

const initialState = {
  loading: 0,
  message: {
    text: '',
    level: '',
  },
};

export default (state = initialState, action = {}) => {
  const { type, payload } = action;

  if (type === t.SET_LOADING) {
    const loading = payload ? state.loading + 1 : state.loading - 1;
    return Object.assign({}, state, { loading });

  } else if (type === t.SET_ALERT) {
    const message = { text: payload.message, level: payload.level };
    return Object.assign({}, state, { message });

  } else if (type === t.CLEAR_ALERTS) {
    return initialState;
  }

  return state;
};

export function getShouldDisplayModal(state) {
  const isLoading = state.alerts.loading > 0;
  const hasMessage = state.alerts.message.text !== '';
  return isLoading || hasMessage;
}

export function getAlertMessage(state) {
  return state.alerts.message;
}
