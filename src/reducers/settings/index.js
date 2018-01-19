import * as t from '@/actions/types';

// Mock data: makes test fail
const initialState = {
  projectName: 'your amazing technicolor website',
  language: 'EN',
  maxPages: 5,
  minPages: 3,
  maxSectionsPerPage: 6,
  minSectionsPerPage: 1,
};

export default (state = initialState, action = {}) => {
  const { type, payload } = action;

  if (type === t.FETCH_DATA_SUCCESS && payload.type === 'structure') {
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
