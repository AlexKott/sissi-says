import { getRequiredSections } from './pages';
import { getFieldByName } from './fields';

// Mock data: makes test fail
const initialState = {
  standard: {
    label: 'Standard',
    fields: ['title', 'content', 'horizontalPosition', 'verticalPosition', 'width'],
    isProtected: false,
  },
  contactForm: {
    label: 'Kontaktformular',
    fields: ['title'],
    isProtected: true,
  },
};

export default (state = initialState, action = {}) => {
  return state;
}

export function getProtectedSections(state) {
  return Object.entries(state.structure.sections)
  .filter(entry => entry[1].isProtected)
  .map(entry => entry[0]);
}

export function getProtectedSectionsForPage(state, pageType, selectRequiredSections = getRequiredSections) {
  const requiredSections = selectRequiredSections(state, pageType);
  const protectedSections = getProtectedSections(state);
  return requiredSections.filter(entry => protectedSections.indexOf(entry) !== -1);
}

export function getSectionFieldNames(state, section) {
  return state.structure.sections[section].fields;
}

export function getSectionFields(state, section, selectFieldByName = getFieldByName) {
  const fieldArray = [];
  const fieldNames = getSectionFieldNames(state, section);
  fieldNames.forEach(fieldName => fieldArray.push(selectFieldByName(state, fieldName)));
  return fieldArray;
}
