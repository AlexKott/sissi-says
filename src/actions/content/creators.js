import * as t from './types';
import { getSectionIdsForPage } from '@/reducers/content/pages';

export function setInitialContent() {
  return {
    type: t.SET_INITIAL_CONTENT,
  };
}

export function addPage(pageType) {
  return {
    type: t.ADD_PAGE,
    payload: { pageType },
  };
}

export function addSection(pageId, sectionType) {
  return {
    type: t.ADD_SECTION,
    payload: { pageId, sectionType },
  };
}

export function deletePage(pageId) {
  return (dispatch, getState, selectSectionIdsForPage = getSectionIdsForPage) => {
    const sectionIds = selectSectionIdsForPage(getState(), pageId);
    sectionIds.forEach(sectionId => dispatch(deleteSection(pageId, sectionId)));
    dispatch({
      type: t.DELETE_PAGE,
      payload: { pageId },
    });
  };
}

export function deleteSection(pageId, sectionId) {
  return {
    type: t.DELETE_SECTION,
    payload: { pageId, sectionId },
  };
}

export function dragPage(from, to) {
  return {
    type: t.DRAG_PAGE,
    payload: { from, to },
  };
}

export function dragSection(pageId, from, to) {
  return {
    type: t.DRAG_SECTION,
    payload: { pageId, from, to },
  };
}
