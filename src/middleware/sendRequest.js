import ajax from '@/adapters/ajax';
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
      successDispatch = [],
    } = payload;

    const endpoint = `${API_URL}/${dataType}`;
    const token = getters.getAuthToken(store.getState());

    try {
      store.dispatch(actions.setLoading(true));
      const response = await client(endpoint, token)[method](requestData);
      successDispatch.forEach(action => store.dispatch(action(response[0])));
    } catch(error) {
      if (error[0] && error[0].status === 401) {
        store.dispatch(actions.setAlert(c.AUTH_ERROR, 'error'));
      } else {
        store.dispatch(actions.setAlert(c.SERVER_ERROR, 'error'));
      }
    } finally {
      store.dispatch(actions.setLoading(false));
    }
  } else {
    next(action);
  }
}
