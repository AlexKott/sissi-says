import reducer, * as selectors from './sections';

describe('reducers/structure/sections', () => {
  it('should return the initial state', () => {
    const expectedState = {};
    const state = reducer();

    expect(state).toEqual(expectedState);
  });
});

describe('selectors/structure/sections', () => {
  describe('getProtectedSections', () => {
    it('should return an array with all protected sections', () => {
      const mockState = {
        structure: {
          sections: {
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
        sections: {
          test1: { isProtected: true },
          test2: { isProtected: false },
          test3: { isProtected: true },
        },
      },
    };
    const mockGetRequiredSections = jest.fn(() => ['test1', 'test2']);

    it('should get the required sections for a given page type', () => {
      const value = selectors.getProtectedSectionsForPage(mockState, 'testPageType', mockGetRequiredSections);

      expect(mockGetRequiredSections.mock.calls).toHaveLength(1);
      expect(mockGetRequiredSections.mock.calls[0][1]).toBe('testPageType');
    });

    it('should return an array with protected sections for a given page type', () => {
      const value = selectors.getProtectedSectionsForPage(mockState, 'testPageType', mockGetRequiredSections);

      expect(value).toEqual(['test1']);
    });
  });

  describe('getSectionFieldNames', () => {
    it('should return the fields for a given section', () => {
      const mockState = {
        structure: {
          sections: { test1: { fields: ['field1', 'field2'] }},
        },
      };
      const value = selectors.getSectionFieldNames(mockState, 'test1');

      expect(value).toEqual(['field1', 'field2']);
    });
  });

  describe('getSectionFields', () => {
    const mockState = { structure: { sections: { testSection: { fields: ['field1', 'field2'] }}}};
    const mockGetFieldByName = jest.fn((x, name) => {
      if (name === 'field1') {
        return { field1: { label1: 'testLabel' }};
      } else if (name === 'field2') {
        return { field2: { label2: 'testLabel2' }};
      }
    });
    it('should collect values from the right spot', () => {
      selectors.getSectionFields(mockState, 'testSection', mockGetFieldByName);

      expect(mockGetFieldByName.mock.calls).toHaveLength(2);
      expect(mockGetFieldByName.mock.calls[0][1]).toBe('field1');
      expect(mockGetFieldByName.mock.calls[1][1]).toBe('field2');
    });

    it('should return an array with fields', () => {
      const value = selectors.getSectionFields(mockState, 'testSection', mockGetFieldByName);

      expect(value).toEqual([{ field1: { label1: 'testLabel' }}, { field2: { label2: 'testLabel2' }}]);
    });
  });
});
