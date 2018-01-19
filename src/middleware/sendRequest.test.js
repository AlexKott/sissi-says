import middleware from './sendRequest';

import * as t from '@/actions/types';

describe('middleware/sendRequest', () => {
  let mockAction, mockClient, mockDispatch, mockGet, mockNext, mockStore;

  beforeEach(() => {
    mockClient = jest.fn(() => ({
      get: mockGet
    }));
    mockDispatch = jest.fn()
    mockNext = jest.fn();
    mockStore = {
      dispatch: mockDispatch,
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

    middleware(mockStore, mockClient)(mockNext)(mockAction);

    expect(mockClient).toBeCalled();
    expect(mockGet).toBeCalled();
    expect(mockNext).not.toBeCalled();
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

    await middleware(mockStore, mockClient)(mockNext)(mockAction);

    expect(mockDispatch.mock.calls).toHaveLength(1);
    expect(mockDispatch.mock.calls[0][0]).toEqual({ type: 'TEST_SUCCESS' });
  });

  it('should do nothing when the request fails', async () => { // TODO: update when implementing error handling
    const successAction = jest.fn(() => ({ type: 'TEST_SUCCESS' }));
    mockAction = {
      type: t.SEND_REQUEST,
      payload: {
        method: 'get',
        dataType: 'test',
        successDispatch: [successAction]
      },
    };

    mockGet = jest.fn(() => new Promise((resolve, reject) => reject([{}, { ok: false }])));

    await middleware(mockStore, mockClient)(mockNext)(mockAction);

    expect(mockDispatch).not.toBeCalled();
    expect(mockNext).not.toBeCalled();
  });
});
