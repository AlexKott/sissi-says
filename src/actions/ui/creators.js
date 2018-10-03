import * as t from '@/actions/types';
import { ERROR } from '@/constants';
import * as tr from '@/translations';

export const clearAlerts = () => ({
  type: t.CLEAR_ALERTS,
});

export const setAlert = (type, message, trData) => ({
  type: t.SET_ALERT,
  payload: {
    message,
    title: type === ERROR ? tr.ERROR : tr.SUCCESS,
    type,
    trData,
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

export const openModal = (type, data = {}) => ({
  type: t.SET_MODAL,
  payload: { type, data },
});

export const closeModal = () => ({
  type: t.SET_MODAL,
  payload: { type: null, data: {}},
});
