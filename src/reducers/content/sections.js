import * as t from '../../actions/types';

export default (state = {}, action = {}) => {
    const { type, payload } = action;

    if (type === t.ADD_SECTION) {
        return Object.assign({}, state, { [payload.sectionId]: payload.section });
    } else {
        return state;
    }
};
