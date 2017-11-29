import reducer, * as selectors from './pages';

describe('reducers/pages', () => {
    it('should return the initial state', () => {
        const expectedState = [];
        const state = reducer();

        expect(state).toEqual(expectedState);
    });

    describe('getNumberOfPages', () => {
        it('should return the number of pages', () => {
            const mockState = {
                content: {
                    pages: [1, 2, 3, 4],
                },
            };
            const value = selectors.getNumberOfPages(mockState);

            expect(value).toBe(4);
        });
    });
});
