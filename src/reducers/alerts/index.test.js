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
});
