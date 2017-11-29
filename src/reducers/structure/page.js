// Mock data: makes test fail
const initialState = {
    standard: {
        label: 'Standard',
        fields: ['title', 'backgroundImage', 'slug'],
        isProtected: false,
    },
    contact: {
        label: 'Kontakt',
        fields: ['title', 'backgroundImage', 'slug'],
        isProtected: true,
    },
};

export default (state = initialState, action = {}) => {
    return state;
}

export function getProtectedPages(state) {
    return Object.entries(state.structure.page)
            .filter(entry => entry[1].isProtected)
            .map(entry => entry[0]);
}
