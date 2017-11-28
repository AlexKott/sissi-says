import reducer from './section';

describe('reducers/section', () => {
    it('should return the initial state', () => {
        const expectedState = {};
        const state = reducer();

        expect(state).toEqual(expectedState);
    });
});
