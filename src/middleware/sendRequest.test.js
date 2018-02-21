import middleware from './sendRequest';

import * as actions from '@/actions/creators';
import * as t from '@/actions/types';
import * as c from '@/constants';

describe('middleware/sendRequest', () => {
  let mockAction, mockClient, mockDispatch, mockGet, mockNext, mockSelectors, mockStore;

  beforeEach(() => {
    mockClient = jest.fn(() => ({
      get: mockGet
    }));
    mockDispatch = jest.fn();
    mockNext = jest.fn();
    mockSelectors = {
      getAuthToken: jest.fn(() => 'testToken'),
    };
    mockStore = {
      dispatch: mockDispatch,
      getState: jest.fn(),
    };
  });

  it('should forward the action if the type is not SEND_REQUEST', () => {
    mockAction = { type: 'TEST_ACTION' };

    middleware({})(mockNext)(mockAction);

    expect(mockNext).toBeCalledWith(mockAction);
  });

  it('should make a request', () => {
    mockAction = {
      type: t.SEND_REQUEST,
      payload: {
        method: 'get',
        dataType: 'test',
      },
    };

    mockGet = jest.fn();

    middleware(mockStore, mockClient, mockSelectors)(mockNext)(mockAction);

    expect(mockClient).toBeCalled();
    expect(mockGet).toBeCalled();
    expect(mockNext).not.toBeCalled();
  });

  it('should dispatch start loading and end loading', async () => {
    mockAction = {
      type: t.SEND_REQUEST,
      payload: {
        method: 'get',
        dataType: 'test',
        successDispatch: []
      },
    };
    mockGet = jest.fn(() => new Promise(resolve => resolve([{}, { ok: true }])));

    await middleware(mockStore, mockClient, mockSelectors)(mockNext)(mockAction);

    expect(mockDispatch.mock.calls).toHaveLength(2);
    expect(mockDispatch.mock.calls[0][0]).toEqual({ type: t.SET_LOADING, payload: true });
    expect(mockDispatch.mock.calls[1][0]).toEqual({ type: t.SET_LOADING, payload: false });
  });

  it('should dispatch the specified actions on success', async () => {
    const successAction = jest.fn(() => ({ type: 'TEST_SUCCESS' }));
    mockAction = {
      type: t.SEND_REQUEST,
      payload: {
        method: 'get',
        dataType: 'test',
        successDispatch: [successAction]
      },
    };

    mockGet = jest.fn(() => new Promise(resolve => resolve([{}, { ok: true }])));

    await middleware(mockStore, mockClient, mockSelectors)(mockNext)(mockAction);

    // call 0 and 2 are start loading and end loading
    expect(mockDispatch.mock.calls).toHaveLength(3);
    expect(mockDispatch.mock.calls[1][0]).toEqual({ type: 'TEST_SUCCESS' });
  });

  it('should dispatch an error when the request fails', async () => {
    const successAction = jest.fn(() => ({ type: 'TEST_SUCCESS' }));
    mockAction = {
      type: t.SEND_REQUEST,
      payload: {
        method: 'get',
        dataType: 'test',
        successDispatch: [successAction]
      },
    };
    const expectedAction = { type: t.SET_ALERT, payload: { message: c.SERVER_ERROR, level: 'error' }};

    mockGet = jest.fn(() => new Promise((resolve, reject) => reject([{}, { ok: false }])));

    await middleware(mockStore, mockClient, mockSelectors)(mockNext)(mockAction);

    // call 0 and 2 are start loading and end loading
    expect(mockDispatch.mock.calls).toHaveLength(3);
    expect(mockDispatch.mock.calls[1][0]).toEqual(expectedAction);
  });
});
