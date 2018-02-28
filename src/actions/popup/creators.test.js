import * as t from './types';
import * as actions from './creators';

describe('actions/popup', () => {
  describe('displayPopup', () => {
    it('should dispatch an action with the correct type and payload', () => {
      const action = actions.displayPopup('image', true);

      expect(action).toHaveProperty('type', t.SET_POPUP);
      expect(action.payload).toHaveProperty('type', 'image');
      expect(action.payload).toHaveProperty('shouldDisplay', true);
    });
  });
});
