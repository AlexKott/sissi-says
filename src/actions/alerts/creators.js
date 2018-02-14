import * as t from './types';

export function setLoading(isLoading) {
  return {
    type: t.SET_LOADING,
    payload: isLoading,
  };
}

export function setAlert(message, level) {
  return {
    type: t.SET_ALERT,
    payload: { message, level },
  };
}

export function clearAlerts() {
  return {
    type: t.CLEAR_ALERTS,
  };
}
