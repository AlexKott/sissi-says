import { getFormValues } from 'redux-form';

import {
  setAlert,
  redirectToIndex,
} from '@/actions';
import * as t from '@/actions/types';
import * as tr from '@/translations';

export const fetchData = dataType => {
  const action = {
    type: t.SEND_REQUEST,
    payload: {
      method: 'get',
      dataType,
      onSuccess: [dispatch => dispatch(fetchDataSuccess(dataType))],
    }
  };

  if (dataType === 'structure') {
    action.payload.onSuccess.push(dispatch => dispatch(fetchData('content')));
  }

  return action;
}

export const fetchDataSuccess = (dataType, data) => {
  return {
    type: t.FETCH_DATA_SUCCESS,
    payload: { dataType, data }
  };
}

export const postContent = (formName) => {
  return {
    type: t.SEND_REQUEST,
    payload: {
      method: 'post',
      dataType: 'content',
      formName,
      onSuccess: [
        dispatch => dispatch(fetchDataSuccess('content')),
        dispatch => dispatch(setAlert(tr.SUCCESS_SAVE, tr.SUCCESS)),
      ],
    }
  };
}

export const buildPage = () => {
  return {
    type: t.SEND_REQUEST,
    payload: {
      method: 'post',
      dataType: 'build',
      onSuccess: [dispatch => dispatch(setAlert(tr.SUCCESS_PUBLISH, tr.SUCCESS))],
    },
  };
}

export const saveImage = (image) => {
  return {
    type: t.SEND_REQUEST,
    payload: {
      method: 'post',
      dataType: 'images',
      contentType: 'file',
      requestData: image,
      onSuccess: [dispatch => dispatch(saveImageSuccess)],
    },
  };
}

export const saveImageSuccess = (data) => {
  return {
    type: t.SAVE_IMAGE_SUCCESS,
    payload: data.fileName,
  };
}

export const login = () => {
  return (dispatch, getState, selectFormValues = getFormValues) => {
    const values = selectFormValues('login')(getState());
    if (values) {
      dispatch({
        type: t.SEND_REQUEST,
        payload: {
          method: 'post',
          dataType: 'login',
          requestData: { username: values.username, password: values.password },
          onSuccess: [
            dispatch => dispatch(loginSuccess),
            dispatch => dispatch(redirectToIndex),
          ],
        },
      });
    } else {
      dispatch(setAlert(tr.ERROR_AUTH, tr.ERROR));
    }
  };
}

export const loginSuccess = (data) => {
  return {
    type: t.LOGIN_SUCCESS,
    payload: data.token,
  };
}

export const resetSession = () => {
  return {
    type: t.RESET_SESSION,
  };
}
