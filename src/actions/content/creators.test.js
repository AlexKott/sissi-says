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
});
