import ajax from '@/adapters/ajax';
import * as t from '@/actions/types';
const API_URL = process.env.REACT_APP_API_URL;

export default (store, client = ajax) => next => async action => {
  const { type, payload } = action;

  if (type === t.SEND_REQUEST) {
    const {
      method,
      dataType,
      successDispatch = [],
    } = payload;

    console.log(API_URL);
    console.log(dataType);
    const endpoint = `${API_URL}/${dataType}`;

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
