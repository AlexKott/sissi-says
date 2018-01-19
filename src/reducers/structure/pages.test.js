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
      type: t.FETCH_DATA_SUCCESS,
      payload: {
        type: 'structure',
        data: {
          pages: expectedState,
        },
      },
    };
    const state = reducer(undefined, action);

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
});
