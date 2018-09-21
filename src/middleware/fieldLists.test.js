import middleware from './fieldLists';

import * as t from '@/actions/types';
import _testState from '@/reducers/_testState';

describe('middleware/fieldLists', () => {
  let mockAction, mockNext, mockDispatch, mockStore;

  beforeEach(() => {
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

  it('should set the default values for a new list item', () => {
    const mockAction = {
      type: t.ADD_LIST_ITEM,
      payload: {
        listName: 'people',
      },
    };
    middleware(mockStore)(mockNext)(mockAction);

    expect(mockAction.payload).toHaveProperty('listItem', { title: '', image: '' });
  });
});
