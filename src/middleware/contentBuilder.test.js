import middleware from './contentBuilder';
import * as t from '@/actions/types';
import * as actions from '@/actions/creators';

describe('middleware/contentBuilder', () => {
  let mockAction, mockGetState, mockDispatch, mockStore, mockNext, mockSelectors, expectedAction;

  beforeEach(() => {
    mockGetState = jest.fn();
    mockDispatch = jest.fn();
    mockStore = {
      getState: mockGetState,
      dispatch: mockDispatch,
    };
    mockNext = jest.fn();
    mockSelectors = {
      getMetaFieldNames: jest.fn(() => ['mockField1', 'mockField2']),
      getMinPages: jest.fn(() => 0),
      getProtectedPages: jest.fn(() => []),
      getNumberOfPages: jest.fn(() => 1),
    };
    mockAction = { type: t.SET_INITIAL_CONTENT };
  });

  it('should forward the action if the type is not SET_INITIAL_CONTENT', () => {
    mockAction = { type: 'TEST_ACTION' };

    middleware({})(mockNext)(mockAction);

    expect(mockNext).toBeCalledWith(mockAction);
  });

  it('should forward the action with the initial meta data if the type is SET_INITIAL_CONTENT', () => {
    middleware(mockStore, mockSelectors)(mockNext)(mockAction);

    const testedAction = mockNext.mock.calls[0][0];
    expect(mockNext.mock.calls).toHaveLength(1);
    expect(testedAction).toHaveProperty('type', t.SET_INITIAL_CONTENT);
    expect(testedAction).toHaveProperty('payload');
    expect(testedAction.payload).toHaveProperty('meta');
    expect(testedAction.payload.meta).toHaveProperty('mockField1', '');
    expect(testedAction.payload.meta).toHaveProperty('mockField2', '');
  });

  it('should dispatch addPage with the right type for each protected page', () => {
    mockSelectors.getProtectedPages = jest.fn(() => ['page1', 'page2']);
    const action1 = actions.addPage('page1');
    const action2 = actions.addPage('page2');

    middleware(mockStore, mockSelectors)(mockNext)(mockAction);

    expect(mockDispatch.mock.calls).toHaveLength(2);
    expect(mockDispatch).toBeCalledWith(action1);
    expect(mockDispatch).toBeCalledWith(action2);
  });

  it('should dispatch addPage until the minimum of pages is created', () => {
    mockSelectors.getMinPages = jest.fn(() => 3);
    mockSelectors.getNumberOfPages
      .mockReturnValueOnce(0)
      .mockReturnValueOnce(1)
      .mockReturnValueOnce(2)
      .mockReturnValueOnce(3);

    middleware(mockStore, mockSelectors)(mockNext)(mockAction);

    expect(mockDispatch.mock.calls).toHaveLength(3);
    expect(mockDispatch).toBeCalledWith(actions.addPage());
  });
});
