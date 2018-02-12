import reducer, * as selectors from './index';
import * as t from '@/actions/types';

describe('reducers/alerts', () => {
  it('should return the initial state', () => {
    const expectedState = {
      loading: 0,
      error: '',
      message: '',
    };
    const state = reducer();

    expect(state).toEqual(expectedState);
  });
});
