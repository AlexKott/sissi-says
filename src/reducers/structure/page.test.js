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

    describe('getPageFields', () => {
        it('should return the fields of the specified page', () => {
            const mockState = {
                structure: {
                    page: {
                        testPageOne: { fields: ['a', 'b', 'c']},
                        testPageTwo: { fields: [1, 2, 3]},
                    },
                },
            };
            const value = selectors.getPageFields(mockState, 'testPageOne');

            expect(value).toEqual(['a', 'b', 'c']);
        });
    });
});
