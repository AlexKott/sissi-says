import middleware from './pageBuilder';

import * as t from '@/actions/types';
import * as actions from '@/actions';

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
      getPageFields: jest.fn(() => [
        { 'field1': { type: 'standard' }},
        { 'field2': { type: 'standard' }},
      ]),
      getProtectedSectionsForPage: jest.fn(() => []),
      getMinSectionsPerPage: jest.fn(() => 0),
      getNumberOfSectionsForPage: jest.fn(() => 1),
      getIsSinglePage: jest.fn(() => false),
    };
    mockAction = { type: t.ADD_PAGE, payload: { pageType: null }};
  });

  it('should forward the action if the type is not ADD_PAGE', () => {
    mockAction = { type: 'TEST_ACTION' };

    middleware({})(mockNext)(mockAction);

    expect(mockNext).toBeCalledWith(mockAction);
  });

  it('should forward the action with new page data if the type is ADD_PAGE', () => {
    middleware(mockStore, mockSelectors)(mockNext)(mockAction);

    const testedAction = mockNext.mock.calls[0][0];
    expect(mockNext.mock.calls).toHaveLength(1);
    expect(testedAction).toHaveProperty('type', t.ADD_PAGE);
    expect(testedAction).toHaveProperty('payload');
    expect(testedAction.payload).toHaveProperty('page');
    expect(testedAction.payload.page).toHaveProperty('_id');
    expect(testedAction.payload.page).toHaveProperty('_type');
    expect(testedAction.payload.page).toHaveProperty('_items');
    expect(testedAction.payload.page).toHaveProperty('field1');
    expect(testedAction.payload.page).toHaveProperty('field2');
  });

  it('should dispatch addSection until the minimum of sections is created', () => {
    mockSelectors.getMinSectionsPerPage = jest.fn(() => 2);
    mockSelectors.getNumberOfSectionsForPage
      .mockReturnValueOnce(0)
      .mockReturnValueOnce(1)
      .mockReturnValueOnce(2);

    middleware(mockStore, mockSelectors)(mockNext)(mockAction);

    const testedAction = mockDispatch.mock.calls;
    expect(testedAction).toHaveLength(2);
    expect(testedAction[0][0].payload).toHaveProperty('pageId');
    expect(testedAction[0][0].payload).toHaveProperty('sectionType', 'standard');
    expect(testedAction[1][0].payload).toHaveProperty('pageId');
    expect(testedAction[1][0].payload).toHaveProperty('sectionType', 'standard');
  });
});
