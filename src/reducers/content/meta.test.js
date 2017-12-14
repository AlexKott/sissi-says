import reducer from './meta';
import * as t from '@/actions/types';

describe('reducers/content/meta', () => {
  it('should return the initial state', () => {
    const expectedState = [];
    const state = reducer();

    expect(state).toEqual(expectedState);
  });

  it('should set the given initial content', () => {
    const action = {
      type: t.SET_INITIAL_CONTENT,
      payload: { meta: ['testContent1', 'testContent2'] },
    };
    const expectedState = ['testContent1', 'testContent2'];
    const state = reducer(undefined, action);

    expect(state).toEqual(expectedState);
  });
});
