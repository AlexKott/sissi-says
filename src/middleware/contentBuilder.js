import * as t from '../actions/types';
import * as actions from '../actions/creators';
import * as selectors from '../reducers/selectors';

export default ({ dispatch, getState }) => next => action => {
    const { type } = action;

    if (type === t.SET_INITIAL_CONTENT) {
        const minPages = selectors.getMinPages(getState());
        const protectedPages = selectors.getProtectedPages(getState());

        protectedPages.forEach(page => dispatch(actions.addPage(page)));

        while (minPages > selectors.getNumberOfPages(getState())) {
            dispatch(actions.addPage());
        }
    } else {
        return next(action);
    }
}
