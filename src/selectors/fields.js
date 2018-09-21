import { createSelector } from 'reselect';

import * as s from '@/reducers/selectors';

export const getFieldWithName = fieldName => createSelector(
  [
    s.getFields,
  ],
  fields => ({ ...fields[fieldName], name: fieldName })
);

export const getFieldsForPageType = pageType => createSelector(
  [
    s.getFields,
    s.getStructurePages,
  ],
  (fields, structurePages) => structurePages[pageType].fields.map(fieldName => ({
    ...fields[fieldName],
    _name: fieldName,
  }))
);

export const getFieldsForSectionType = sectionType => createSelector(
  [
    s.getFields,
    s.getStructureSections,
  ],
  (fields, structureSections) => structureSections[sectionType].fields.map(fieldName => ({
    ...fields[fieldName],
    _name: fieldName,
  }))
);
