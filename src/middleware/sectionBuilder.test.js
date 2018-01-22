import middleware from './sectionBuilder';

import * as t from '@/actions/types';

describe('middleware/sectionBuilder', () => {
  let mockAction, mockNext, mockGetState, mockDispatch, mockStore, mockSelectors;

  beforeEach(() => {
    mockNext = jest.fn();
    mockGetState = jest.fn();
    mockDispatch = jest.fn();
    mockStore = {
      getState: mockGetState,
      dispatch: mockDispatch,
    };
    mockSelectors = {
      getSectionFieldNames: jest.fn(() => ['field1', 'field2']),
    };
    mockAction = { type: t.ADD_SECTION, payload: { pageId: 'mockPage', sectionType: 'testType' }};
  });

  it('should forward the action if the type is not ADD_SECTION', () => {
    mockAction = { type: 'TEST_ACTION' };

    middleware({})(mockNext)(mockAction);

    expect(mockNext).toBeCalledWith(mockAction);
  });

  it('should forward the action with new section data if the type is ADD_SECTION', () => {
    middleware(mockStore, mockSelectors)(mockNext)(mockAction);

    const testedAction = mockNext.mock.calls[0][0];
    expect(mockNext.mock.calls).toHaveLength(1);
    expect(testedAction).toHaveProperty('type', t.ADD_SECTION);
    expect(testedAction).toHaveProperty('payload');
    expect(testedAction.payload).toHaveProperty('sectionId');
    expect(testedAction.payload).toHaveProperty('section');
    expect(testedAction.payload.section).toHaveProperty('sectionType', 'testType');
    expect(testedAction.payload.section).toHaveProperty('field1', '');
    expect(testedAction.payload.section).toHaveProperty('field2', '');
  });
});
