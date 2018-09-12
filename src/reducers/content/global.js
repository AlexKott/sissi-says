import _cloneDeep from 'lodash.clonedeep';

import * as t from '@/actions/types';

const initialState = {};

export default (state = initialState, action = {}) => {
  const { type, payload } = action;
  let nextState;

  switch(type) {
    case t.FETCH_DATA_SUCCESS:
      if (payload.dataType === 'content') {
        return payload.data.global;
      }
      return state;

    case t.ADD_PAGE:
      nextState = _cloneDeep(state);
      nextState._items.push(payload.page._id);
      return nextState;

    case t.DELETE_PAGE:
      nextState = _cloneDeep(state);
      nextState._items = nextState._items.filter(id => id !== payload.pageId);
      return nextState;

    case t.DRAG_PAGE:
      nextState = _cloneDeep(state);
      const [pageToMove] = nextState._items.splice(payload.from, 1);
      nextState._items.splice(payload.to, 0, pageToMove);
      return nextState;

    case t.RESET_SESSION:
      return initialState;

    default:
      return state;
  }
}

export function getGlobalContent(state) {
  return state.content.global;
}

export function getMaxAmountOfPages(state) {
  return state.content.global.maxItems;
}

export function getMinAmountOfPages(state) {
  return state.content.global.minItems;
}

export function getAllPageIds(state) {
  return state.content.global._items;
}
