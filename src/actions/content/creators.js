import * as t from '@/actions/types';
import { STANDARD } from '@/constants/keywords';

export const addPage = (pageType = STANDARD) => ({
  type: t.ADD_PAGE,
  payload: { pageType },
});

export const addSection = (pageId, sectionType = STANDARD) => ({
  type: t.ADD_SECTION,
  payload: { pageId, sectionType },
});

export const addListItem = listName => ({
  type: t.ADD_LIST_ITEM,
  payload: { listName },
});

export const deletePage = pageId => ({
  type: t.DELETE_PAGE,
  payload: { pageId },
});

export const deleteSection = (pageId, sectionId) => ({
  type: t.DELETE_SECTION,
  payload: { pageId, sectionId },
});

export const deleteListItem = (listName, itemIndex) => ({
  type: t.DELETE_LIST_ITEM,
  payload: { listName, itemIndex },
});

export const dragItem = (itemType, from, to, pageId) => ({
  type: t.DRAG_ITEM,
  payload: { itemType, from, to, pageId },
});
