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
        type: 'structure',
        data: {
          fields: expectedState,
        },
      },
    };
    const state = reducer(undefined, action);

    expect(state).toEqual(expectedState);
  });
});

describe('selectors/structure/fields', () => {
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
});
