import reducer, * as selectors from './index';
import * as t from '@/actions/types';

describe('reducers/login', () => {
  it('should return the initial state', () => {
    const expectedState = { isInitialDataFetched: false, token: '' };
    const state = reducer();

    expect(state).toEqual(expectedState);
  });

  it('should set isInitialDataFetched to true when the initial data is fetched', () => {
    const action = { type: t.FETCH_DATA_SUCCESS };
    const expectedState = { isInitialDataFetched: true, token: '' };
    const state = reducer(undefined, action);

    expect(state).toEqual(expectedState);
  });

  it('should set the token when login is successful', () => {
    const action = { type: t.LOGIN_SUCCESS, payload: '42token24' };
    const expectedState = { isInitialDataFetched: false, token: '42token24' };
    const state = reducer(undefined, action);

    expect(state).toEqual(expectedState);
  });
});

describe('selectors/login', () => {
  describe('getIsInitialDataFetched', () => {
    it('should return the correct value from the reducer', () => {
      const mockState = { login: { isInitialDataFetched: true }};
      const value = selectors.getIsInitialDataFetched(mockState);

      expect(value).toBe(true);
    });
  });
});
