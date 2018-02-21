import * as t from '@/actions/types';

const initialState = {};

export default (state = initialState, action = {}) => {
  const { type, payload } = action;

  if (type === t.FETCH_DATA_SUCCESS && payload.dataType === 'structure') {
    return payload.data.settings;

  } else if (type === t.RESET_SESSION) {
    return initialState;
  }

  return state;
};

export function getMinPages(state) {
  return state.settings.minPages;
}

export function getMinSectionsPerPage(state) {
  return state.settings.minSectionsPerPage;
}

export function getMaxPages(state) {
  return state.settings.maxPages;
}

export function getMaxSectionsPerPage(state) {
  return state.settings.maxSectionsPerPage;
}
