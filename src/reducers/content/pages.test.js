import reducer, * as selectors from './pages';
import * as t from '@/actions/types';

describe('reducers/content/pages', () => {
  it('should return the initial state', () => {
    const expectedState = [];
    const state = reducer();

    expect(state).toEqual(expectedState);
  });

  it('should return the fetched pages', () => {
    const action = {
      type: t.FETCH_DATA_SUCCESS,
      payload: { dataType: 'content', data: { pages: ['page1', 'page2']}},
    }
    const expectedState = ['page1', 'page2'];
    const state = reducer(undefined, action);

    expect(state).toEqual(expectedState);
  });

  it('should add a page', () => {
    const action = {
      type: t.ADD_PAGE,
      payload: { page: 'testPage' },
    };
    const state = reducer(undefined, action);

    expect(state).toEqual(['testPage']);
  });

  it('should delete a page', () => {
    const mockState = [
      { id: 'testPage1', sections: ['section1', 'section2'] },
      { id: 'testPage2', sections: ['section1', 'section2'] },
    ];
    const action = {
      type: t.DELETE_PAGE,
      payload: { pageId: 'testPage2' },
    };
    const expectedState = [{ id: 'testPage1', sections: ['section1', 'section2'] }];
    const state = reducer(mockState, action);

    expect(state).toEqual(expectedState);
  });

  it('should add a section to a page', () => {
    const mockState = [{ id: 'testPage', sections: ['section1', 'section2'] }];
    const action = {
      type: t.ADD_SECTION,
      payload: { pageId: 'testPage', sectionId: 'testSection' },
    };
    const state = reducer(mockState, action);

    expect(state).toEqual([{
      id: 'testPage',
      sections: ['section1', 'section2', 'testSection'],
    }]);
  });

  it('should delete a section from a page', () => {
    const mockState = [{ id: 'testPage', sections: ['section1', 'section2'] }];
    const action = {
      type: t.DELETE_SECTION,
      payload: { pageId: 'testPage', sectionId: 'section1' },
    };
    const state = reducer(mockState, action);

    expect(state).toEqual([{
      id: 'testPage',
      sections: ['section2'],
    }]);
  });
});

describe('selectors/content/pages', () => {
  describe('getAllPages', () => {
    it('should return an array of pages', () => {
      const mockState = {
        content: {
          pages: ['page1', 'page2', 'page3'],
        },
      };
      const value = selectors.getAllPages(mockState);

      expect(value).toEqual(['page1', 'page2', 'page3']);
    });
  });

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
});
