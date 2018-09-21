import ajax from '@/adapters/ajax';
import { transformToMarkdown } from '@/helpers/markdownHtmlConverter';
import * as t from '@/actions/types';
import * as actions from '@/actions';
import * as selectors from '@/selectors';
import * as tr from '@/translations';

const API_URL = 'http://localhost:3010/api';

export default (store, client = ajax, getters = selectors) => next => async action => {
  const { type, payload } = action;

  if (type === t.SEND_REQUEST) {
    const {
      method,
      dataType,
      requestData = {},
      contentType = 'json',
      onSuccess = [],
    } = payload;

    const endpoint = `${API_URL}/${dataType}`;
    const token = getters.getAuthToken(store.getState());

    try {
      store.dispatch(actions.activateLoading());
      const response = await client(endpoint, token, contentType)[method](requestData);
      let responseData = response[0];

      if (dataType === 'content') {
        const fields = getters.getFields(store.getState());
        responseData = transformToMarkdown(response[0], fields);
      }

      payload.responseData = responseData;

      onSuccess.forEach(method => method(store.dispatch, responseData));

      next(action);

    } catch(error) {
      const errorCode = error[0] ? error[0].status : 500;
      switch(errorCode) {
        case 401:
          store.dispatch(actions.resetSession());
          store.dispatch(actions.redirectToLogin());
          store.dispatch(actions.setAlert(tr.ERROR_AUTH, tr.ERROR));
          break;

        case 403:
          store.dispatch(actions.setAlert(tr.ERROR_LOGIN, tr.ERROR));
          break;

        case 422:
          store.dispatch(actions.setAlert(tr.ERROR_BUILD, tr.ERROR));
          break;

        default:
          store.dispatch(actions.setAlert(tr.ERROR_SERVER, tr.ERROR));
      }

    } finally {
      store.dispatch(actions.deactivateLoading());
    }

  } else {
    next(action);
  }
}
