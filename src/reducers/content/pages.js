import cloneDeep from 'lodash.clonedeep';

import * as t from '@/actions/types';
import { getSectionById } from './sections';
import {
  getMaxPages,
  getMinPages,
  getMaxSectionsPerPage,
  getMinSectionsPerPage,
} from '@/reducers/settings';

const initialState = [];

export default (state = initialState, action = {}) => {
  const { type, payload } = action;

  if (type === t.FETCH_DATA_SUCCESS && payload.dataType === 'content') {
    return payload.data.pages || [];

  } else if (type === t.ADD_PAGE) {
    return [...state, payload.page];

  } else if (type === t.DELETE_PAGE) {
    const newState = cloneDeep(state);
    const deleteIndex = newState.findIndex(page => page.id === payload.pageId);
    newState.splice(deleteIndex, 1);
    return newState;

  } else if (type === t.ADD_SECTION) {
    const newState = cloneDeep(state);
    const page = newState.find(page => page.id === payload.pageId);
    page.sections.push(payload.sectionId);
    return newState;

  } else if (type === t.DELETE_SECTION) {
    const newState = cloneDeep(state);
    const page = newState.find(page => page.id === payload.pageId);
    const deleteIndex = page.sections.findIndex(section => section === payload.sectionId);
    page.sections.splice(deleteIndex, 1);
    return newState;

  } else if (type === t.DRAG_PAGE) {
    const newState = cloneDeep(state);
    const [movedPage] = newState.splice(payload.from, 1);
    newState.splice(payload.to, 0, movedPage);
    return newState;

  } else if (type === t.DRAG_SECTION) {
    const newState = cloneDeep(state);
    const page = newState.find(page => page.id === payload.pageId);
    const [movedSection] = page.sections.splice(payload.from, 1);
    page.sections.splice(payload.to, 0, movedSection);
    return newState;

  } else if (type === t.RESET_SESSION) {
    return initialState;
  }

  return state;
};

export function getAllPages(state) {
  return cloneDeep(state.content.pages);
}

export function getPageById(state, pageId) {
  return state.content.pages.find(page => page.id === pageId) || {};
}

export function getNumberOfPages(state) {
  return state.content.pages.length;
}

export function getNumberOfSectionsForPage(state, pageId) {
  const page = state.content.pages.find(page => page.id === pageId);
  return page ? page.sections.length : 0;
}

export function getSectionIdsForPage(state, pageId) {
  return getPageById(state, pageId).sections || [];
}

export function getSectionsForPage(state, pageId, selectSectionById = getSectionById) {
  const sectionIds = getSectionIdsForPage(state, pageId);

  return sectionIds.map(id => {
    const section = selectSectionById(state, id);
    return { ...section, id };
  });
}

export function getInitialPageValues(state, pageId) {
  const pageCopy = cloneDeep(getPageById(state, pageId));
  delete pageCopy.id;
  delete pageCopy.pageType;
  delete pageCopy.sections;
  return pageCopy;
}

export function getCanAddPage(state, selectMaxPages = getMaxPages) {
  return getNumberOfPages(state) < selectMaxPages(state);
}

export function getCanDeletePage(state, selectMinPages = getMinPages) {
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
