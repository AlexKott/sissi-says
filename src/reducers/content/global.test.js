import reducer, * as selectors from './global';
import * as t from '@/actions/types';

describe('reducers/content/global', () => {
  let mockState;

  beforeEach(() => {
    mockState = {
      metaTitle: 'test',
      metaDescription: 'also test',
      _items: ['page1', 'page2'],
    };
  });

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
          global: { metaTitle: 'test', metaDescription: 'alsoTest' },
        },
      },
    };
    const expectedState = { metaTitle: 'test', metaDescription: 'alsoTest' };
    const state = reducer(undefined, action);

    expect(state).toEqual(expectedState);
  });

  it('should add a page', () => {
    const action = {
      type: t.ADD_PAGE,
      payload: { page: { _id: 'newPage', testField: 'hi' }},
    };

    const state = reducer(mockState, action);

    expect(state._items).toContain('newPage');
  });

  it('should delete a page', () => {
    const action = {
      type: t.DELETE_PAGE,
      payload: { pageId: 'page1' },
    };

    const state = reducer(mockState, action);

    expect(state._items).not.toContain('page1');
  });

  it('should move a page', () => {
    const action = {
      type: t.DRAG_PAGE,
      payload: { from: 0, to: 1 },
    };
    const state = reducer(mockState, action);

    expect(state._items[0]).toEqual('page2');
    expect(state._items[1]).toEqual('page1');
  });

  it('should reset the state', () => {
    const action = {
      type: t.RESET_SESSION,
    };
    const state = reducer({ globalData: 'test' }, action);

    expect(state).toEqual({});
  });
});

describe('selectors/content/global', () => {
  let mockState;

  beforeEach(() => {
    mockState = {
      content: {
        global: {
          maxItems: 4,
          minItems: 2,
          _items: ['page1', 'page2'],
          testField: 'this is a field',
        },
      },
    };
  });

  describe('getGlobalContent', () => {
    it('should return the correct value from the state', () => {
      const value = selectors.getGlobalContent(mockState);

      expect(value).toEqual(mockState.content.global);
    });
  });

  describe('getMaxAmountOfPages', () => {
    it('should return the correct value from the state', () => {
      const value = selectors.getMaxAmountOfPages(mockState);

      expect(value).toBe(4);
    });
  });

  describe('getMinAmountOfPages', () => {
    it('should return the correct value from the state', () => {
      const value = selectors.getMinAmountOfPages(mockState);

      expect(value).toBe(2);
    });
  });

  describe('getAllPageIds', () => {
    it('should return the correct value from the state', () => {
      const value = selectors.getAllPageIds(mockState);

      expect(value).toEqual(['page1', 'page2']);
    });
  });
});
