import reducer, * as selectors from './meta';
import * as t from '@/actions/types';

describe('reducers/content/meta', () => {
  it('should return the initial state', () => {
    const expectedState = {};
    const state = reducer();

    expect(state).toEqual(expectedState);
  });

  it('should set the given content', () => {
    const action = {
      type: t.FETCH_DATA_SUCCESS,
      payload: {
        dataType: 'content',
        data: {
          meta: { metaTitle: 'test', metaDescription: 'alsoTest' },
        },
      },
    };
    const expectedState = { metaTitle: 'test', metaDescription: 'alsoTest' };
    const state = reducer(undefined, action);

    expect(state).toEqual(expectedState);
  });

  it('should reset the state', () => {
    const action = {
      type: t.RESET_SESSION,
    };
    const state = reducer({ metaData: 'test' }, action);

    expect(state).toEqual({});
  });
});

describe('selectors/content&/meta', () => {
  describe('getMetaData', () => {
    it('should return the stored meta data', () => {
      const mockState = {
        content: {
          meta: { metaTitle: 'test', metaDescription: 'alsoTest' },
        },
      };
      const value = selectors.getMetaData(mockState);

      expect(value).toEqual({ metaTitle: 'test', metaDescription: 'alsoTest' });
    });
  });
});
