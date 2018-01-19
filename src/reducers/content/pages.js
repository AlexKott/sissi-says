import * as t from '@/actions/types';
import { getSectionById } from './sections';

export default (state = [], action = {}) => {
  const { type, payload } = action;

  if (type === t.FETCH_DATA_SUCCESS && payload.type === 'content') {
    return payload.data.pages || [];
  }

  else if (type === t.ADD_PAGE) {
    return [...state, payload.page];
  }

  else if (type === t.ADD_SECTION) {
    const newState = JSON.parse(JSON.stringify(state));
    const page = newState.find(page => page.id === payload.pageId);
    page.sections.push(payload.sectionId);
    return newState;
  }

  return state;
};

export function getAllPages(state) {
  return state.content.pages;
}

export function getPageById(state, pageId) {
  return state.content.pages.find(page => page.id === pageId);
}

export function getNumberOfPages(state) {
  return state.content.pages.length;
}

export function getNumberOfSectionsForPage(state, pageId) {
  const page = state.content.pages.find(page => page.id === pageId);
  return page.sections.length;
}

export function getSectionsForPage(state, pageId, selectSectionById = getSectionById) {
  const sectionIds = getPageById(state, pageId).sections;

  return sectionIds.map(id => {
    const section = selectSectionById(state, id);
    return { ...section, id };
  });
}
