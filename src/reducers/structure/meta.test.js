import reducer, * as selectors from './meta';
import * as t from '@/actions/types';

describe('reducers/structure/meta', () => {
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
          meta: expectedState,
        },
      },
    };
    const state = reducer(undefined, action);

    expect(state).toEqual(expectedState);
  });
});

describe('selectors/structure/meta', () => {
  describe('getMetaFieldNames', () => {
    it('should return the meta fields', () => {
      const mockState = { structure: { meta: { fields: ['field1', 'field2'] }}};
      const value = selectors.getMetaFieldNames(mockState);

      expect(value).toEqual(['field1', 'field2']);
    });
  });

  describe('getMetaFields', () => {
    const mockState = { structure: { meta: { fields: ['field1', 'field2'] }}};
    const mockGetFieldByName = jest.fn((x, name) => {
      if (name === 'field1') {
        return { field1: { label1: 'testLabel' }};
      } else if (name === 'field2') {
        return { field2: { label2: 'testLabel2' }};
      }
    });
    it('should collect values from the right spot', () => {
      selectors.getMetaFields(mockState, mockGetFieldByName);

      expect(mockGetFieldByName.mock.calls).toHaveLength(2);
      expect(mockGetFieldByName.mock.calls[0][1]).toBe('field1');
      expect(mockGetFieldByName.mock.calls[1][1]).toBe('field2');
    });

    it('should return an array with fields', () => {
      const value = selectors.getMetaFields(mockState, mockGetFieldByName);

      expect(value).toEqual([
        { field1: { label1: 'testLabel' }},
        { field2: { label2: 'testLabel2' }},
      ]);
    });
  });
});
