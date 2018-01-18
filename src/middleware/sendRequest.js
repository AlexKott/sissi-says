import ajax from '@/adapters/ajax';
import * as t from '@/actions/types';

export default (store, client = ajax) => next => async action => {
  const { type, payload } = action;

  if (type === t.SEND_REQUEST) {
    const {
      method,
      dataType: endpoint, // TODO: match dataTypes with endpoints in helper
      successDispatch = [],
    } = payload;

    try {
      const request = client(endpoint)[method];
      const response = await request();
      successDispatch.forEach(action => store.dispatch(action(response[0])));
    } catch(error) {
      console.log('Request error: ' + error);
    }
  } else {
    next(action);
  }
}
