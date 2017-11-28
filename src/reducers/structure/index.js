import { combineReducers } from 'redux';

import fields from './fields';
import meta from './meta';
import page from './page';
import section from './section';

export default combineReducers({
    fields,
    meta,
    page,
    section,
});
