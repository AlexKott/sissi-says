import reducer from './section';

describe('reducers/section', () => {
    describe('types', () => {
        it('should return the initial state', () => {
            const expectedState = [];
            const state = reducer().types;

            expect(state).toEqual(expectedState);
        });
    });
    
    describe('elements', () => {
        it('should return the initial state', () => {
            const expectedState = [];
            const state = reducer().elements;

            expect(state).toEqual(expectedState);
        });
    });
});
