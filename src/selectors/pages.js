import { createSelector } from 'reselect';

import * as s from '@/reducers/selectors';

export const getSinglePageId = createSelector(
  [
    s.getAllPageIds,
    s.getMaxAmountOfPages,
  ],
  (pageIds, maxAmountOfPages) => maxAmountOfPages <= 1 ? pageIds[0] : null
);

export const getMaxSectionsForPage = pageId => createSelector(
  [
    s.getPageById(pageId),
    s.getStructurePages,
  ],
  ({ _type: pageType }, structurePages) => {
    return structurePages[pageType] ? structurePages[pageType].maxItems : 0;
  }
);

export const getActivePageId = createSelector(
  [
    s.getLocationPageId,
    getSinglePageId,
  ],
  (locationPageId, singlePageId) => singlePageId ? singlePageId : locationPageId
);
