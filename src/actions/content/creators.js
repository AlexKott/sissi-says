import * as t from '@/actions/types';
import { STANDARD } from '@/constants/keywords';
import { getSectionIdsForPage } from '@/selectors';

export const addPage = (pageType = STANDARD) => ({
  type: t.ADD_PAGE,
  payload: { pageType },
});

export const addSection = (pageId, sectionType = STANDARD) => ({
  type: t.ADD_SECTION,
  payload: { pageId, sectionType },
});

export const addListItem = (parentType, parentId, listName) => ({
  type: t.ADD_LIST_ITEM,
  payload: { parentType, parentId, listName },
});

export const deletePage = (pageId) => (dispatch, getState, selectSectionIdsForPage = getSectionIdsForPage) => {
  const sectionIds = selectSectionIdsForPage(getState(), pageId);
  sectionIds.forEach(sectionId => dispatch(deleteSection(pageId, sectionId)));
  dispatch({
    type: t.DELETE_PAGE,
    payload: { pageId },
  });
};

export const deleteSection = (pageId, sectionId) => ({
  type: t.DELETE_SECTION,
  payload: { pageId, sectionId },
});

export const deleteListItem = (sectionId, listName, itemIndex) => ({
  type: t.DELETE_LIST_ITEM,
  payload: { sectionId, listName, itemIndex },
});

export const dragPage = (from, to) => ({
  type: t.DRAG_PAGE,
  payload: { from, to },
});

export const dragSection = (pageId, from, to) => ({
  type: t.DRAG_SECTION,
  payload: { pageId, from, to },
});
