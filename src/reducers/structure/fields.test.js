import reducer, * as selectors from './fields';

describe('reducers/structure/fields', () => {
  it('should return the initial state', () => {
    const expectedState = {};
    const state = reducer();

    expect(state).toEqual(expectedState);
  });
});

describe('selectors/structure/fields', () => {
  describe('getFieldByName', () => {
    it('should return a field, given the field name', () => {
      const mockState = { structure: { fields: { field1: { label: 'testLabel', type: 'test' }}}};
      const value = selectors.getFieldByName(mockState, 'field1');

      expect(value).toEqual({ field1: { label: 'testLabel', type: 'test' }});
    });
  });
});
