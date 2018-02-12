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

  it('should increment loading when START_LOADING is dispatched', () => {
    const action = { type: t.START_LOADING };
    const state = reducer(initialState, action);

    expect(state).toHaveProperty('loading', 1);
  });

  it('should decrement loading when END_LOADING is dispatched', () => {
    const action = { type: t.END_LOADING };
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
