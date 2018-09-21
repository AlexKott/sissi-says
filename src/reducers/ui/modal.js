import * as t from '@/actions/types';

const initialState = null;

export default (state = initialState, action = {}) => {
  const { type, payload } = action;

  if (type === t.SET_MODAL_TYPE) {
    return payload.type;
  }

  return state;
}

export const getModalType = state => state.ui.modal;
