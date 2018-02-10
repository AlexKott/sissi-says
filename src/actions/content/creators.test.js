import * as t from './types';
import * as actions from './creators';

describe('actions/content', () => {
  describe('setInitialContent', () => {
    it('should dispatch an action with the correct type and payload', () => {
      const action = actions.setInitialContent();

      expect(action).toHaveProperty('type', t.SET_INITIAL_CONTENT);
    });
  });

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
});
