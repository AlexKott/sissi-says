import * as t from './types';

export function startLoading() {
  return {
    type: t.START_LOADING,
  };
}

export function endLoading() {
  return {
    type: t.END_LOADING,
  };
}

export function setError(message) {
  return {
    type: t.SET_ERROR,
    payload: message,
  };
}

export function setAlert(message) {
  return {
    type: t.SET_ALERT,
    payload: message,
  };
}

export function clearAlerts() {
  return {
    type: t.CLEAR_ALERTS,
  };
}
