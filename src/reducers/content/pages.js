import _cloneDeep from 'lodash.clonedeep';

import * as t from '@/actions/types';
import reorderArray from '@/helpers/reorderArray';
import { getSectionById } from './sections';
import {
  getMaxAmountOfPages,
  getMinAmountOfPages,
} from '@/reducers/content/global';

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
export const getPageById = (state, pageId) => state.content.pages[pageId];
export const getSectionIdsForPage = (state, pageId) => state.content.pages[pageId]._items; // TODO: move test
export const getNumberOfSectionsForPage = (state, pageId) => state.content.pages[pageId]._items.length;

// TODO: move below selectors + tests to selectors folder
export function getSectionsForPage(state, pageId, selectSectionById = getSectionById) {
  const sectionIds = getSectionIdsForPage(state, pageId);

  return sectionIds.map(id => {
    const section = selectSectionById(state, id);
    return { ...section, id };
  });
}

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

export function getCanDeletePage(state, selectMinPages = getMinAmountOfPages) {
  return getNumberOfPages(state) > selectMinPages(state);
}

export function getCanAddSection(state, pageId, selectMaxSections = getMaxSectionsPerPage) {
  return getNumberOfSectionsForPage(state, pageId) < selectMaxSections(state);
}

export function getCanDeleteSection(state, pageId, selectMinSections = getMinSectionsPerPage) {
  return getNumberOfSectionsForPage(state, pageId) > selectMinSections(state);
}

export function getSinglePageId(state) {
  return state.content.pages[0] ? state.content.pages[0].id : null;
}
