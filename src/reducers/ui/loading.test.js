import reducer, * as selectors from './loading';
import * as t from '@/actions/types';

describe('reducers/ui/loading', () => {
  it('should increment loading', () => {
    const action = { type: t.SET_LOADING, payload: 1 };
    const value = reducer(0, action);

    expect(value).toBe(1);
  });

  it('should decrement loading', () => {
    const action = { type: t.SET_LOADING, payload: -1 };
    const value = reducer(4, action);

    expect(value).toBe(3);
  });
});
