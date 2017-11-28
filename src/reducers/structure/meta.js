// Mock data: makes test fail
const initialState = [
    {
        key: 'title',
        label: 'Name der Website',
        type: 'string',
    },
    {
        key: 'description',
        label: 'Kurze Beschreibung der Website',
        type: 'text',
    },
];

export default (state = initialState, action = {}) => {
    return state;
}
