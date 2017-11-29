import reducer, * as selectors from './page';

describe('reducers/page', () => {
    it('should return the initial state', () => {
        const expectedState = {};
        const state = reducer();

        expect(state).toEqual(expectedState);
    });

    describe('getProtectedPages', () => {
        it('should return all protected page types', () => {
            const mockState = {
                structure: {
                    page: {
                        testPageOne: { isProtected: true },
                        testPageTwo: { isProtected: false },
                        testPageThree: { isProtected: true },
                    },
                },
            };

            const value = selectors.getProtectedPages(mockState);
            expect(value).toEqual(['testPageOne', 'testPageThree']);
        });
    });
});
