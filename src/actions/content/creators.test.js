import * as t from './types';
import * as actions from './creators';

describe('actions/content', () => {
  describe('addPage', () => {
    it('should dispatch an action with the correct type and payload', () => {
      const action = actions.addPage('testType');

      expect(action).toHaveProperty('type', t.ADD_PAGE);
      expect(action.payload).toHaveProperty('pageType', 'testType');
    });
  });

  describe('addSection', () => {
    it('should dispatch an action with the correct type and payload', () => {
      const action = actions.addSection('testPage', 'testType');

      expect(action).toHaveProperty('type', t.ADD_SECTION);
      expect(action.payload).toHaveProperty('pageId', 'testPage');
      expect(action.payload).toHaveProperty('sectionType', 'testType');
    });
  });

  describe('addListItem', () => {
    it('should dispatch an action with the correct type and payload', () => {
      const action = actions.addListItem('section123', 'listAbc');

      expect(action).toHaveProperty('type', t.ADD_LIST_ITEM);
      expect(action.payload).toHaveProperty('sectionId', 'section123');
      expect(action.payload).toHaveProperty('listName', 'listAbc');
    });
  });

  describe('deletePage', () => {
    it('should return a thunk that dispatches the correct actions', () => {
      const mockDispatch = jest.fn();
      const mockGetState = jest.fn();
      const mockGetSections = jest.fn(() => ['ab', 'bc']);
      const thunk = actions.deletePage('testPage');
      thunk(mockDispatch, mockGetState, mockGetSections);

      expect(mockDispatch.mock.calls).toHaveLength(3);

      // dispatch action to delete first section
      expect(mockDispatch.mock.calls[0][0]).toHaveProperty('type', t.DELETE_SECTION);
      expect(mockDispatch.mock.calls[0][0].payload).toHaveProperty('pageId', 'testPage');
      expect(mockDispatch.mock.calls[0][0].payload).toHaveProperty('sectionId', 'ab');

      // dispatch action to delete second section
      expect(mockDispatch.mock.calls[1][0]).toHaveProperty('type', t.DELETE_SECTION);
      expect(mockDispatch.mock.calls[1][0].payload).toHaveProperty('pageId', 'testPage');
      expect(mockDispatch.mock.calls[1][0].payload).toHaveProperty('sectionId', 'bc');

      // dispatch action to delete page
      expect(mockDispatch.mock.calls[2][0]).toHaveProperty('type', t.DELETE_PAGE);
      expect(mockDispatch.mock.calls[2][0].payload).toHaveProperty('pageId', 'testPage');
    });
  });

  describe('deleteSection', () => {
    it('should dispatch an action with the correct type and payload', () => {
      const action = actions.deleteSection('testPage', 'testSection');

      expect(action).toHaveProperty('type', t.DELETE_SECTION);
      expect(action.payload).toHaveProperty('pageId', 'testPage');
      expect(action.payload).toHaveProperty('sectionId', 'testSection');
    });
  });

  describe('deleteListItem', () => {
    it('should dispatch an action with the correct type and payload', () => {
      const action = actions.deleteListItem('section123', 'listAbc', 4);

      expect(action).toHaveProperty('type', t.DELETE_LIST_ITEM);
      expect(action.payload).toHaveProperty('sectionId', 'section123');
      expect(action.payload).toHaveProperty('listName', 'listAbc');
      expect(action.payload).toHaveProperty('itemIndex', 4);
    });
  });

  describe('dragPage', () => {
    it('should dispatch an action with the correct type and payload', () => {
      const action = actions.dragPage(3, 2);

      expect(action).toHaveProperty('type', t.DRAG_PAGE);
      expect(action.payload).toHaveProperty('from', 3);
      expect(action.payload).toHaveProperty('to', 2);
    });
  });

  describe('dragSection', () => {
    it('should dispatch an action with the correct type and payload', () => {
      const action = actions.dragSection('testPage', 2, 6);

      expect(action).toHaveProperty('type', t.DRAG_SECTION);
      expect(action.payload).toHaveProperty('pageId', 'testPage');
      expect(action.payload).toHaveProperty('from', 2);
      expect(action.payload).toHaveProperty('to', 6);
    });
  });
});
