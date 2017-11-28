import reducer from './pages';

describe('reducers/pages', () => {
    it('should return the initial state', () => {
        const expectedState = [];
        const state = reducer();

        expect(state).toEqual(expectedState);
    });
});
