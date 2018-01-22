import * as t from './types';

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
    payload: { dataType, data },
  };
}
