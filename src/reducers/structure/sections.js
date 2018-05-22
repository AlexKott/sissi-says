import * as t from '@/actions/types';
import { getRequiredSections } from './pages';
import { getFieldByName } from './fields';

const initialState = {};

export default (state = initialState, action = {}) => {
  const { type, payload } = action;

  if (type === t.FETCH_DATA_SUCCESS && payload.dataType === 'structure') {
    return payload.data.sections;

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

export function getProtectedSectionsForPage(state, pageType, selectRequiredSections = getRequiredSections) {
  const requiredSections = selectRequiredSections(state, pageType);
  const protectedSections = getProtectedSections(state);
  return requiredSections.filter(entry => protectedSections.indexOf(entry) !== -1);
}

export function getSectionFieldNames(state, sectionType) {
  const section = getSectionByType(state, sectionType);
  return section.fields || [];
}

export function getSectionFields(state, sectionType, selectFieldByName = getFieldByName) {
  const fieldNames = getSectionFieldNames(state, sectionType);
  return fieldNames.map(fieldName => selectFieldByName(state, fieldName));
}
