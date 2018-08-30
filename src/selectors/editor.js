import { createSelector } from 'reselect';

const getContent = state => state.content;
const getStructure = state => state.structure;

export const getPropsForEditor = (viewType, pageId, sectionId) => createSelector(
  [
    getPropsForView(viewType, pageId, sectionId),
    getSiblingIds(viewType, pageId),
  ],
  ({ content, structure }, siblings) => ({
    canDelete: false,
  })
);

export const getPropsForView = (viewType, pageId, sectionId) => createSelector(
  [
    getContent,
    getStructure,
  ],
  (contentState, structureState) => {
    let content = contentState[viewType];
    let structure = structureState[viewType];

    if (sectionId) {
      content = content[sectionId];
      structure = structure[content.type];
    } else if (pageId) {
      content = content[pageId];
      structure = structure[content.type];
    }

    return { content, structure };
  }
);

export const getSiblingIds = (viewType, pageId) => createSelector(
  [
    getContent,
  ],
  (contentState) => {
    if (viewType === 'sections') {
      return contentState.pages[pageId].sections;
    } else if (viewType === 'pages') {
      return contentState.global.pages;
    } else {
      return [];
    }
  }
);
