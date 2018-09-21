import * as t from '@/actions/types';

import * as actions from './creators';

describe('actions/ui', () => {
  describe('clearAlerts', () => {
    it('should dispatch an action with the correct type', () => {
      const action = actions.clearAlerts();

      expect(action).toHaveProperty('type', t.CLEAR_ALERTS);
    });
  });

  describe('setAlert', () => {
    it('should dispatch an action with the correct type and payload', () => {
      const action = actions.setAlert('Test alert message.', 'info');

      expect(action).toHaveProperty('type', t.SET_ALERT);
      expect(action.payload).toHaveProperty('message', 'Test alert message.');
      expect(action.payload).toHaveProperty('level', 'info');
    });
  });

  describe('activateLoading', () => {
    it('should dispatch an action with the correct type and payload', () => {
      const action = actions.activateLoading();

      expect(action).toHaveProperty('type', t.SET_LOADING);
      expect(action).toHaveProperty('payload', { diff: 1 });
    });
  });

  describe('deactivateLoading', () => {
    it('should dispatch an action with the correct type and payload', () => {
      const action = actions.deactivateLoading();

      expect(action).toHaveProperty('type', t.SET_LOADING);
      expect(action).toHaveProperty('payload', { diff: -1 });
    });
  });

  describe('togglePopup', () => {
    it('should dispatch an action with the correct type and payload', () => {
      const action = actions.togglePopup('image', true);

      expect(action).toHaveProperty('type', t.TOGGLE_POPUP);
      expect(action.payload).toHaveProperty('type', 'image');
      expect(action.payload).toHaveProperty('isVisible', true);
    });
  });
});
