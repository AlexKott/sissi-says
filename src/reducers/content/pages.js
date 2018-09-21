import { createSelector } from 'reselect';

import * as t from '@/actions/types';
import * as k from '@/constants/keywords';
import reorderArray from '@/helpers/reorderArray';

const initialState = {};

export default (state = initialState, action = {}) => {
  const { type, payload } = action;

  switch(type) {
    case t.SEND_REQUEST:
      if (payload.dataType === k.CONTENT) {
        return payload.responseData.pages || initialState;
      }
      return state;

    case t.ADD_PAGE:
      return {
        ...state,
        [payload.page._id]: payload.page,
      };

    case t.DELETE_PAGE:
      const { [payload.pageId]: pageToDelete, ...newState } = state;
      return newState;

    case t.ADD_SECTION:
      return {
        ...state,
        [payload.pageId]: {
          ...state[payload.pageId],
          _items: state[payload.pageId]._items.concat(payload.sectionId),
        },
      };

    case t.DELETE_SECTION:
      return {
        ...state,
        [payload.pageId]: {
          ...state[payload.pageId],
          _items: state[payload.pageId]._items.filter(id => id !== payload.sectionId),
        },
      };

    case t.DRAG_SECTION:
      return {
        ...state,
        [payload.pageId]: {
          ...state[payload.pageId],
          _items: reorderArray(state[payload.pageId]._items, payload.from, payload.to),
        },
      };

    case t.RESET_SESSION:
      return initialState;

    default:
      return state;
  }
};

export const getPageById = pageId => state => state.content.pages[pageId] || {};

export const getSectionIdsForPage = pageId => createSelector(
  [
    getPageById(pageId),
  ],
  page => page._items || []
);
