import * as t from '@/actions/types';
import * as actions from '@/actions/creators';
import * as selectors from '@/reducers/selectors';

export default ({ dispatch, getState }, getters = selectors) => next => action => {
  const { type } = action;

  if (type === t.SET_INITIAL_CONTENT) {
    const metaFields = getters.getMetaFieldNames(getState());
    const minPages = getters.getMinPages(getState());
    const protectedPages = getters.getProtectedPages(getState());

    const initialMetaData = {};
    metaFields.forEach(field => initialMetaData[field] = '');
    action.payload = {};
    action.payload.meta = initialMetaData;
    next(action);

    protectedPages.forEach(page => dispatch(actions.addPage(page)));

    while (minPages > getters.getNumberOfPages(getState())) {
      dispatch(actions.addPage());
    }
  } else {
    next(action);
  }
}
