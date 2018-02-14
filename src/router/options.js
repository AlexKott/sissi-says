import * as actions from '@/actions/creators';
import * as selectors from '@/reducers/selectors';
import * as routes from './routes';

export default {
  onBeforeChange(dispatch, getState, bag) {
    const isLoggedIn = selectors.getAuthToken(getState()) !== null;
    const location = getState().location.type;
    const nextLocation = bag.action.type;
    const isLoggingIn = location === routes.ROUTE_LOGIN || nextLocation === routes.ROUTE_LOGIN;
    const isInitialDataFetched = selectors.getIsInitialDataFetched(getState());

    if (!isLoggedIn && !isLoggingIn) {
      dispatch(actions.redirectToLogin());
    } else if (isLoggedIn && !isInitialDataFetched) {
      dispatch(actions.fetchData('structure'));
    }
  }
}
