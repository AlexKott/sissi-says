import { createSelector } from 'reselect';

const getAllPageIds = state => state.content.global._items || [];
const getMaxAmountOfPages = state => state.structure.global.maxItems;
const getLocationPageId = state => state.location.payload ? state.location.payload.pageId : null;
const getSinglePageId = state => Object.keys(state.content.pages)[0];
const getSectionIdsForPage = pageId => state => state.content.pages[pageId]
  ? state.content.pages[pageId]._items
  : [];
const getContentPages = state => state.content.pages;
const getStructurePages = state => state.structure.pages;

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
