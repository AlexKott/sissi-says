import reducer, * as selectors from './index';
import * as t from '@/actions/types';

describe('reducers/settings', () => {
  it('should return the initial state', () => {
    const expectedState = {};
    const state = reducer();

    expect(state).toEqual(expectedState);
  });

  it('should return the fetched state', () => {
    const expectedState = { test1: 'test1', test2: 'test2' };
    const action = {
      type: t.FETCH_DATA_SUCCESS,
      payload: {
        dataType: 'structure',
        data: {
          settings: expectedState,
        },
      },
    };
    const state = reducer(undefined, action);

    expect(state).toEqual(expectedState);
  });

  it('should reset the state', () => {
    const action = {
      type: t.RESET_SESSION,
    };
    const state = reducer({ testData: 'test' }, action);

    expect(state).toEqual({});
  });
});

describe('selectors/settings', () => {
  describe('getLanguage', () => {
    it('should return the correct value from the state', () => {
      const mockState = { settings: { language: 'se' } };
      const value = selectors.getLanguage(mockState);

      expect(value).toBe('se');
    });
  });
});
