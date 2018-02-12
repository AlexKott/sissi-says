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

export function setError(errorMessage) {
  return {
    type: t.SET_ERROR,
    payload: errorMessage,
  };
}
