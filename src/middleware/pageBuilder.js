import * as t from '@/actions/types';
import * as selectors from '@/reducers/selectors';
import * as actions from '@/actions/creators';
import getRandomString from '@/helpers/getRandomString';

export default ({ dispatch, getState }, getters = selectors) => next => action => {
  const { type, payload } = action;

  if (type === t.ADD_PAGE) {
    const pageType = payload.type || 'standard';
    const fields = getters.getPageFieldNames(getState(), pageType);
    const protectedSections = getters.getProtectedSectionsForPage(getState(), pageType);
    const minSectionsPerPage = getters.getMinSectionsPerPage(getState());

    // create the new page
    const pageId = getRandomString();
    const newPage = {};
    newPage.id = pageId;
    newPage.pageType = pageType;
    newPage.sections = [];
    fields.forEach(field => newPage[field] = '');

    payload.page = newPage;
    next(action);

    // add required sections
    protectedSections.forEach(section => dispatch(actions.addSection(pageId, section)));

    while (minSectionsPerPage > getters.getNumberOfSectionsForPage(getState(), pageId)) {
      dispatch(actions.addSection(pageId));
    }

  } else {
    next(action);
  }
}
