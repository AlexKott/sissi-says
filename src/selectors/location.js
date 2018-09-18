import { createSelector } from 'reselect';

import * as c from '@/constants';
import * as s from '@/reducers/selectors';

export const getCurrentViewLevel = createSelector(
  [
    s.getLocation,
    s.getStructure,
  ],
  (location, structure) => {
    const type = location.routesMap[location.type].itemType;
    let level = type === c.GLOBAL ? 1 : 2;

    if (type === c.SECTIONS) {
      const isSinglePage = structure.global.minItems === 1 && structure.global.maxItems === 1;
      level = isSinglePage ? 2 : 3;
    }
    return level;
  }
);
