import * as t from '@/actions/types';

export default (state = {}, action = {}) => {
  const { type, payload } = action;

  if (type === t.FETCH_DATA_SUCCESS && payload.dataType === 'structure') {
    return payload.data.settings;
  }

  return state;
};

export function getMinPages(state) {
  return state.settings.minPages;
}

export function getMinSectionsPerPage(state) {
  return state.settings.minSectionsPerPage;
}
