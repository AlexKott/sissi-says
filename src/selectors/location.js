import { createSelector } from 'reselect';

const getLocation = state => state.location;
const getStructure = state => state.structure;

export const getCurrentItemInfo = createSelector(
  [
    getLocation,
  ],
  location => {
    const type = location.routesMap[location.type].itemType;
    let parent = null;
    let id = null;

    if (type === 'sections') {
      id = location.payload.sectionId;
      parent = {
        id: location.payload.pageId,
        type: 'pages',
      };

    } else if (type === 'pages') {
      id = location.payload.pageId;
      parent = {
        id: null,
        type: 'global',
      };
    }

    return {
      item: {
        id,
        type,
      },
      parent,
    };
  }
);

export const getCurrentViewLevel = createSelector(
  [
    getLocation,
    getStructure,
  ],
  (location, structure) => {
    const type = location.routesMap[location.type].itemType;
    let level = type === 'global' ? 1 : 2;

    if (type === 'sections') {
      const isSinglePage = structure.global.minItems === 1 && structure.global.maxItems === 1;
      level = isSinglePage ? 2 : 3;
    }
    return level;
  }
);
