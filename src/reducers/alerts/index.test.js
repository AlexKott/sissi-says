import reducer, * as selectors from './index';
import * as t from '@/actions/types';

describe('reducers/alerts', () => {
  let initialState;

  beforeEach(() => {
    initialState = {
      loading: 0,
      error: '',
      message: '',
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

  it('should set the error message when SET_ERROR is dispatched', () => {
    const action = { type: t.SET_ERROR, payload: 'Test error message.' };
    const state = reducer(initialState, action);

    expect(state).toHaveProperty('error', 'Test error message.');
  });

  it('should set the alert message when SET_ALERT is dispatched', () => {
    const action = { type: t.SET_ALERT, payload: 'Test alert message.' };
    const state = reducer(initialState, action);

    expect(state).toHaveProperty('message', 'Test alert message.');
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
        error: 'Test error',
        message: 'Test alert',
      },
    };
  });

  describe('getShouldDisplayModal', () => {
    it('should return false if there is nothing to display', () => {
      mockState = {
        alerts: {
          loading: 0,
          error: '',
          message: '',
        },
      };

      const value = selectors.getShouldDisplayModal(mockState);

      expect(value).toBe(false);
    });

    it('should return false if there is something to display', () => {
      const value = selectors.getShouldDisplayModal(mockState);

      expect(value).toBe(true);
    });
  });

  describe('getErrorMessage', () => {
    it('should return the error message from state', () => {
      const value = selectors.getErrorMessage(mockState);

      expect(value).toBe('Test error');
    });
  });

  describe('getAlertMessage', () => {
    it('should return the alert message from state', () => {
      const value = selectors.getAlertMessage(mockState);

      expect(value).toBe('Test alert');
    });
  });
});
