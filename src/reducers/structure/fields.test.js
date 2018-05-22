import reducer, * as selectors from './fields';
import * as t from '@/actions/types';

describe('reducers/structure/fields', () => {
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
        dataType: 'structure',
        data: {
          fields: expectedState,
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
    const state = reducer({ fieldsData: 'test' }, action);

    expect(state).toEqual({});
  });
});

describe('selectors/structure/fields', () => {
  describe('getFields', () => {
    it('should return all fields', () => {
      const mockState = {
        structure: {
          fields: {
            field1: {
              label: 'testLabel',
              type: 'test',
            },
            field2: {
              label: 'testLabel',
              type: 'test',
            },
          },
        },
      };
      const expectedValue = {
        field1: {
          label: 'testLabel',
          type: 'test',
        },
        field2: {
          label: 'testLabel',
          type: 'test',
        },
      };
      const value = selectors.getFields(mockState);

      expect(value).toEqual(expectedValue);
    });
  });

  describe('getFieldByName', () => {
    it('should return a field, given the field name', () => {
      const mockState = {
        structure: {
          fields: {
            field1: {
              label: 'testLabel',
              type: 'test',
            },
          },
        },
      };
      const value = selectors.getFieldByName(mockState, 'field1');

      expect(value).toEqual({ field1: { label: 'testLabel', type: 'test' }});
    });
  });

  describe('getListFieldNames', () => {
    it('should return a list of field names for a given listName', () => {
      const mockState = {
        structure: {
          fields: {
            field1: {
              fields: ['abc', 'def'],
            },
          },
        },
      };
      const value = selectors.getListFieldNames(mockState, 'field1');

      expect(value).toEqual(['abc', 'def']);
    });
  });
});
