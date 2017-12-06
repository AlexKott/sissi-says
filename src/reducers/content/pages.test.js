import reducer, * as selectors from './pages';

describe('reducers/pages', () => {
  it('should return the initial state', () => {
    const expectedState = {};
    const state = reducer();

    expect(state).toEqual(expectedState);
  });

  describe('getNumberOfPages', () => {
    it('should return the number of pages', () => {
      const mockState = {
        content: {
          pages: {
            page1: '',
            page2: '',
            page3: '',
          },
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
          pages: { testPage: { sections: [1, 2, 3] }},
        },
      };
      const value = selectors.getNumberOfSectionsForPage(mockState, 'testPage');

      expect(value).toBe(3);
    });
  });
});
