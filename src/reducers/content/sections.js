import cloneDeep from 'lodash.clonedeep';

import * as t from '@/actions/types';
import { getMaxListItems, getMinListItems } from '@/reducers/structure/fields';

const initialState = {};

export default (state = initialState, action = {}) => {
  const { type, payload } = action;

  if (type === t.FETCH_DATA_SUCCESS && payload.dataType === 'content') {
    return payload.data.sections || {};

  } else if (type === t.ADD_SECTION) {
    return Object.assign({}, state, { [payload.sectionId]: payload.section });

  } else if (type === t.ADD_LIST_ITEM) {
    const newState = cloneDeep(state);
    newState[payload.sectionId][payload.listName].push(payload.listItem);
    return newState;

  } else if (type === t.DELETE_SECTION) {
    const newState = cloneDeep(state);
    delete newState[payload.sectionId];
    return newState;

  } else if (type === t.DELETE_LIST_ITEM) {
    const newState = cloneDeep(state);
    newState[payload.sectionId][payload.listName].splice(payload.itemIndex, 1);
    return newState;

  } else if (type === t.RESET_SESSION) {
    return initialState;
  }

  return state;
};

export function getAllSections(state) {
  return cloneDeep(state.content.sections);
}

export function getSectionById(state, sectionId) {
  return state.content.sections[sectionId] || {};
}

export function getInitialSectionValues(state, sectionId) {
  const sectionCopy = cloneDeep(getSectionById(state, sectionId));
  delete sectionCopy.sectionType;
  return sectionCopy;
}

export function getNumberOfListItems(state, sectionId, listName) {
  return getSectionById(state, sectionId)[listName].length;
}

export function getCanAddListItem(state, sectionId, listName, selectMaxListItems = getMaxListItems) {
  return getNumberOfListItems(state, sectionId, listName) < selectMaxListItems(state, listName);
}

export function getCanDeleteListItem(state, sectionId, listName, selectMinListItems = getMinListItems) {
  return getNumberOfListItems(state, sectionId, listName) > selectMinListItems(state, listName);
}
