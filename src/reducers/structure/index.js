import { combineReducers } from 'redux';

import fields from './fields';
import global from './global';
import pages from './pages';
import sections from './sections';

export default combineReducers({
  fields,
  global,
  pages,
  sections,
});

export * from './fields';
export * from './global';
export * from './pages';
export * from './sections';
