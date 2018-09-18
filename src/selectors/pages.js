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
