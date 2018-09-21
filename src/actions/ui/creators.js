import * as t from '@/actions/types';

export const setLoading = isLoading => ({
  type: t.SET_LOADING,
  payload: isLoading,
});

export const setAlert = (message, level) => ({
  type: t.SET_ALERT,
  payload: { message, level },
});

export const clearAlerts = () => ({
  type: t.CLEAR_ALERTS,
});

export const togglePopup = (type, isVisible) => ({
  type: t.TOGGLE_POPUP,
  payload: { type, isVisible },
});
