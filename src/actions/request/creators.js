import { getFormValues } from 'redux-form';

import {
  setAlert,
  redirectToIndex,
} from '@/actions';
import * as t from '@/actions/types';
import {
  ERROR,
  SUCCESS,
} from '@/constants';
import * as tr from '@/translations';

export const fetchData = dataType => {
  const action = {
    type: t.SEND_REQUEST,
    payload: {
      method: 'get',
      dataType,
      onSuccess: [],
    },
  };

  if (dataType === 'structure') {
    action.payload.onSuccess.push(dispatch => dispatch(fetchData('content')));
  }

  return action;
}

export const postContent = formName => ({
  type: t.SEND_REQUEST,
  payload: {
    method: 'post',
    dataType: 'content',
    formName,
    onSuccess: [dispatch => dispatch(setAlert(SUCCESS, tr.SUCCESS_SAVE))],
  },
});

export const buildPage = () => ({
  type: t.SEND_REQUEST,
  payload: {
    method: 'post',
    dataType: 'build',
    onSuccess: [dispatch => dispatch(setAlert(SUCCESS, tr.SUCCESS_PUBLISH))],
  },
});

export const saveImage = image => ({
  type: t.SEND_REQUEST,
  payload: {
    method: 'post',
    dataType: 'images',
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
  const values = selectFormValues('login')(getState());
  if (values) {
    dispatch({
      type: t.SEND_REQUEST,
      payload: {
        method: 'post',
        dataType: 'login',
        requestData: { username: values.username, password: values.password },
        onSuccess: [
          (dispatch, data) => dispatch(loginSuccess(data)),
          dispatch => dispatch(redirectToIndex()),
        ],
      },
    });
  } else {
    dispatch(setAlert(ERROR, tr.ERROR_AUTH));
  }
};

export const loginSuccess = data => ({
  type: t.LOGIN_SUCCESS,
  payload: data.token,
});

export const resetSession = () => ({
  type: t.RESET_SESSION,
});
