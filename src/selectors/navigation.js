import { createSelector } from 'reselect';

import * as s from '@/reducers/selectors';
import { getCurrentItemBlueprintWithParent } from './item';
import { getSinglePageId } from './pages';

const getItemContent = (id, type) => state => state.content[type][id];
const getItemStructure = (id, type) => state => state.structure[type][state.content[type][id]._type];

export const getPageStructureById = pageId => createSelector(
  [
    s.getContentPages,
    s.getStructurePages,
  ],
  (contentPages, structurePages) => {
    const pageType = contentPages[pageId] ? contentPages[pageId]._type : null;
    return structurePages[pageType] || {};
  }
);

export const getActivePageId = createSelector(
  [
    s.getLocationPageId,
    s.getMaxAmountOfPages,
    getSinglePageId,
  ],
  (locationPageId, maxAmountOfPages, singlePageId) => maxAmountOfPages > 1 ? locationPageId : singlePageId
);

export const getPropsForNavItem = (id, type) => createSelector(
  [
    getCurrentItemBlueprintWithParent,
    s.getMaxAmountOfPages,
    getSinglePageId,
    getItemContent(id, type),
    getItemStructure(id, type),
  ],
  ({ item: currentItem, parent: currentParent }, maxAmountOfPages, singlePageId, itemContent, itemStructure) => {
    const parent = currentItem.type === type ? currentParent : currentItem;
    const backLinkArray = [];
    let linkArray;

    if (maxAmountOfPages > 1 && parent.id && parent.type !== 'sections') {
      backLinkArray.push(parent.type);
      backLinkArray.push(parent.id);
    }
    linkArray = backLinkArray.concat([type, id]);

    if (maxAmountOfPages <= 1) {
      linkArray.unshift(singlePageId);
      linkArray.unshift('pages');
    }

    return {
      isActive: currentItem.id === id || (!!currentParent && currentParent.id === id),
      backLinkArray,
      linkArray,
      title: itemContent.title ? itemContent.title : itemStructure.label,
    }
  }
);

export const getPropsForPageNav = createSelector(
  [
    s.getAllPageIds,
    s.getMaxAmountOfPages,
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
    s.getSectionIdsForPage(pageId),
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
