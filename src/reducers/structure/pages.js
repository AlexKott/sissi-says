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

export function getPageFields(state, page) {
  return state.structure.pages[page].fields || [];
}

export function getRequiredSections(state, page) {
  return state.structure.pages[page].requiredSections || [];
}
