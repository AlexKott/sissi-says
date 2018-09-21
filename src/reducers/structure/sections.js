import * as t from '@/actions/types';
import * as k from '@/constants/keywords';

import { getFieldByName } from './fields';

const initialState = {};

export default (state = initialState, action = {}) => {
  const { type, payload } = action;

  if (type === t.SEND_REQUEST && payload.dataType === k.STRUCTURE) {
    return payload.responseData.sections || initialState;

  } else if (type === t.RESET_SESSION) {
    return initialState;
  }

  return state;
}

export function getSectionByType(state, sectionType) {
  return state.structure.sections[sectionType] || {};
}

export function getProtectedSections(state) {
  return Object.entries(state.structure.sections)
  .filter(entry => entry[1].isProtected)
  .map(entry => entry[0]);
}

export function getIsProtectedSection(state, sectionType) {
  return getSectionByType(state, sectionType).isProtected;
}

export function getSectionFieldNames(state, sectionType) {
  const section = getSectionByType(state, sectionType);
  return section.fields || [];
}

export function getSectionFields(state, sectionType, selectFieldByName = getFieldByName) {
  const fieldNames = getSectionFieldNames(state, sectionType);
  return fieldNames.map(fieldName => selectFieldByName(state, fieldName));
}
