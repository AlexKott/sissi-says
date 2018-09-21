import * as t from '@/actions/types';
import * as k from '@/constants/keywords';

import { getFieldByName } from './fields';

const initialState = {};

export default (state = initialState, action = {}) => {
  const { type, payload } = action;

  if (type === t.SEND_REQUEST && payload.dataType === k.STRUCTURE) {
    return payload.responseData.pages || initialState;

  } else if (type === t.RESET_SESSION) {
    return initialState;
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

export function getIsSinglePage(state) {
  return Object.keys(state.structure.pages).length === 0;
}

export const getStructurePages = state => state.structure.pages;
