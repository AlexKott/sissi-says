import * as actions from '../actions/creators';

export default {
    onBeforeChange(dispatch) {
        dispatch(actions.setInitialContent());
    }
}
