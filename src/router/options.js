import * as actions from '@/actions';
import * as k from '@/constants/keywords';
import * as selectors from '@/selectors';

import * as routes from './index';

export default {
  onBeforeChange(dispatch, getState, bag) {
    const isLoggedIn = selectors.getAuthToken(getState()) !== null;
    const isNavigatingToLogin = bag.action.type === routes.ROUTE_LOGIN;
    const isInitialDataFetched = selectors.getIsInitialDataFetched(getState());
    const isSinglePage = selectors.getIsSinglePage(getState());
    const isNavigatingToPage = bag.action.type === routes.ROUTE_PAGE;

    if (isNavigatingToLogin && isLoggedIn) {
      return dispatch(actions.redirectToIndex());
    } else if (!isNavigatingToLogin && !isLoggedIn) {
      return dispatch(actions.redirectToLogin());
    }

    if (isLoggedIn && !isInitialDataFetched) {
      dispatch(actions.fetchData(k.STRUCTURE));
      dispatch(actions.fetchData(k.IMAGES));
    }

    if (isSinglePage && isNavigatingToPage) {
      return dispatch(actions.redirectToIndex());
    }
  }
}
