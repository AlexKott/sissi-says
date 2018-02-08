import * as t from '@/actions/types';
import { getRequiredSections } from './pages';
import { getFieldByName } from './fields';

export default (state = {}, action = {}) => {
  const { type, payload } = action;

  if (type === t.FETCH_DATA_SUCCESS && payload.dataType === 'structure') {
    return payload.data.sections;
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

export function getSectionFieldNames(state, sectionId) {
  const section = state.structure.sections[sectionId] || {};
  return section.fields || [];
}

export function getSectionFields(state, section, selectFieldByName = getFieldByName) {
  const fieldNames = getSectionFieldNames(state, section);
  return fieldNames.map(fieldName => selectFieldByName(state, fieldName));
}
