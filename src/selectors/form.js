import { createSelector } from 'reselect';

import * as s from '@/reducers/selectors';

export const getFieldWithName = fieldName => createSelector(
  [
    s.getFields,
  ],
  fields => ({ ...fields[fieldName], name: fieldName })
);
