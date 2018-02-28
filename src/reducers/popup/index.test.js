import reducer, * as selectors from './index';
import * as t from '@/actions/types';

describe('reducers/popup', () => {
  const initialState = {
    image: false,
    guide: false,
  };

  it('should return the initial state', () => {
    const state = reducer();

    expect(state).toEqual(initialState);
  });

  it('should return the new state when SET_POPUP is dispatched', () => {
    const action = { type: t.SET_POPUP, payload: { type: 'image', shouldDisplay: true }};
    const state = reducer(initialState, action);

    expect(state).toHaveProperty('image', true);
  });
});

describe('selectors/popup', () => {
  const mockState = { popup: { image: true, guide: false }};

  describe('getDisplayImagePopup', () => {
    it('should return the correct value from state', () => {
      const value = selectors.getDisplayImagePopup(mockState);

      expect(value).toBe(true);
    });
  });

  describe('getDisplayGuidePopup', () => {
    it('should return the correct value from state', () => {
      const value = selectors.getDisplayGuidePopup(mockState);

      expect(value).toBe(false);
    });
  });
});
