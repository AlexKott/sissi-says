import reducer, * as selectors from './global';
import * as t from '@/actions/types';

describe('reducers/structure/global', () => {
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
          global: expectedState,
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
    const state = reducer({ globalData: 'test' }, action);

    expect(state).toEqual({});
  });
});

describe('selectors/structure/global', () => {
  describe('getGlobalFieldNames', () => {
    it('should return the global fields', () => {
      const mockState = { structure: { global: { fields: ['field1', 'field2'] }}};
      const value = selectors.getGlobalFieldNames(mockState);

      expect(value).toEqual(['field1', 'field2']);
    });
  });

  describe('getGlobalFields', () => {
    const mockState = { structure: { global: { fields: ['field1', 'field2'] }}};
    const mockGetFieldByName = jest.fn((x, name) => {
      if (name === 'field1') {
        return { field1: { label1: 'testLabel' }};
      } else if (name === 'field2') {
        return { field2: { label2: 'testLabel2' }};
      }
    });
    it('should collect values from the right spot', () => {
      selectors.getGlobalFields(mockState, mockGetFieldByName);

      expect(mockGetFieldByName.mock.calls).toHaveLength(2);
      expect(mockGetFieldByName.mock.calls[0][1]).toBe('field1');
      expect(mockGetFieldByName.mock.calls[1][1]).toBe('field2');
    });

    it('should return an array with fields', () => {
      const value = selectors.getGlobalFields(mockState, mockGetFieldByName);

      expect(value).toEqual([
        { field1: { label1: 'testLabel' }},
        { field2: { label2: 'testLabel2' }},
      ]);
    });
  });
});
