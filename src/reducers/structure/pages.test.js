import reducer, * as selectors from './pages';
import * as t from '@/actions/types';

describe('reducers/structure/pages', () => {
  it('should return the initial state', () => {
    const expectedState = {};
    const state = reducer();

    expect(state).toEqual(expectedState);
  });

  it('should return the fetched state', () => {
    const expectedState = { test1: 'test1', test2: 'test2' };
    const action = {
      type: t.SEND_REQUEST,
      payload: {
        dataType: 'structure',
        responseData: {
          pages: expectedState,
        },
      },
    };
    const state = reducer(undefined, action);

    expect(state).toEqual(expectedState);
  });

  it('should reset the state', () => {
    const action = {
      type: t.RESET_SESSION,
    };
    const state = reducer({ pagesData: 'test' }, action);

    expect(state).toEqual({});
  });
});

describe('selectors/structure/pages', () => {
  describe('getPageByType', () => {
    it('should return the page structure for the given type', () => {
      const mockState = {
        structure: {
          pages: {
            testPageOne: { test: 'test', isProtected: true },
          },
        },
      };
      const value = selectors.getPageByType(mockState, 'testPageOne');

      expect(value).toEqual({ test: 'test', isProtected: true });
    });
  });

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

  describe('getIsProtectedPage', () => {
    it('should return the correct value for the given page type', () => {
      const mockState = {
        structure: {
          pages: {
            testPageOne: { isProtected: true },
          },
        },
      };
      const value = selectors.getIsProtectedPage(mockState, 'testPageOne');

      expect(value).toBe(true);
    });
  });

  describe('getPageFieldNames', () => {
    it('should return the fields of the specified page', () => {
      const mockState = {
        structure: {
          pages: {
            testPageOne: { fields: ['a', 'b', 'c']},
            testPageTwo: { fields: [1, 2, 3]},
          },
        },
      };
      const value = selectors.getPageFieldNames(mockState, 'testPageOne');

      expect(value).toEqual(['a', 'b', 'c']);
    });
  });

  describe('getPageFields', () => {
    const mockState = {
      structure: {
        pages: {
          testPage: {
            fields: ['field1', 'field2'],
          },
        },
      },
    };
    const mockGetFieldByName = jest.fn((x, name) => {
      if (name === 'field1') {
        return { field1: { label1: 'testLabel' }};
      } else if (name === 'field2') {
        return { field2: { label2: 'testLabel2' }};
      }
    });
    it('should collect values from the right spot', () => {
      selectors.getPageFields(mockState, 'testPage', mockGetFieldByName);

      expect(mockGetFieldByName.mock.calls).toHaveLength(2);
      expect(mockGetFieldByName.mock.calls[0][1]).toBe('field1');
      expect(mockGetFieldByName.mock.calls[1][1]).toBe('field2');
    });

    it('should return an array with fields', () => {
      const value = selectors.getPageFields(mockState, 'testPage', mockGetFieldByName);

      expect(value).toEqual([
        { field1: { label1: 'testLabel' }},
        { field2: { label2: 'testLabel2' }},
      ]);
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

  describe('getIsSinglePage', () => {
    it('should return true if there are no pages', () => {
      const mockState = {
        structure: { pages: {}},
      };
      const value = selectors.getIsSinglePage(mockState);
      expect(value).toBe(true);
    });

    it('should return false if there are pages', () => {
      const mockState = {
        structure: {
          pages: {
            abc: 'abc',
          },
        },
      };
      const value = selectors.getIsSinglePage(mockState);
      expect(value).toBe(false);
    });
  });
});
