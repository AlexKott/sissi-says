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
