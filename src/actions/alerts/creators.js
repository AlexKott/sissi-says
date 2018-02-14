import * as t from './types';

export function setLoading(isLoading) {
  return {
    type: t.SET_LOADING,
    payload: isLoading,
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
