import * as t from '@/actions/types';
import * as selectors from '@/selectors';
import * as actions from '@/actions/creators';
import getRandomString from '@/helpers/getRandomString';

export default ({ dispatch, getState }, getters = selectors) => next => action => {
  const { type, payload } = action;

  if (type === t.ADD_PAGE) {
    const pageType = payload.pageType || 'standard';
    const minSectionsPerPage = getters.getMinSectionsPerPage(getState());
    let protectedSections = [];

    const pageId = getRandomString();
    const newPage = {};
    newPage.id = pageId;
    newPage.pageType = pageType;
    newPage.sections = [];

    if (pageType === 'singlePage') {
      protectedSections = getters.getProtectedSections(getState());
      
    } else {
      protectedSections = getters.getProtectedSectionsForPage(getState(), pageType);

      const fields = getters.getPageFieldNames(getState(), pageType);
      fields.forEach(field => newPage[field] = '');
    }

    payload.page = newPage;
    next(action);

    protectedSections.forEach(section => dispatch(actions.addSection(pageId, section)));

    while (minSectionsPerPage > getters.getNumberOfSectionsForPage(getState(), pageId)) {
      dispatch(actions.addSection(pageId));
    }

  } else {
    next(action);
  }
}
