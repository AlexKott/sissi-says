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

export const getSettingsLanguage = state => state.settings.language;
