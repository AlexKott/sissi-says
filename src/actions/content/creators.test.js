import * as t from './types';
import * as actions from './creators';

describe('actions/content', () => {
    describe('setInitialContent', () => {
        it('should dispatch an action with the correct type and payload', () => {
            const expectedAction = { type: t.SET_INITIAL_CONTENT };
            const action = actions.setInitialContent();

            expect(action).toEqual(expectedAction);
        });
    });

    describe('addPage', () => {
        it('should dispatch an action with the correct type and payload', () => {
            const expectedAction = { type: t.ADD_PAGE, payload: { type: 'testType' }};
            const action = actions.addPage('testType');

            expect(action).toEqual(expectedAction);
        });
    });

    describe('addSection', () => {
        it('should dispatch an action with the correct type and payload', () => {
            const expectedAction = { type: t.ADD_SECTION, payload: { page: 'testPage', type: 'testType' }};
            const action = actions.addSection('testPage', 'testType');

            expect(action).toEqual(expectedAction);
        });
    });
});
