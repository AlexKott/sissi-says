import { combineReducers } from 'redux';

import meta from './meta';
import pages from './pages';
import sections from './sections';

export default combineReducers({
    meta,
    pages,
    sections,
});
