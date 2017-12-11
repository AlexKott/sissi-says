import * as actions from '../actions/creators';
import * as selectors from '../reducers/selectors';

export default {
  onBeforeChange(dispatch, getState) {
    const isContentLoaded = selectors.getIsContentLoaded(getState());
    if (!isContentLoaded) {
      dispatch(actions.setInitialContent());
    }
  }
}
