import reducer, * as selectors from './index';
import * as t from '@/actions/types';

describe('reducers/popup', () => {
  const initialState = {
    displayImagePopup: false,
  };

  it('should return the initial state', () => {
    const state = reducer();

    expect(state).toEqual(initialState);
  });

  it('should return the new state when SET_IMAGE_POPUP is dispatched', () => {
    const action = { type: t.SET_IMAGE_POPUP, payload: true };
    const state = reducer(initialState, action);

    expect(state).toHaveProperty('displayImagePopup', true);
  });
});

describe('selectors/popup', () => {
  const mockState = { popup: { displayImagePopup: true }};

  describe('getDisplayImagePopup', () => {
    it('should return the correct value from state', () => {
      const value = selectors.getDisplayImagePopup(mockState);

      expect(value).toBe(true);
    });
  });
});
