import reducer from './meta';

describe('reducers/meta', () => {
    it('should return the initial state', () => {
        const expectedState = [];
        const state = reducer();

        expect(state).toEqual(expectedState);
    });
});
