import * as t from '../actions/types';
import * as actions from '../actions/creators';
import * as selectors from '../reducers/selectors';

export default (store) => next => action => {
    const state = store.getState();
    const { type } = action;

    if (type === t.SET_INITIAL_CONTENT) {
        const minPages = selectors.getMinPages(state);
        const protectedPages = selectors.getProtectedPages(state);

        protectedPages.forEach(page => store.dispatch(actions.addPage(page)));

        // TODO: while (minPages > selectors.getNumberOfPages(state)) {
        while (false) {
            store.dispatch(actions.addPage());
        }

    } else {
        return next(action);
    }
}
