import { getFormValues } from 'redux-form';
import * as t from './types';
import * as c from '@/constants';
import { setAlert } from '@/actions/alerts/creators';

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
          successDispatch: [loginSuccess],
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
