import { createSelector } from 'reselect';

import * as k from '@/constants/keywords';
import * as s from '@/reducers/selectors';
import { getLocationPageId } from './location';

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
    getLocationPageId,
    getSinglePageId,
  ],
  (locationPageId, singlePageId) => singlePageId ? singlePageId : locationPageId
);

export const getAllowedPageTypes = createSelector(
  [
    s.getStructurePages,
  ],
  structurePages => Object.entries(structurePages).reduce((acc, [pageType, page]) => {
    if (!page.isProtected) {
      acc.push(pageType);
    }
    return acc;
  }, [])
);

export const getAllowedSectionTypesForPageId = pageId => createSelector(
  [
    s.getPageById(pageId),
    s.getStructurePages,
    s.getStructureSections,
  ],
  ({ _type: pageType }, structurePages, structureSections) => {
    if (structurePages) {
      return structurePages[pageType] && structurePages[pageType].allowedItems
        ? structurePages[pageType].allowedItems
        : [k.STANDARD]
    }
    return Object.keys(structureSections);
  }
);
