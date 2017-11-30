import * as t from '../../actions/types';

export default (state = {}, action = {}) => {
    const { type, payload } = action;

    if (type === t.ADD_PAGE) {
        return Object.assign({}, state, { [payload.pageId]: payload.page });
    } else {
        return state;
    }
};

export function getNumberOfPages(state) {
    return Object.keys(state.content.pages).length;
}
