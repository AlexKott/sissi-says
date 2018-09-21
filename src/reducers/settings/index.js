import * as t from '@/actions/types';

const initialState = {};

export default (state = initialState, action = {}) => {
  const { type, payload } = action;

  if (type === t.SEND_REQUEST && payload.dataType === 'structure') {
    return payload.responseData.settings;

  } else if (type === t.RESET_SESSION) {
    return initialState;
  }

  return state;
};

export const getSettingsLanguage = state => state.settings.language;
