import middleware from './pageBuilder';

import * as t from '@/actions/types';
import * as actions from '@/actions/creators';

describe('middleware/pageBuilder', () => {
  let mockAction, mockNext, mockGetState, mockDispatch, mockStore, mockSelectors;

  beforeEach(() => {
    mockGetState = jest.fn();
    mockDispatch = jest.fn();
    mockStore = {
      getState: mockGetState,
      dispatch: mockDispatch,
    };
    mockNext = jest.fn();
    mockSelectors = {
      getPageFieldNames: jest.fn(() => ['mockField1', 'mockField2']),
      getProtectedSectionsForPage: jest.fn(() => []),
      getMinSectionsPerPage: jest.fn(() => 0),
      getNumberOfSectionsForPage: jest.fn(() => 1),
    };
    mockAction = { type: t.ADD_PAGE, payload: { type: null }};
  });

  it('should forward the action if the type is not ADD_PAGE', () => {
    mockAction = { type: 'TEST_ACTION' };

    middleware({})(mockNext)(mockAction);

    expect(mockNext).toBeCalledWith(mockAction);
  });

  it('should forward the action with new page data if the type is ADD_PAGE', () => {
    middleware(mockStore, mockSelectors)(mockNext)(mockAction);

    expect(mockNext.mock.calls).toHaveLength(1);
    expect(mockNext.mock.calls[0][0]).toHaveProperty('type', t.ADD_PAGE);
    expect(mockNext.mock.calls[0][0]).toHaveProperty('payload');
    expect(mockNext.mock.calls[0][0].payload).toHaveProperty('page');
    expect(mockNext.mock.calls[0][0].payload.page).toHaveProperty('id');
    expect(mockNext.mock.calls[0][0].payload.page).toHaveProperty('pageType');
    expect(mockNext.mock.calls[0][0].payload.page).toHaveProperty('sections');
    expect(mockNext.mock.calls[0][0].payload.page).toHaveProperty('mockField1');
    expect(mockNext.mock.calls[0][0].payload.page).toHaveProperty('mockField2');
  });

  it('should dispatch addSection with the right type for each protected section', () => {
    mockSelectors.getProtectedSectionsForPage = jest.fn(() => ['section1', 'section2']);

    middleware(mockStore, mockSelectors)(mockNext)(mockAction);

    expect(mockDispatch.mock.calls).toHaveLength(2);
    expect(mockDispatch.mock.calls[0][0].payload).toHaveProperty('pageId');
    expect(mockDispatch.mock.calls[0][0].payload).toHaveProperty('type', 'section1');
    expect(mockDispatch.mock.calls[1][0].payload).toHaveProperty('pageId');
    expect(mockDispatch.mock.calls[1][0].payload).toHaveProperty('type', 'section2');
  });

  it('should dispatch addSection until the minimum of sections is created', () => {
    mockSelectors.getMinSectionsPerPage = jest.fn(() => 2);
    mockSelectors.getNumberOfSectionsForPage
      .mockReturnValueOnce(0)
      .mockReturnValueOnce(1)
      .mockReturnValueOnce(2);

    middleware(mockStore, mockSelectors)(mockNext)(mockAction);

    expect(mockDispatch.mock.calls).toHaveLength(2);
    expect(mockDispatch.mock.calls[0][0].payload).toHaveProperty('pageId');
    expect(mockDispatch.mock.calls[0][0].payload).toHaveProperty('type', undefined);
    expect(mockDispatch.mock.calls[1][0].payload).toHaveProperty('pageId');
    expect(mockDispatch.mock.calls[1][0].payload).toHaveProperty('type', undefined);
  });
});
