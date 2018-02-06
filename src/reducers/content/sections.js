import cloneDeep from 'lodash.clonedeep';

import * as t from '@/actions/types';

export default (state = {}, action = {}) => {
  const { type, payload } = action;

  if (type === t.FETCH_DATA_SUCCESS && payload.dataType === 'content') {
    return payload.data.sections || {};

  } else if (type === t.ADD_SECTION) {
    return Object.assign({}, state, { [payload.sectionId]: payload.section });

  } else if (type === t.DELETE_SECTION) {
    const newState = cloneDeep(state);
    delete newState[payload.sectionId];
    return newState;
  }

  return state;
};

export function getAllSections(state) {
  return state.content.sections;
}

export function getSectionById(state, sectionId) {
  return state.content.sections[sectionId] || {};
}
