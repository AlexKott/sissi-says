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

  describe('setError', () => {
    it('should dispatch an action with the correct type and payload', () => {
      const action = actions.setError('Test error message.');

      expect(action).toHaveProperty('type', t.SET_ERROR);
      expect(action).toHaveProperty('payload', 'Test error message.');
    });
  });

  describe('setAlert', () => {
    it('should dispatch an action with the correct type and payload', () => {
      const action = actions.setAlert('Test alert message.');

      expect(action).toHaveProperty('type', t.SET_ALERT);
      expect(action).toHaveProperty('payload', 'Test alert message.');
    });
  });

  describe('clearAlerts', () => {
    it('should dispatch an action with the correct type', () => {
      const action = actions.clearAlerts();

      expect(action).toHaveProperty('type', t.CLEAR_ALERTS);
    });
  });
});