import { createSelector } from 'reselect';

import * as c from '@/constants';
import * as s from '@/reducers/selectors';

export const getCurrentItemBlueprintWithParent = createSelector(
  [
    s.getLocation,
  ],
  ({ routesMap, type: locationType, payload }) => {
    const type = routesMap[locationType].itemType;
    let parent = null;
    let id = null;

    if (type === c.SECTIONS) {
      id = payload.sectionId;
      parent = {
        id: payload.pageId,
        type: c.PAGES,
      };

    } else if (type === c.PAGES) {
      id = payload.pageId;
      parent = {
        id: null,
        type: c.GLOBAL,
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

export const getCurrentItemWithParent = createSelector(
  [
    getCurrentItemBlueprintWithParent,
    s.getContent,
    s.getStructure,
  ],
  ({ item: itemBlueprint, parent: parentBlueprint }, contentState, structureState) => {
    const content = itemBlueprint.id
      ? contentState[itemBlueprint.type][itemBlueprint.id]
      : contentState[itemBlueprint.type];
    const structure = content._type
      ? structureState[itemBlueprint.type][content._type]
      : structureState[itemBlueprint.type];
    let parent = null;

    if (parentBlueprint) {
      const parentContent = parentBlueprint.id
        ? contentState[parentBlueprint.type][parentBlueprint.id]
        : contentState[parentBlueprint.type];
      const parentStructure = parentContent._type
        ? structureState[parentBlueprint.type][parentContent._type]
        : structureState[parentBlueprint.type];
      parent = {
        ...parentBlueprint,
        content: parentContent,
        structure: parentStructure,
      };
    }

    return {
      item: {
        ...itemBlueprint,
        content,
        structure,
      },
      parent,
    };
  }
);
