import reducer from './settings';

describe('reducers/settings', () => {
    it('should return the initial state', () => {
        const expectedState = {};
        const state = reducer();

        expect(state).toEqual(expectedState);
    })
})
