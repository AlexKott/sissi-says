import reducer, * as selectors from './index';
import * as t from '@/actions/types';

describe('reducers/alerts', () => {
  let initialState;

  beforeEach(() => {
    initialState = {
      loading: 0,
      message: {
        text: '',
        level: '',
      },
    };
  });

  it('should return the initial state', () => {
    const state = reducer();

    expect(state).toEqual(initialState);
  });

  it('should increment loading when SET_LOADING is true', () => {
    const action = { type: t.SET_LOADING, payload: true };
    const state = reducer(initialState, action);

    expect(state).toHaveProperty('loading', 1);
  });

  it('should decrement loading when SET_LOADING is false', () => {
    const action = { type: t.SET_LOADING, payload: false };
    const state = reducer(initialState, action);

    expect(state).toHaveProperty('loading', -1);
  });

  it('should set the message and level when SET_ALERT is dispatched', () => {
    const action = {
      type: t.SET_ALERT,
      payload: {
        message: 'Test error message.',
        level: 'error',
      }
    };
    const state = reducer(initialState, action);

    expect(state.message).toHaveProperty('text', 'Test error message.');
    expect(state.message).toHaveProperty('level', 'error');
  });

  it('should return the initial state when CLEAR_ALERTS is dispatched', () => {
    const mockState = {
      loading: 3,
      error: 'Test error',
      message: '',
    };
    const action = { type: t.CLEAR_ALERTS };
    const state = reducer(mockState, action);

    expect(state).toEqual(initialState);
  });
});

describe('selectors/alerts', () => {
  let mockState;

  beforeEach(() => {
    mockState = {
      alerts: {
        loading: 3,
        message: {
          text: 'Test alert',
          level: 'success',
        },
      },
    };
  });

  describe('getShouldDisplayModal', () => {
    it('should return false if there is nothing to display', () => {
      mockState = {
        alerts: {
          loading: 0,
          message: {
            text: '',
            level: '',
          },
        },
      };

      const value = selectors.getShouldDisplayModal(mockState);

      expect(value).toBe(false);
    });

    it('should return true if there is something to display', () => {
      const value = selectors.getShouldDisplayModal(mockState);

      expect(value).toBe(true);
    });
  });

  describe('getAlertMessage', () => {
    it('should return the alert message from state', () => {
      const value = selectors.getAlertMessage(mockState);

      expect(value).toEqual({ text: 'Test alert', level: 'success' });
    });
  });
});
