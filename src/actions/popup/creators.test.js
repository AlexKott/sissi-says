import * as t from './types';
import * as actions from './creators';

describe('actions/popup', () => {
  describe('setImagePopup', () => {
    it('should dispatch an action with the correct type and payload', () => {
      const action = actions.setImagePopup(true);

      expect(action).toHaveProperty('type', t.SET_IMAGE_POPUP);
      expect(action).toHaveProperty('payload', true);
    });
  });
});
