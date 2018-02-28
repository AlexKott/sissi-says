import ajax from '@/adapters/ajax';
import { transformToMarkdown } from '@/helpers/markdownHtmlConverter';
import * as t from '@/actions/types';
import * as actions from '@/actions/creators';
import * as selectors from '@/reducers/selectors';
import * as c from '@/constants';

const API_URL = process.env.REACT_APP_API_URL;

export default (store, client = ajax, getters = selectors) => next => async action => {
  const { type, payload } = action;

  if (type === t.SEND_REQUEST) {
    const {
      method,
      dataType,
      requestData,
      contentType = 'json',
      successDispatch = [],
    } = payload;

    const endpoint = `${API_URL}/${dataType}`;
    const token = getters.getAuthToken(store.getState());

    try {
      store.dispatch(actions.setLoading(true));
      const response = await client(endpoint, token, contentType)[method](requestData);
      let data = response[0];

      if (dataType === 'content' && method === 'get') {
        const fields = selectors.getFields(store.getState());
        data = transformToMarkdown(response[0], fields);
      }

      successDispatch.forEach(action => store.dispatch(action(data)));
    } catch(error) {
      if (error[0] && error[0].status === 401) {
        store.dispatch(actions.setAlert(c.AUTH_ERROR, 'auth_error'));
      } else {
        store.dispatch(actions.setAlert(c.SERVER_ERROR, 'server_error'));
      }
    } finally {
      store.dispatch(actions.setLoading(false));
    }
  } else {
    next(action);
  }
}
