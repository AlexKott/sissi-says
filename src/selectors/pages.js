import { createSelector } from 'reselect';

import * as s from '@/reducers/selectors';

export const getAllPages = createSelector(
  [
    s.getAllPageIds,
    s.getContentPages,
  ],
  (pageIds, contentPages) => pageIds.map(id => contentPages[id])
);

export const getSinglePageId = createSelector(
  [
    s.getAllPageIds,
    s.getMaxAmountOfPages,
  ],
  (pageIds, maxAmountOfPages) => {
    if (maxAmountOfPages <= 1) {
      return pageIds[0];
    }
    return null;
  }
);

export const getMaxSectionsForPage = pageId => createSelector(
  [
    s.getContentPages,
    s.getStructurePages,
  ],
  (contentPages, structurePages) => {
    const pageType = contentPages[pageId] ? contentPages[pageId]._type : null;
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
