import reducer, * as selectors from './pages';
import * as t from '@/actions/types';

const pagesState = {
  testPage1: {
    _id: 'testPage1',
    _items: ['section1', 'section2'],
  },
  testPage2: {
    _id: 'testPage2',
    _items: ['section1', 'section2'],
  },
};

describe('reducers/content/pages', () => {
  it('should return the initial state', () => {
    const expectedState = {};
    const state = reducer();

    expect(state).toEqual(expectedState);
  });

  it('should return the fetched pages', () => {
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
    const expectedState = { page1: {}, page2: {} };
    const state = reducer(undefined, action);

    expect(state).toEqual(expectedState);
  });

  it('should add a page', () => {
    const action = {
      type: t.ADD_PAGE,
      payload: { page: { _id: 'testPage', testField: 'hi' }},
    };
    const state = reducer(undefined, action);

    expect(state).toEqual({ testPage: { _id: 'testPage', testField: 'hi' }});
  });

  it('should delete a page', () => {
    const action = {
      type: t.DELETE_PAGE,
      payload: { pageId: 'testPage2' },
    };
    const expectedState = { testPage1: { _id: 'testPage1', _items: ['section1', 'section2'] }};
    const state = reducer(mockState, action);

    expect(state).toEqual(expectedState);
  });

  it('should add a section to a page', () => {
    const action = {
      type: t.ADD_SECTION,
      payload: { pageId: 'testPage2', sectionId: 'testSection' },
    };
    const state = reducer(mockState, action);

    expect(state.testPage2._items).toContain('testSection');
  });

  it('should delete a section from a page', () => {
    const action = {
      type: t.DELETE_SECTION,
      payload: { pageId: 'testPage1', sectionId: 'section1' },
    };
    const state = reducer(mockState, action);

    expect(state.testPage1._items).not.toContain('section1');
  });

  it('should move a section', () => {
    const action = {
      type: t.DRAG_SECTION,
      payload: { pageId: 'testPage2', from: 0, to: 1 },
    };
    const state = reducer(mockState, action);

    expect(state.testPage2._items).toEqual(['section2', 'section1']);
  });

  it('should reset the state', () => {
    const action = {
      type: t.RESET_SESSION,
    };
    const state = reducer({ page1: {}, page2: {}}, action);

    expect(state).toEqual({});
  });
});

describe('selectors/content/pages', () => {

  describe('getPageById', () => {
    it('should return a page given its pageId', () => {
      const mockState = {
        content: {
          pages: [
            { id: 'page1', sections: [1, 2] },
            { id: 'page2', sections: [3, 4] },
          ],
        },
      };
      const value = selectors.getPageById(mockState, 'page1');

      expect(value).toEqual({ id: 'page1', sections: [1, 2] });
    });
  });

  describe('getNumberOfPages', () => {
    it('should return the number of pages', () => {
      const mockState = {
        content: {
          pages: [
            { id: 'page1' },
            { id: 'page2' },
            { id: 'page3' },
          ],
        },
      };
      const value = selectors.getNumberOfPages(mockState);

      expect(value).toBe(3);
    });
  });

  describe('getNumberOfSectionsForPage', () => {
    it('should return the number of sections for a given pageId', () => {
      const mockState = {
        content: {
          pages: [{ id: 'testPage', sections: [1, 2, 3] }],
        },
      };
      const value = selectors.getNumberOfSectionsForPage(mockState, 'testPage');

      expect(value).toBe(3);
    });
  });

  describe('getSectionIdsForPage', () => {
    it('should return the section ids for a given pageId', () => {
      const mockState = {
        content: {
          pages: [{ id: 'testPage', sections: ['ab', 'bc', 'cd'] }],
        },
      };
      const value = selectors.getSectionIdsForPage(mockState, 'testPage');

      expect(value).toEqual(['ab', 'bc', 'cd']);
    });
  });

  describe('getSectionsForPage', () => {
    const mockState = {
      content: {
        pages: [{ id: 'page1', sections: ['section1', 'section2'] }],
      },
    };

    const mockGetSectionById = jest.fn((state, id) => {
      if (id === 'section1') {
        return ({ id: 'section1', content: 'test' });
      } else if (id === 'section2') {
        return ({ id: 'section2', content: 'test2' });
      }
    });

    it('should get section data from the section reducer', () => {
      selectors.getSectionsForPage(mockState, 'page1', mockGetSectionById);

      expect(mockGetSectionById.mock.calls).toHaveLength(2);
      expect(mockGetSectionById.mock.calls[0][1]).toBe('section1');
      expect(mockGetSectionById.mock.calls[1][1]).toBe('section2');
    });

    it('should return an array with sections for a given pageId', () => {
      const value = selectors.getSectionsForPage(mockState, 'page1', mockGetSectionById);
      expect(value).toEqual([
        { id: 'section1', content: 'test' },
        { id: 'section2', content: 'test2' },
      ]);
    });
  });

  describe('getInitialPageValues', () => {
    it('should return the filtered data for the specified page', () => {
      const mockState = {
        content: {
          pages: [
            { id: 'test1', pageType: 'test1', sections: [1, 2, 3], otherData: 'test' },
          ],
        },
      };
      const value = selectors.getInitialPageValues(mockState, 'test1');

      expect(value).toEqual({ otherData: 'test' });
    });
  });

  describe('getCanAddPage', () => {
    let mockGetMaxPages = jest.fn();
    const mockState = {
      content: {
        pages: [{ id: 'page1', sections: ['section1', 'section2'] }],
      },
    };

    it('should get the maximum pages from the settings reducer', () => {
      selectors.getCanAddPage(mockState, mockGetMaxPages);

      expect(mockGetMaxPages).toBeCalled();
    });

    it('should return true if the maximum has not been reached', () => {
      mockGetMaxPages = jest.fn(() => 5);
      const value = selectors.getCanAddPage(mockState, mockGetMaxPages);

      expect(value).toBe(true);
    });

    it('should return false if the maximum been reached', () => {
      mockGetMaxPages = jest.fn(() => 1);
      const value = selectors.getCanAddPage(mockState, mockGetMaxPages);

      expect(value).toBe(false);
    });
  });

  describe('getCanDeletePage', () => {
    let mockGetMinPages = jest.fn();
    const mockState = {
      content: {
        pages: [
          { id: 'page1', sections: ['section1', 'section2'] },
          { id: 'page2', sections: ['section1', 'section2'] },
        ],
      },
    };

    it('should get the minimum pages from the settings reducer', () => {
      selectors.getCanDeletePage(mockState, mockGetMinPages);

      expect(mockGetMinPages).toBeCalled();
    });

    it('should return true if the minimum has not been reached', () => {
      mockGetMinPages = jest.fn(() => 1);
      const value = selectors.getCanDeletePage(mockState, mockGetMinPages);

      expect(value).toBe(true);
    });

    it('should return false if the minimum been reached', () => {
      mockGetMinPages = jest.fn(() => 2);
      const value = selectors.getCanDeletePage(mockState, mockGetMinPages);

      expect(value).toBe(false);
    });
  });

  describe('getCanAddSection', () => {
    let mockGetMaxSections = jest.fn();
    const mockState = {
      content: {
        pages: [{ id: 'testPage', sections: ['section1', 'section2'] }],
      },
    };

    it('should get the maximum sections from the settings reducer', () => {
      selectors.getCanAddSection(mockState, 'testPage', mockGetMaxSections);

      expect(mockGetMaxSections).toBeCalled();
    });

    it('should return true if the maximum has not been reached', () => {
      mockGetMaxSections = jest.fn(() => 5);
      const value = selectors.getCanAddSection(mockState, 'testPage', mockGetMaxSections);

      expect(value).toBe(true);
    });

    it('should return false if the maximum been reached', () => {
      mockGetMaxSections = jest.fn(() => 2);
      const value = selectors.getCanAddSection(mockState, 'testPage', mockGetMaxSections);

      expect(value).toBe(false);
    });
  });

  describe('getCanDeleteSection', () => {
    let mockGetMinSections = jest.fn();
    const mockState = {
      content: {
        pages: [{ id: 'testPage', sections: ['section1', 'section2'] }],
      },
    };

    it('should get the minimum sections from the settings reducer', () => {
      selectors.getCanDeleteSection(mockState, 'testPage', mockGetMinSections);

      expect(mockGetMinSections).toBeCalled();
    });

    it('should return true if the minimum has not been reached', () => {
      mockGetMinSections = jest.fn(() => 1);
      const value = selectors.getCanDeleteSection(mockState, 'testPage', mockGetMinSections);

      expect(value).toBe(true);
    });

    it('should return false if the minimum been reached', () => {
      mockGetMinSections = jest.fn(() => 2);
      const value = selectors.getCanDeleteSection(mockState, 'testPage', mockGetMinSections);

      expect(value).toBe(false);
    });
  });

  describe('getSinglePageId', () => {
    it('should return the id of a single page', () => {
      const mockState = {
        content: {
          pages: [
            { id: 'page1' },
          ],
        },
      };
      const value = selectors.getSinglePageId(mockState);

      expect(value).toEqual('page1');
    });
  });
});
