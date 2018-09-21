import * as t from '@/actions/types';
import { ERROR } from '@/constants';
import * as tr from '@/translations';

export const clearAlerts = () => ({
  type: t.CLEAR_ALERTS,
});

export const setAlert = (type, message) => ({
  type: t.SET_ALERT,
  payload: {
    message,
    title: type === ERROR ? tr.ERROR : tr.SUCCESS,
    type,
  },
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
