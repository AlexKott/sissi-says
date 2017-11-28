import reducer from './fields';

describe('reducers/fields', () => {
    it('should return the initial state', () => {
        const expectedState = {};
        const state = reducer();

        expect(state).toEqual(expectedState);
    });
});
