import reducer, * as selectors from './meta';

describe('reducers/structure/meta', () => {
  it('should return the initial state', () => {
    const expectedState = {};
    const state = reducer();

    expect(state).toEqual(expectedState);
  });
});

describe('selectors/structure/meta', () => {
  describe('getMetaFields', () => {
    it('should return the meta fields', () => {
      const mockState = { structure: { meta: { fields: ['field1', 'field2'] }}};
      const value = selectors.getMetaFields(mockState);

      expect(value).toEqual(['field1', 'field2']);
    });
  });
});
