import * as t from '@/actions/types';
import reorderArray from '@/helpers/reorderArray';

const initialState = {};

export default (state = initialState, action = {}) => {
  const { type, payload } = action;

  switch(type) {
    case t.SEND_REQUEST:
      if (payload.dataType === 'content') {
        return payload.responseData.global || initialState;
      }
      return state;

    case t.ADD_PAGE:
      return {
        ...state,
        _items: state._items.concat(payload.page._id),
      };

    case t.DELETE_PAGE:
      return {
        ...state,
        _items: state._items.filter(id => id !== payload.pageId),
      };

    case t.DRAG_PAGE:
      return {
        ...state,
        _items: reorderArray(state._items, payload.from, payload.to),
      };

    case t.RESET_SESSION:
      return initialState;

    default:
      return state;
  }
}

export const getAllPageIds = state => state.content.global._items || [];
