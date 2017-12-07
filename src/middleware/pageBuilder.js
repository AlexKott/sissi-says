import * as t from '../actions/types';
import * as selectors from '../reducers/selectors';
import * as actions from '../actions/creators';

export default ({ dispatch, getState }) => next => action => {
  const { type, payload } = action;

  if (type === t.ADD_PAGE) {
    const pageType = payload.type || 'standard';
    const fields = selectors.getPageFields(getState(), pageType);
    const protectedSections = selectors.getProtectedSectionsForPage(getState(), pageType);
    const minSectionsPerPage = selectors.getMinSectionsPerPage(getState());

    // create the new page
    const pageId = `page_${Math.random()}`;
    const newPage = {};
    newPage.id = pageId;
    newPage.sections = [];
    fields.forEach(field => newPage[field] = '');

    payload.page = newPage;
    next(action);

    // add required sections
    protectedSections.forEach(section => dispatch(actions.addSection(pageId, section)));

    while (minSectionsPerPage > selectors.getNumberOfSectionsForPage(getState(), pageId)) {
      dispatch(actions.addSection(pageId));
    }

  } else {
    next(action);
  }
}
