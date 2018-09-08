import cloneDeep from 'lodash.clonedeep';

import * as t from '@/actions/types';

const initialState = {};

export default (state = initialState, action = {}) => {
  const { type, payload } = action;

  if (type === t.FETCH_DATA_SUCCESS && payload.dataType === 'content') {
    return payload.data.global;

  } else if (type === t.ADD_PAGE) {
    const newState = cloneDeep(state);
    newState._items.push(payload.page._id);
    return newState;

  } else if (type === t.DELETE_PAGE) {
    const newState = cloneDeep(state);
    newState._items = newState._items.filter(id => id !== payload.pageId);
    return newState;

  } else if (type === t.DRAG_PAGE) {
    const newState = cloneDeep(state);
    const [pageToMove] = newState._items.splice(payload.from, 1);
    newState._items.splice(payload.to, 0, pageToMove);
    return newState;

  } else if (type === t.RESET_SESSION) {
    return initialState;
  }

  return state;
}

export function getGlobalData(state) {
  return cloneDeep(state.content.global);
}
