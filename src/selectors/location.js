import { createSelector } from 'reselect';

const getLocation = state => state.location;

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
