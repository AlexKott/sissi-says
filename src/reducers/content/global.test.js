import reducer, * as selectors from './global';
import * as t from '@/actions/types';

describe('reducers/content/global', () => {
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
          global: { globalTitle: 'test', globalDescription: 'alsoTest' },
        },
      },
    };
    const expectedState = { globalTitle: 'test', globalDescription: 'alsoTest' };
    const state = reducer(undefined, action);

    expect(state).toEqual(expectedState);
  });

  it('should reset the state', () => {
    const action = {
      type: t.RESET_SESSION,
    };
    const state = reducer({ globalData: 'test' }, action);

    expect(state).toEqual({});
  });
});

describe('selectors/content&/global', () => {
  describe('getGlobalData', () => {
    it('should return the stored global data', () => {
      const mockState = {
        content: {
          global: { globalTitle: 'test', globalDescription: 'alsoTest' },
        },
      };
      const value = selectors.getGlobalData(mockState);

      expect(value).toEqual({ globalTitle: 'test', globalDescription: 'alsoTest' });
    });
  });
});
