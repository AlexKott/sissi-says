import * as actions from '@/actions/creators';
import * as selectors from '@/reducers/selectors';

export default {
  onBeforeChange(dispatch, getState) {
    const isStructureLoaded = selectors.getIsStructureLoaded(getState());
    const isContentLoaded = selectors.getIsContentLoaded(getState());

    if (!isStructureLoaded) {
      dispatch(actions.fetchData('structure'));
    }

    if (!isContentLoaded) {
      dispatch(actions.fetchData('content'));
      dispatch(actions.setInitialContent()); // TODO: handle after request
    }
  }
}
