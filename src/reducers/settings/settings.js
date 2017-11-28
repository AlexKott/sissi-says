// Mock data: makes test fail
const initialState = {
    maxPages: 5,
    minPages: 3,
    maxSectionsPerPage: 6,
    minSectionsPerPage: 1,
    protectedPages: ['contact'],
};

export default (state = initialState, action = {}) => {
    return state;
};
