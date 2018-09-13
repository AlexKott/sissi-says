import { createSelector } from 'reselect';

const getMaxAmountOfPages = state => state.structure.global.maxItems;
const getContent = state => state.content;
const getStructure = state => state.structure;
const getCurrentPageId = state => state.location.payload ? state.location.payload.pageId : null;

export const getPropsForNavBar = level => createSelector(
  [
    getContent,
    getStructure,
    getMaxAmountOfPages,
    getCurrentPageId,
  ],
  (content, structure, maxAmountOfPages, currentPageId) => {
    let type = 'pages';
    let navItems, pageId, maxItems, existingItems;

    if (maxAmountOfPages <= 1) {
      type = 'sections';
      pageId = Object.keys(content.pages)[0];
    } else if (level === 2) {
      pageId = currentPageId;
      type = structure.pages[content.pages[currentPageId]._type].maxItems === 0 ? null : 'sections';
    }

    if (type === 'pages') {
      navItems = content.global._items.map(pageId => {
        const page = content.pages[pageId];
        page._link = `/page/${pageId}`;
        return page;
      });

      maxItems = maxAmountOfPages;
      existingItems = content.global._items.length;

    } else {
      navItems = content.pages[pageId]._items.map(sectionId => {
        const section = content.sections[sectionId];
        section._link = `/page/${pageId}/section/${sectionId}`;
        return section;
      });

      maxItems = structure.pages[content.pages[pageId]._type].maxItems;
      existingItems = content.pages[pageId]._items.length;
    }


    return {
      canAdd: maxItems > existingItems,
      navItems,
      type,
      parentId: type === 'sections' ? pageId : 'global',
    };
  }
);
