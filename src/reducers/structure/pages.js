import { getFieldByName } from './fields';

// Mock data: makes test fail
const initialState = {
  standard: {
    label: 'Standardseite',
    fields: ['title', 'backgroundImage', 'slug'],
    isProtected: false,
  },
  contact: {
    label: 'Kontaktseite',
    fields: ['title', 'backgroundImage', 'slug'],
    requiredSections: ['contactForm'],
    isProtected: true,
  },
};

export default (state = initialState, action = {}) => {
  return state;
}

export function getProtectedPages(state) {
  return Object.entries(state.structure.pages)
    .filter(entry => entry[1].isProtected)
    .map(entry => entry[0]);
}

export function getPageFieldNames(state, page) {
  return state.structure.pages[page].fields || [];
}

export function getPageFields(state, page, selectFieldByName = getFieldByName) {
  const fieldArray = [];
  const fieldNames = getPageFieldNames(state, page);
  fieldNames.forEach(fieldName => fieldArray.push(selectFieldByName(state, fieldName)));
  return fieldArray;
}

export function getRequiredSections(state, page) {
  return state.structure.pages[page].requiredSections || [];
}
