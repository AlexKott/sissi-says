import reducer, * as selectors from './pages';
import * as t from '@/actions/types';

describe('reducers/content/pages', () => {
  it('should return the initial state', () => {
    const expectedState = [];
    const state = reducer();

    expect(state).toEqual(expectedState);
  });

  it('should add a page', () => {
    const action = { type: t.ADD_PAGE, payload: { page: 'testPage' }};
    const state = reducer(undefined, action);

    expect(state).toEqual(['testPage']);
  });

  it('should add a section to a page', () => {
    const mockState = [{ id: 'testPage', sections: ['section1', 'section2'] }];
    const action = { type: t.ADD_SECTION, payload: { pageId: 'testPage', sectionId: 'testSection' }};
    const state = reducer(mockState, action);

    expect(state).toEqual([{ id: 'testPage', sections: ['section1', 'section2', 'testSection'] }]);
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
          pages: [{ id: 'page1', sections: [1, 2] }, { id: 'page2', sections: [3, 4] }],
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
      expect(value).toEqual([{ id: 'section1', content: 'test' }, { id: 'section2', content: 'test2' }])
    });
  });
});
