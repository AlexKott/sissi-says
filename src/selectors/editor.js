import { createSelector } from 'reselect';

import { getCurrentItemInfo } from './location';

const getContent = state => state.content;
const getStructure = state => state.structure;

export const getCurrentItem = createSelector(
  [
    getCurrentItemInfo,
    getContent,
    getStructure,
  ],
  ({ item: itemInfo, parent: parentInfo }, contentState, structureState) => {
    const content = itemInfo.id
      ? contentState[itemInfo.type][itemInfo.id]
      : contentState[itemInfo.type];
    const structure = content._type
      ? structureState[itemInfo.type][content._type]
      : structureState[itemInfo.type];
    let parent = null;

    if (parentInfo) {
      const parentContent = parentInfo.id
        ? contentState[parentInfo.type][parentInfo.id]
        : contentState[parentInfo.type];
      const { maxItems, minItems } = parentContent._type
        ? structureState[parentInfo.type][parentContent._type]
        : structureState[parentInfo.type];
      parent = {
        itemIds: parentContent._items,
        maxItems,
        minItems,
      };
    }

    return {
      content,
      structure,
      parent,
    };
  }
);

export const getPropsForEditor = createSelector(
  [
    getCurrentItem,
  ],
  ({ content, structure, parent }) => {
    return {
      canDelete: !structure.isProtected && parent.minItems < parent.itemIds.length,
    };
  }
);
