import * as t from '@/actions/types';
import { getFieldByName } from './fields';

export default (state = {}, action = {}) => {
  const { type, payload } = action;

  if (type === t.FETCH_DATA_SUCCESS && payload.dataType === 'structure') {
    return payload.data.pages;
  }

  return state;
}

export function getPageByType(state, pageType) {
  return state.structure.pages[pageType] || {};
}

export function getProtectedPages(state) {
  return Object.entries(state.structure.pages)
    .filter(entry => entry[1].isProtected)
    .map(entry => entry[0]);
}

export function getIsProtectedPage(state, pageType) {
  return getPageByType(state, pageType).isProtected;
}

export function getPageFieldNames(state, pageId) {
  const page = state.structure.pages[pageId] || {};
  return page.fields || [];
}

export function getPageFields(state, page, selectFieldByName = getFieldByName) {
  const fieldNames = getPageFieldNames(state, page);
  return fieldNames.map(fieldName => selectFieldByName(state, fieldName));
}

export function getRequiredSections(state, pageId) {
  const page = state.structure.pages[pageId] || {};
  return page.requiredSections || [];
}
