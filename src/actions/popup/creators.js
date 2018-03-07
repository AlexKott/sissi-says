import * as t from './types';

export function togglePopup(type, isVisible) {
  return {
    type: t.TOGGLE_POPUP,
    payload: {
      type,
      isVisible,
    }
  };
}
