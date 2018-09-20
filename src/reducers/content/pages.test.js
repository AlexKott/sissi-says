import * as t from '@/actions/types';
import _testState from '@/reducers/_testState';

import reducer, * as selectors from './pages';

describe('reducers/content/pages', () => {
  const mockState = _testState.content.pages;

  it('should apply the fetched data', () => {
    const action = {
      type: t.FETCH_DATA_SUCCESS,
      payload: {
        dataType: 'content',
        data: {
          pages: {
            page1: {},
            page2: {},
          },
        },
      },
    };
    const state = reducer(mockState, action);

    expect(state).toEqual({ page1: {}, page2: {} });
  });

  it('should add a page', () => {
    const action = {
      type: t.ADD_PAGE,
      payload: { page: { _id: 'testPage' }},
    };
    const state = reducer(mockState, action);

    expect(state).toHaveProperty('testPage');
  });

  it('should delete a page', () => {
    const action = {
      type: t.DELETE_PAGE,
      payload: { pageId: 'abc123' },
    };
    const state = reducer(mockState, action);

    expect(state).not.toHaveProperty('abc123');
  });

  it('should add a section to a page', () => {
    const action = {
      type: t.ADD_SECTION,
      payload: { pageId: 'abc123', sectionId: 'testSection' },
    };
    const state = reducer(mockState, action);

    expect(state.abc123._items).toContain('testSection');
  });

  it('should delete a section from a page', () => {
    const action = {
      type: t.DELETE_SECTION,
      payload: { pageId: 'abc123', sectionId: '123abc' },
    };
    const state = reducer(mockState, action);

    expect(state.abc123._items).not.toContain('123abc');
  });

  it('should move a section', () => {
    const action = {
      type: t.DRAG_SECTION,
      payload: { pageId: 'abc123', from: 0, to: 1 },
    };
    const state = reducer(mockState, action);

    expect(state.abc123._items).toEqual(['123abc', '345def']);
  });

  it('should reset the state', () => {
    const action = {
      type: t.RESET_SESSION,
    };
    const state = reducer(mockState, action);

    expect(state).toEqual({});
  });
});

describe('selectors/content/pages', () => {
  const mockState = _testState;

  describe('getPageById', () => {
    it('should return a page given its pageId', () => {
      const value = selectors.getPageById('abc123')(mockState);

      expect(value).toHaveProperty('_id', 'abc123');
      expect(value).toHaveProperty('title', 'Welcome');
    });
  });

  describe('getSectionIdsForPage', () => {
    it('should return the section ids for a given pageId', () => {
      const value = selectors.getSectionIdsForPage('abc123')(mockState);

      expect(value).toContain('123abc');
      expect(value).toContain('345def');
    });
  });
});
