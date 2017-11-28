// Mock data: makes test fail
const initialState = {
    projectName: 'beratungundbegleitung.at',
    language: 'EN',
    maxPages: 5,
    minPages: 3,
    maxSectionsPerPage: 6,
    minSectionsPerPage: 1,
};

export default (state = initialState, action = {}) => {
    return state;
};
