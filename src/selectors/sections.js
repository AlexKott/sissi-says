import { createSelector } from 'reselect';

import * as s from '@/reducers/selectors';

export const getSectionsForPage = pageId => createSelector(
  [
    s.getSectionIdsForPage(pageId),
    s.getContentSections,
  ],
  (sectionIds, contentSections) => sectionIds.map(id => contentSections[id])
);
