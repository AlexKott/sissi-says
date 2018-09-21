import * as t from '@/actions/types';

const initialState = '';

export default (state = initialState, action = {}) => {
  const { type, payload } = action;

  if (type === t.SET_MODAL_TYPE) {
    return payload;
  }

  return state;
}

export const getModalType = state => state.ui.modal;
