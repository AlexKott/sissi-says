import * as t from './types';

export function displayPopup(type, shouldDisplay) {
  return {
    type: t.SET_POPUP,
    payload: {
      type,
      shouldDisplay,
    }
  };
}
