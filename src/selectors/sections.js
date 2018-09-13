import { createSelector } from 'reselect';

const getSectionIdsForPage = pageId => state => state.content.pages[pageId]._items;
const getContentSections = state => state.content.sections;

export const getSectionsForPage = pageId => createSelector(
  [
    getSectionIdsForPage(pageId),
    getContentSections,
  ],
  (sectionIds, contentSections) => sectionIds.map(id => contentSections[id])
);
