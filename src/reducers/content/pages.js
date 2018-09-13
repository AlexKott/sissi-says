import _cloneDeep from 'lodash.clonedeep';

import * as t from '@/actions/types';
import reorderArray from '@/helpers/reorderArray';
import {
  getMaxAmountOfPages,
  getMinAmountOfPages,
} from '@/reducers/structure/global';

const initialState = {};

export default (state = initialState, action = {}) => {
  const { type, payload } = action;

  switch(type) {
    case t.FETCH_DATA_SUCCESS:
      if (payload.dataType === 'content') {
        return payload.data.pages || initialState;
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

export const getContentPages = state => state.content.pages; // TODO: test
export const getPageById = pageId => state => state.content.pages[pageId];
export const getSectionIdsForPage = pageId => state => state.content.pages[pageId]._items; // TODO: move test
export const getNumberOfSectionsForPage = pageId => state => state.content.pages[pageId]._items.length;

// TODO: move below selectors + tests to selectors folder
export function getInitialPageValues(state, pageId) {
  const pageCopy = _cloneDeep(getPageById(state, pageId));
  delete pageCopy.id;
  delete pageCopy.pageType;
  delete pageCopy.sections;
  return pageCopy;
}

export function getCanAddPage(state, selectMaxPages = getMaxAmountOfPages) {
  return getNumberOfPages(state) < selectMaxPages(state);
}

export function getCanAddSection(state, pageId, selectMaxSections = getMaxSectionsPerPage) {
  return getNumberOfSectionsForPage(state, pageId) < selectMaxSections(state);
}

export function getSinglePageId(state) {
  return state.content.pages[0] ? state.content.pages[0].id : null;
}
