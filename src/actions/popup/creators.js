import * as t from './types';

export function setImagePopup(displayPopup) {
  return {
    type: t.SET_IMAGE_POPUP,
    payload: displayPopup,
  };
}
