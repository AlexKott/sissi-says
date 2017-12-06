import reducer from './sections';

describe('reducers/sections', () => {
  it('should return the initial state', () => {
    const expectedState = {};
    const state = reducer();

    expect(state).toEqual(expectedState);
  });
});
