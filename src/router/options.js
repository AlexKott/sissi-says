import * as actions from '@/actions/creators';
import * as selectors from '@/reducers/selectors';
import * as routes from './routes';

export default {
  onBeforeChange(dispatch, getState, bag) {
    const isLoggedIn = selectors.getAuthToken(getState()) !== null;
    const isNavigatingToLogin = bag.action.type === routes.ROUTE_LOGIN;
    const isInitialDataFetched = selectors.getIsInitialDataFetched(getState());

    if (isNavigatingToLogin && isLoggedIn) {
      return dispatch(actions.redirectToIndex());
    } else if (!isNavigatingToLogin && !isLoggedIn) {
      return dispatch(actions.redirectToLogin());
    }

    if (isLoggedIn && !isInitialDataFetched) {
      dispatch(actions.fetchData('structure'));
    }
  }
}
