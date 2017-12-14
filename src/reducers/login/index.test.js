import reducer, * as selectors from './index';
import * as t from '@/actions/types';

describe('reducers/login', () => {
  it('should return the initial state', () => {
    const expectedState = { isContentLoaded: false };
    const state = reducer();

    expect(state).toEqual(expectedState);
  });

  it('should set isContentLoaded to true when the initial content is set', () => {
    const action = { type: t.SET_INITIAL_CONTENT };
    const expectedState = { isContentLoaded: true };
    const state = reducer(undefined, action);

    expect(state).toEqual(expectedState);
  });
});

describe('selectors/login', () => {
  describe('getIsContentLoaded', () => {
    it('should return the correct value from the reducer', () => {
      const mockState = { login: { isContentLoaded: true }};
      const value = selectors.getIsContentLoaded(mockState);

      expect(value).toBe(true);
    });
  });
});
