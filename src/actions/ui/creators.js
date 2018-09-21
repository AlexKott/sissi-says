import * as t from '@/actions/types';

export const clearAlerts = () => ({
  type: t.CLEAR_ALERTS,
});

export const setAlert = (message, level) => ({
  type: t.SET_ALERT,
  payload: { message, level },
});

export const activateLoading = () => ({
  type: t.SET_LOADING,
  payload: { diff: 1 },
});

export const deactivateLoading = () => ({
  type: t.SET_LOADING,
  payload: { diff: -1 },
});

export const togglePopup = (type, isVisible) => ({
  type: t.TOGGLE_POPUP,
  payload: { type, isVisible },
});
