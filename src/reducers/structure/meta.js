// Mock data: makes test fail
const initialState = {
    fields: ['metaTitle', 'metaDescription'],
};

export default (state = initialState, action = {}) => {
    return state;
}
