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
});

describe('selectors/settings', () => {
  describe('getMinPages', () => {
    it('should return the correct value from the state', () => {
      const mockState = { settings: { minPages: 7 } };
      const value = selectors.getMinPages(mockState);

      expect(value).toBe(7);
    });
  });

  describe('getMinSectionsPerPage', () => {
    it('should return the correct value from the state', () => {
      const mockState = { settings: { minSectionsPerPage: 9 } };
      const value = selectors.getMinSectionsPerPage(mockState);

      expect(value).toBe(9);
    });
  });
});
