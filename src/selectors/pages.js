import { createSelector } from 'reselect';

const getAllPageIds = state => state.content.global._items;
const getPagesContent = state => state.content.pages;

export const getAllPages = createSelector(
  [
    getAllPageIds,
    getPagesContent,
  ],
  (pageIds, pagesContent) => pageIds.map(id => pagesContent[id])
);
