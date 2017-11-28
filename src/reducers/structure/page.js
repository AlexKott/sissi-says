// Mock data: makes test fail
const initialState = [
    {
        key: 'title',
        label: 'Seitentitel',
        type: 'string',
    },
    {
        key: 'backgroundImage',
        label: 'Hintergrundbild',
        type: 'image',
    },
    {
        key: 'slug',
        label: 'Route',
        placeholder: '/coaching',
        type: 'string',
    },
];

export default (state = initialState, action = {}) => {
    return state;
}
