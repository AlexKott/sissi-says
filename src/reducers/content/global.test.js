import * as t from '@/actions/types';
import _testState from '@/reducers/_testState';

import reducer, * as selectors from './global';

describe('reducers/content/global', () => {
  const mockState = _testState.content.global;

  it('should apply the fetched data', () => {
    const action = {
      type: t.FETCH_DATA_SUCCESS,
      payload: {
        dataType: 'content',
        data: {
          global: { metaTitle: 'test' },
        },
      },
    };
    const state = reducer(mockState, action);

    expect(state).toEqual({ metaTitle: 'test' });
  });

  it('should add a page', () => {
    const action = {
      type: t.ADD_PAGE,
      payload: { page: { _id: 'newPage' }},
    };
    const state = reducer(mockState, action);

    expect(state._items).toContain('newPage');
  });

  it('should delete a page', () => {
    const action = {
      type: t.DELETE_PAGE,
      payload: { pageId: 'abc123' },
    };
    const state = reducer(mockState, action);

    expect(state._items).not.toContain('abc123');
  });

  it('should move a page', () => {
    const action = {
      type: t.DRAG_PAGE,
      payload: { from: 1, to: 0 },
    };
    const state = reducer(mockState, action);

    expect(state._items).toEqual(['def345', 'abc123']);
  });

  it('should reset the state', () => {
    const action = {
      type: t.RESET_SESSION,
    };
    const state = reducer(mockState, action);

    expect(state).toEqual({});
  });
});

describe('selectors/content/global', () => {
  const mockState = _testState;

  describe('getContentGlobal', () => {
    it('should return the correct value', () => {
      const value = selectors.getContentGlobal(mockState);

      expect(value).toEqual(mockState.content.global);
    });
  });

  describe('getAllPageIds', () => {
    it('should return the correct value', () => {
      const value = selectors.getAllPageIds(mockState);

      expect(value).toEqual(['abc123', 'def345']);
    });
  });

  describe('getAmountOfPages', () => {
    it('should return the correct value', () => {
      const value = selectors.getAmountOfPages(mockState);

      expect(value).toBe(2);
    });
  });
});
