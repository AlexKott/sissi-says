import middleware from './fieldLists';

import * as t from '@/actions/types';
import _testState from '@/reducers/_testState';

describe('middleware/fieldLists', () => {
  let mockAction, mockNext, mockStore;

  beforeEach(() => {
    mockAction = {
      type: t.ADD_LIST_ITEM,
      payload: {
        listName: 'people',
      },
    };
    mockNext = jest.fn();
    mockStore = {
      getState: jest.fn(() => _testState),
      dispatch: jest.fn(),
    };
  });

  it('should forward the action if the type is not ADD_LIST_ITEM', () => {
    mockAction = { type: 'TEST_ACTION' };

    middleware({})(mockNext)(mockAction);

    expect(mockNext).toBeCalledWith(mockAction);
  });

  it('should add the parentType and parentId to the action', () => {
    middleware(mockStore)(mockNext)(mockAction);

    expect(mockAction.payload).toHaveProperty('parentType', 'pages');
    expect(mockAction.payload).toHaveProperty('parentId', 'abc123');
  });

  it('should set the default values for a new list item', () => {
    middleware(mockStore)(mockNext)(mockAction);

    expect(mockAction.payload).toHaveProperty('listItem', { title: '', image: '' });
  });
});
