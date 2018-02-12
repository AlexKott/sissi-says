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
});
