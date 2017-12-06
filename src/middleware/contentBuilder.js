import * as t from '../actions/types';
import * as actions from '../actions/creators';
import * as selectors from '../reducers/selectors';

export default ({ dispatch, getState }) => next => action => {
  const { type } = action;

  if (type === t.SET_INITIAL_CONTENT) {
    const metaFields = selectors.getMetaFields(getState());
    const minPages = selectors.getMinPages(getState());
    const protectedPages = selectors.getProtectedPages(getState());

    const initialMetaData = {};
    metaFields.forEach(field => initialMetaData[field] = '');
    action.payload = {};
    action.payload.meta = initialMetaData;
    next(action);

    protectedPages.forEach(page => dispatch(actions.addPage(page)));

    while (minPages > selectors.getNumberOfPages(getState())) {
      dispatch(actions.addPage());
    }
  } else {
    next(action);
  }
}
