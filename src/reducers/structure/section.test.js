import reducer, * as selectors from './section';

describe('reducers/section', () => {
  it('should return the initial state', () => {
    const expectedState = {};
    const state = reducer();

    expect(state).toEqual(expectedState);
  });

  describe('getProtectedSections', () => {
    it('should return an array with all protected sections', () => {
      const mockState = {
        structure: {
          section: {
            test1: { isProtected: true },
            test2: { isProtected: false },
            test3: { isProtected: true },
          },
        },
      };
      const value = selectors.getProtectedSections(mockState);

      expect(value).toEqual(['test1', 'test3']);
    });
  });

  describe('getProtectedSectionsForPage', () => {
    const mockState = {
      structure: {
        section: {
          test1: { isProtected: true },
          test2: { isProtected: false },
          test3: { isProtected: true },
        },
      },
    };
    const mockSelectors = {
      getRequiredSections: jest.fn(() => ['test1', 'test2']),
    };

    it('should get the required sections for a given page type', () => {
      const value = selectors.getProtectedSectionsForPage(mockState, 'testPageType', mockSelectors);

      expect(mockSelectors.getRequiredSections.mock.calls).toHaveLength(1);
      expect(mockSelectors.getRequiredSections.mock.calls[0][1]).toBe('testPageType');
    });

    it('should return an array with protected sections for a given page type', () => {
      const value = selectors.getProtectedSectionsForPage(mockState, 'testPageType', mockSelectors);

      expect(value).toEqual(['test1']);
    });
  });

  describe('getSectionFields', () => {
    it('should return the fields for a given section', () => {
      const mockState = {
        structure: {
          section: { test1: { fields: ['field1', 'field2'] }},
        },
      };
      const value = selectors.getSectionFields(mockState, 'test1');

      expect(value).toEqual(['field1', 'field2']);
    });
  });
});
