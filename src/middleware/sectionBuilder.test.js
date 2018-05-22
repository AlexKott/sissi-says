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
      getSectionFields: jest.fn(() => [{'field1': { type: 'standard' }}, {'field2': { type: 'standard' }}]),
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

  it('should add the minimum list items for each field of type "list"', () => {
    mockSelectors.getSectionFields = jest.fn(() => [{
      'listField1': {
        type: 'list',
        minItems: 3,
        fields: ['fieldA', 'fieldB']
      },
    }]);

    middleware(mockStore, mockSelectors)(mockNext)(mockAction);

    const testedAction = mockNext.mock.calls[0][0];
    expect(mockNext.mock.calls).toHaveLength(1);
    expect(testedAction).toHaveProperty('type', t.ADD_SECTION);
    expect(testedAction).toHaveProperty('payload');
    expect(testedAction.payload).toHaveProperty('sectionId');
    expect(testedAction.payload).toHaveProperty('section');
    expect(testedAction.payload.section).toHaveProperty('sectionType', 'testType');
    expect(testedAction.payload.section).toHaveProperty('listField1');
    expect(testedAction.payload.section.listField1).toEqual([
      { 'fieldA': '', 'fieldB': '' },
      { 'fieldA': '', 'fieldB': '' },
      { 'fieldA': '', 'fieldB': '' },
    ]);
  });
});
