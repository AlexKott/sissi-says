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
    mockAction = { type: t.ADD_SECTION, payload: { pageId: 'mockPage', type: 'testType' }};
  });

  it('should forward the action if the type is not ADD_SECTION', () => {
    mockAction = { type: 'TEST_ACTION' };

    middleware({})(mockNext)(mockAction);

    expect(mockNext).toBeCalledWith(mockAction);
  });

  it('should forward the action with new section data if the type is ADD_SECTION', () => {
    middleware(mockStore, mockSelectors)(mockNext)(mockAction);

    expect(mockNext.mock.calls).toHaveLength(1);
    expect(mockNext.mock.calls[0][0]).toHaveProperty('type', t.ADD_SECTION);
    expect(mockNext.mock.calls[0][0]).toHaveProperty('payload');
    expect(mockNext.mock.calls[0][0].payload).toHaveProperty('sectionId');
    expect(mockNext.mock.calls[0][0].payload).toHaveProperty('section');
    expect(mockNext.mock.calls[0][0].payload.section).toHaveProperty('sectionType', 'testType');
    expect(mockNext.mock.calls[0][0].payload.section).toHaveProperty('field1', '');
    expect(mockNext.mock.calls[0][0].payload.section).toHaveProperty('field2', '');
  });
});
