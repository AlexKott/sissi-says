import * as t from './types';

export function fetchData(dataType) {
  const action = {
    type: t.SEND_REQUEST,
    payload: {
      method: 'get',
      dataType,
      successDispatch: [],
    }
  };

  if (dataType === 'structure') {
    action.payload.successDispatch.push(fetchStructureSuccess);
  } else if (dataType === 'content') {
    action.payload.successDispatch.push(fetchContentSuccess);
  }

  return action;
}

export function fetchStructureSuccess(response) {
  return {
    type: t.FETCH_STRUCTURE_SUCCESS,
    payload: { structure: response.structure },
  };
}

export function fetchContentSuccess(response) {
  return {
    type: t.FETCH_CONTENT_SUCCESS,
    payload: { content: response.content },
  };
}
