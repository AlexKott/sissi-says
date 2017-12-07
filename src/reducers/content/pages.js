import * as t from '../../actions/types';

export default (state = [], action = {}) => {
  const { type, payload } = action;

  if (type === t.ADD_PAGE) {
    return [...state, payload.page];
  }

  else if (type === t.ADD_SECTION) {
    const page = state.find(page => page.id === payload.pageId);
    const pageIndex = state.findIndex(page => page.id === payload.pageId);
    page.sections.push(payload.sectionId);
    return [...state].splice(pageIndex, 1, page);
  }

  return state;
};

export function getAllPages(state) {
  return state.content.pages;
}

export function getNumberOfPages(state) {
  return state.content.pages.length;
}

export function getNumberOfSectionsForPage(state, pageId) {
  const page = state.content.pages.find(page => page.id === pageId);
  return page.sections.length;
}
