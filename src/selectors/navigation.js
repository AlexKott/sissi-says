import { createSelector } from 'reselect';
import { getCurrentItemInfo } from './location';

const getAllPageIds = state => state.content.global._items || [];
const getMaxAmountOfPages = state => state.structure.global.maxItems;
const getLocationPageId = state => state.location.payload ? state.location.payload.pageId : null;
const getSinglePageId = state => Object.keys(state.content.pages)[0];
const getSectionIdsForPage = pageId => state => state.content.pages[pageId]
  ? state.content.pages[pageId]._items
  : [];
const getContentPages = state => state.content.pages;
const getStructurePages = state => state.structure.pages;
const getItemContent = (id, type) => state => state.content[type][id];
const getItemStructure = (id, type) => state => state.structure[type][state.content[type][id]._type];

export const getPageStructureById = pageId => createSelector(
  [
    getContentPages,
    getStructurePages,
  ],
  (contentPages, structurePages) => {
    const pageType = contentPages[pageId] ? contentPages[pageId]._type : null;
    return structurePages[pageType] || {};
  }
);

export const getActivePageId = createSelector(
  [
    getLocationPageId,
    getMaxAmountOfPages,
    getSinglePageId,
  ],
  (locationPageId, maxAmountOfPages, singlePageId) => maxAmountOfPages > 1 ? locationPageId : singlePageId
);

export const getPropsForNavItem = (id, type) => createSelector(
  [
    getCurrentItemInfo,
    getMaxAmountOfPages,
    getSinglePageId,
    getItemContent(id, type),
    getItemStructure(id, type),
  ],
  ({ item: currentItem, parent: currentParent }, maxAmountOfPages, singlePageId, itemContent, itemStructure) => {
    const parent = currentItem.type === type ? currentParent : currentItem;
    const backLinkArray = [];
    let linkArray;

    if (maxAmountOfPages > 1 && parent.id) {
      backLinkArray.push(parent.type);
      backLinkArray.push(parent.id);
    }
    linkArray = backLinkArray.concat([type, id]);

    if (maxAmountOfPages <= 1) {
      linkArray.unshift(singlePageId);
      linkArray.unshift('pages');
    }

    return {
      isActive: currentItem.id === id,
      backLinkArray,
      linkArray,
      title: itemContent.title ? itemContent.title : itemStructure.label,
    }
  }
);

export const getPropsForPageNav = createSelector(
  [
    getAllPageIds,
    getMaxAmountOfPages,
  ],
  (pageIds, maxAmountOfPages) => {
    if (maxAmountOfPages > 1) {
      return {
        canAdd: maxAmountOfPages > pageIds.length,
        itemIds: pageIds,
      };
    }
    return null;
  }
);

export const getPropsForSectionNav = pageId => createSelector(
  [
    getSectionIdsForPage(pageId),
    getPageStructureById(pageId),
  ],
  (sectionIds, { maxItems }) => {
    if (pageId && maxItems > 0) {
      return {
        canAdd: maxItems > sectionIds.length,
        itemIds: sectionIds,
      };
    }
    return null;
  }
);
