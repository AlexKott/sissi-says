import reducer from './page';

describe('reducers/page', () => {
    it('should return the initial state', () => {
        const expectedState = [];
        const state = reducer();

        expect(state).toEqual(expectedState);
    });
});
