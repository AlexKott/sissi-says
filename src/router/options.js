import * as actions from '@/actions/creators';
import * as selectors from '@/reducers/selectors';

export default {
  onBeforeChange(dispatch, getState) {
    const isInitialDataFetched = selectors.getIsInitialDataFetched(getState());

    if (!isInitialDataFetched) {
      dispatch(actions.fetchData('structure'));
    }
  }
}
