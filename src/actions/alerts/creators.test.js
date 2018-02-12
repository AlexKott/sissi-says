import * as t from './types';
import * as actions from './creators';

describe('actions/alerts', () => {
  describe('startLoading', () => {
    it('should dispatch an action with the correct type', () => {
      const action = actions.startLoading();

      expect(action).toHaveProperty('type', t.START_LOADING);
    });
  });

  describe('endLoading', () => {
    it('should dispatch an action with the correct type', () => {
      const action = actions.endLoading();

      expect(action).toHaveProperty('type', t.END_LOADING);
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
});
