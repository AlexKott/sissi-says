import * as t from '../actions/types';
import * as selectors from '../reducers/selectors';
import * as actions from '../actions/creators';

export default (store) => next => action => {
    const state = store.getState();
    const { type, payload } = action;

    if (type === t.ADD_PAGE) {
        const pageType = payload.type ? payload.type : 'standard';
        const fields = selectors.getPageFields(state, pageType);
        const protectedSections = selectors.getProtectedSectionsForPage(state, pageType);
        const minSectionsPerPage = selectors.getMinSectionsPerPage(state);

        const newPage = {};
        newPage.id = 'page_01';
        newPage.sections = [];
        fields.forEach(field => newPage[field] = '');

        payload.page = newPage;
        next(action);

        protectedSections.forEach(section => store.dispatch(actions.addSection(newPage.id, section)));

        // while (minSectionsPerPage > selectors.getNumberOfSections(state, newPage.id)) {
        while (false) {
            store.dispatch(actions.addSection(newPage.id));
        }

    } else {
        return next(action);
    }
}
