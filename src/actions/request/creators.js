import { getFormValues } from 'redux-form';
import * as t from './types';
import * as c from '@/constants';
import { setAlert } from '@/actions/alerts/creators';
import { redirectToIndex } from '@/actions/redirect/creators';

export function fetchData(dataType) {
  const action = {
    type: t.SEND_REQUEST,
    payload: {
      method: 'get',
      dataType,
      successDispatch: [fetchDataSuccess.bind({}, dataType)],
    }
  };

  if (dataType === 'structure') {
    action.payload.successDispatch.push(fetchData.bind({}, 'content'));
  }

  return action;
}

export function fetchDataSuccess(dataType, data) {
  return {
    type: t.FETCH_DATA_SUCCESS,
    payload: { dataType, data }
  };
}

export function postContent(formName) {
  return {
    type: t.SEND_REQUEST,
    payload: {
      method: 'post',
      dataType: 'content',
      formName,
      successDispatch: [
        fetchDataSuccess.bind({}, 'content'),
        setAlert.bind({}, c.SAVE_SUCCESS, 'success'),
      ],
    }
  };
}

export function saveImage(image) {
  return {
    type: t.SEND_REQUEST,
    payload: {
      method: 'post',
      dataType: 'images',
      contentType: 'file',
      requestData: image,
      successDispatch: [saveImageSuccess],
    }
  };
}

export function saveImageSuccess(data) {
  return {
    type: t.SAVE_IMAGE_SUCCESS,
    payload: data.fileName,
  };
}

export function login() {
  return (dispatch, getState, selectFormValues = getFormValues) => {
    const values = selectFormValues('login')(getState());
    if (values) {
      dispatch({
        type: t.SEND_REQUEST,
        payload: {
          method: 'post',
          dataType: 'login',
          requestData: { username: values.username, password: values.password },
          successDispatch: [loginSuccess, redirectToIndex],
        },
      });
    } else {
      dispatch(setAlert('Please enter a username and password!', 'error'));
    }
  };
}

export function loginSuccess(data) {
  return {
    type: t.LOGIN_SUCCESS,
    payload: data.token,
  };
}

export function resetSession() {
  return {
    type: t.RESET_SESSION,
  };
}
