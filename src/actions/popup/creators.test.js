import * as t from './types';
import * as actions from './creators';

describe('actions/popup', () => {
  describe('togglePopup', () => {
    it('should dispatch an action with the correct type and payload', () => {
      const action = actions.togglePopup('image', true);

      expect(action).toHaveProperty('type', t.TOGGLE_POPUP);
      expect(action.payload).toHaveProperty('type', 'image');
      expect(action.payload).toHaveProperty('isVisible', true);
    });
  });
});
