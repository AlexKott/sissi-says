import reducer, * as selectors from './index';

describe('reducers/settings', () => {
  it('should return the initial state', () => {
    const expectedState = {};
    const state = reducer();

    expect(state).toEqual(expectedState);
  });
});

describe('selectors/settings', () => {
  describe('getMinPages', () => {
    it('should return the correct value from the state', () => {
      const mockState = { settings: { minPages: 7 } };
      const value = selectors.getMinPages(mockState);

      expect(value).toBe(7);
    });
  });

  describe('getMinSectionsPerPage', () => {
    it('should return the correct value from the state', () => {
      const mockState = { settings: { minSectionsPerPage: 9 } };
      const value = selectors.getMinSectionsPerPage(mockState);

      expect(value).toBe(9);
    });
  });
});
