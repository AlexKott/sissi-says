import * as t from '@/actions/types';
import { ERROR } from '@/constants';
import { ERROR as trERROR } from '@/translations';

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
      const action = actions.setAlert('error', 'Test alert message.');

      expect(action).toHaveProperty('type', t.SET_ALERT);
      expect(action.payload).toHaveProperty('message', 'Test alert message.');
      expect(action.payload).toHaveProperty('type', ERROR);
      expect(action.payload).toHaveProperty('title', trERROR);
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

  describe('setModalType', () => {
    it('should dispatch an action with the correct type and payload', () => {
      const action = actions.setModalType('image');

      expect(action).toHaveProperty('type', t.SET_MODAL_TYPE);
      expect(action.payload).toHaveProperty('type', 'image');
    });
  });

  describe('closeModal', () => {
    it('should dispatch an action with the correct type and payload', () => {
      const action = actions.closeModal();

      expect(action).toHaveProperty('type', t.SET_MODAL_TYPE);
      expect(action.payload).toHaveProperty('type', null);
    });
  });
});
