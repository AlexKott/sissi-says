import * as selectors from '../selectors';

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

// TODO: test
export function getProtectedSections(state) {
    return Object.entries(state.structure.section)
            .filter(entry => entry[1].isProtected)
            .map(entry => entry[0]);
}

// TODO: test
export function getProtectedSectionsForPage(state, pageType, getters = selectors) {
    const requiredSections = getters.getRequiredSections(state, pageType);
    const protectedSections = getProtectedSections(state);
    return requiredSections.filter(entry => protectedSections.indexOf(entry) !== -1);
}

// TODO: test
export function getSectionFields(state, section) {
    return state.structure.section[section].fields;
}
