import * as t from './types';
import * as actions from './creators';

describe('actions/alerts', () => {
  describe('setLoading', () => {
    it('should dispatch an action with the correct type and payload', () => {
      const action = actions.setLoading(true);

      expect(action).toHaveProperty('type', t.SET_LOADING);
      expect(action).toHaveProperty('payload', true);
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

  describe('clearAlerts', () => {
    it('should dispatch an action with the correct type', () => {
      const action = actions.clearAlerts();

      expect(action).toHaveProperty('type', t.CLEAR_ALERTS);
    });
  });
});
