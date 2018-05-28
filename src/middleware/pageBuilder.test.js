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
    expect(testedAction.payload.page).toHaveProperty('id');
    expect(testedAction.payload.page).toHaveProperty('pageType');
    expect(testedAction.payload.page).toHaveProperty('sections');
    expect(testedAction.payload.page).toHaveProperty('mockField1');
    expect(testedAction.payload.page).toHaveProperty('mockField2');
  });

  it('should dispatch addSection with the right type for each protected section', () => {
    mockSelectors.getProtectedSectionsForPage = jest.fn(() => ['section1', 'section2']);

    middleware(mockStore, mockSelectors)(mockNext)(mockAction);

    const testedAction = mockDispatch.mock.calls;
    expect(testedAction).toHaveLength(2);
    expect(testedAction[0][0].payload).toHaveProperty('pageId');
    expect(testedAction[0][0].payload).toHaveProperty('sectionType', 'section1');
    expect(testedAction[1][0].payload).toHaveProperty('pageId');
    expect(testedAction[1][0].payload).toHaveProperty('sectionType', 'section2');
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
    expect(testedAction[0][0].payload).toHaveProperty('sectionType', undefined);
    expect(testedAction[1][0].payload).toHaveProperty('pageId');
    expect(testedAction[1][0].payload).toHaveProperty('sectionType', undefined);
  });
});
