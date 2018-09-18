import { getIsSinglePage } from '@/reducers/structure/pages';
import { getSinglePageId } from '@/reducers/content/pages';

export function getSelectedPageId(state, getters = { getIsSinglePage, getSinglePageId }) {
  if (getters.getIsSinglePage(state)) {
    return getters.getSinglePageId(state);
  }
  return state.location.payload.pageId;
}

export function getSelectedSectionId(state) {
  return state.location.payload.sectionId;
}

export const getLocation = state => state.location;
export const getCurrentRoute = state => state.location.type;
