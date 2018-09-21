import { getFormValues } from 'redux-form';

import {
  setAlert,
  redirectToIndex,
} from '@/actions';
import * as t from '@/actions/types';
import * as k from '@/constants';
import * as tr from '@/translations';

export const fetchData = dataType => {
  const action = {
    type: t.SEND_REQUEST,
    payload: {
      method: k.GET,
      dataType,
      onSuccess: [],
    },
  };

  if (dataType === k.STRUCTURE) {
    action.payload.onSuccess.push(dispatch => dispatch(fetchData(k.CONTENT)));
  }

  return action;
}

export const postContent = formName => ({
  type: t.SEND_REQUEST,
  payload: {
    method: k.POST,
    dataType: k.CONTENT,
    formName,
    onSuccess: [dispatch => dispatch(setAlert(k.SUCCESS, tr.SUCCESS_SAVE))],
  },
});

export const buildPage = () => ({
  type: t.SEND_REQUEST,
  payload: {
    method: k.POST,
    dataType: k.BUILD,
    onSuccess: [dispatch => dispatch(setAlert(k.SUCCESS, tr.SUCCESS_PUBLISH))],
  },
});

export const saveImage = image => ({
  type: t.SEND_REQUEST,
  payload: {
    method: k.POST,
    dataType: k.IMAGES,
    contentType: 'file',
    requestData: image,
    onSuccess: [(dispatch, data) => dispatch(saveImageSuccess(data))],
  },
});

export const saveImageSuccess = data => ({
  type: t.SAVE_IMAGE_SUCCESS,
  payload: data.fileName,
});

export const login = () => (dispatch, getState, selectFormValues = getFormValues) => {
  const values = selectFormValues(k.LOGIN)(getState());
  if (values) {
    dispatch({
      type: t.SEND_REQUEST,
      payload: {
        method: k.POST,
        dataType: k.LOGIN,
        requestData: { username: values.username, password: values.password },
        onSuccess: [
          (dispatch, data) => dispatch(loginSuccess(data)),
          dispatch => dispatch(redirectToIndex()),
        ],
      },
    });
  } else {
    dispatch(setAlert(k.ERROR, tr.ERROR_AUTH));
  }
};

export const loginSuccess = data => ({
  type: t.LOGIN_SUCCESS,
  payload: data.token,
});

export const resetSession = () => ({
  type: t.RESET_SESSION,
});
