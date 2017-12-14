import { combineReducers } from 'redux';

import fields from './fields';
import meta from './meta';
import pages from './pages';
import sections from './sections';

export default combineReducers({
  fields,
  meta,
  pages,
  sections,
});

export * from './fields';
export * from './meta';
export * from './pages';
export * from './sections';
