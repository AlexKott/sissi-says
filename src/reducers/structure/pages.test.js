import reducer, * as selectors from './pages';

describe('reducers/structure/pages', () => {
  it('should return the initial state', () => {
    const expectedState = {};
    const state = reducer();

    expect(state).toEqual(expectedState);
  });
});

describe('selectors/structure/pages', () => {
  describe('getProtectedPages', () => {
    it('should return all protected page types', () => {
      const mockState = {
        structure: {
          pages: {
            testPageOne: { isProtected: true },
            testPageTwo: { isProtected: false },
            testPageThree: { isProtected: true },
          },
        },
      };
      const value = selectors.getProtectedPages(mockState);

      expect(value).toEqual(['testPageOne', 'testPageThree']);
    });
  });

  describe('getPageFields', () => {
    it('should return the fields of the specified page', () => {
      const mockState = {
        structure: {
          pages: {
            testPageOne: { fields: ['a', 'b', 'c']},
            testPageTwo: { fields: [1, 2, 3]},
          },
        },
      };
      const value = selectors.getPageFields(mockState, 'testPageOne');

      expect(value).toEqual(['a', 'b', 'c']);
    });
  });

  describe('getRequiredSections', () => {
    const mockState = {
      structure: {
        pages: {
          testPageOne: { requiredSections: ['a', 'b']},
          testPageTwo: {},
        },
      },
    };

    it('should return all requireds sections for a given page', () => {
      const value = selectors.getRequiredSections(mockState, 'testPageOne');
      expect(value).toEqual(['a', 'b']);
    });

    it('should return an empty array if a page has no required sections', () => {
      const value = selectors.getRequiredSections(mockState, 'testPageTwo');
      expect(value).toEqual([]);
    });
  });
});
