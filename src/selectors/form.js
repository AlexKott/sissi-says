import { createSelector } from 'reselect';

const getFields = state => state.structure.fields;

export const getFieldWithName = fieldName => createSelector(
  [
    getFields,
  ],
  fields => ({ ...fields[fieldName], name: fieldName })
);
