import reducer, * as selectors from './index';
import * as t from '@/actions/types';

describe('reducers/images', () => {
  it('should return the initial state', () => {
    const expectedState = [];
    const state = reducer();

    expect(state).toEqual(expectedState);
  });

  it('should set the given images', () => {
    const action = {
      type: t.FETCH_DATA_SUCCESS,
      payload: {
        dataType: 'images',
        data: ['a', 'b', 'c'],
      },
    };
    const expectedState = ['a', 'b', 'c'];
    const state = reducer(undefined, action);

    expect(state).toEqual(expectedState);
  });

  it('should reset the state', () => {
    const action = {
      type: t.RESET_SESSION,
    };
    const state = reducer(['a', 'b', 'c'], action);

    expect(state).toEqual([]);
  });
});

describe('selectors/content&/meta', () => {
  describe('getAllImages', () => {
    it('should return the stored images', () => {
      const mockState = {
        images: ['a', 'b', 'c'],
      };
      const value = selectors.getAllImages(mockState);

      expect(value).toEqual(['a', 'b', 'c']);
    });
  });
});
