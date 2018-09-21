import reducer, * as selectors from './index';
import * as t from '@/actions/types';

describe('reducers/login', () => {
  it('should return the initial state', () => {
    const expectedState = { isInitialDataFetched: false, token: null };
    const state = reducer();

    expect(state).toEqual(expectedState);
  });

  it('should set isInitialDataFetched to true when the initial data is fetched', () => {
    const action = { type: t.SEND_REQUEST, payload: { dataType: 'content' }};
    const expectedState = { isInitialDataFetched: true, token: null };
    const state = reducer(undefined, action);

    expect(state).toEqual(expectedState);
  });

  it('should set the token when login is successful', () => {
    const action = { type: t.LOGIN_SUCCESS, payload: '42token24' };
    const expectedState = { isInitialDataFetched: false, token: '42token24' };
    const state = reducer(undefined, action);

    expect(state).toEqual(expectedState);
  });

  it('should reset the state', () => {
    const action = { type: t.RESET_SESSION };
    const expectedState = { isInitialDataFetched: false, token: null };
    const state = reducer({ testData: 'test' }, action);

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

  describe('getAuthToken', () => {
    it('should return the correct value from the reducer', () => {
      const mockState = { login: { token: 'abc123' }};
      const value = selectors.getAuthToken(mockState);

      expect(value).toBe('abc123');
    });
  });
});
