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

export function getProtectedSectionsForPage(state, pageType) {
    return [];
}
