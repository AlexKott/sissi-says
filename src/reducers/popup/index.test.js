import reducer, * as selectors from './index';
import * as t from '@/actions/types';

describe('reducers/popup', () => {
  const initialState = {
    guide: false,
  };

  it('should return the initial state', () => {
    const state = reducer();

    expect(state).toEqual(initialState);
  });

  it('should return the new state when TOGGLE_POPUP is dispatched', () => {
    const action = { type: t.TOGGLE_POPUP, payload: { type: 'guide', isVisible: true }};
    const state = reducer(initialState, action);

    expect(state).toHaveProperty('guide', true);
  });
});

describe('selectors/popup', () => {
  const mockState = { popup: { guide: false }};

  describe('getDisplayGuidePopup', () => {
    it('should return the correct value from state', () => {
      const value = selectors.getDisplayGuidePopup(mockState);

      expect(value).toBe(false);
    });
  });
});
