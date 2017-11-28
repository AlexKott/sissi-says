import { combineReducers } from 'redux';

import meta from './meta';
import page from './page';
import section from './section';

export default combineReducers({
    meta,
    page,
    section,
});
