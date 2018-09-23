import * as t from './types';
import * as k from '@/constants/keywords';
import * as actions from './creators';

describe('actions/content', () => {
  describe('addPage', () => {
    it('should return an action with the correct type and payload', () => {
      const action = actions.addPage('testType');

      expect(action).toHaveProperty('type', t.ADD_PAGE);
      expect(action.payload).toHaveProperty('pageType', 'testType');
    });
  });

  describe('addSection', () => {
    it('should return an action with the correct type and payload', () => {
      const action = actions.addSection('testPage', 'testType');

      expect(action).toHaveProperty('type', t.ADD_SECTION);
      expect(action.payload).toHaveProperty('pageId', 'testPage');
      expect(action.payload).toHaveProperty('sectionType', 'testType');
    });
  });

  describe('addListItem', () => {
    it('should return an action with the correct type and payload', () => {
      const action = actions.addListItem('listAbc');

      expect(action).toHaveProperty('type', t.ADD_LIST_ITEM);
      expect(action.payload).toHaveProperty('listName', 'listAbc');
    });
  });

  describe('deletePage', () => {
    it('should return an action with the correct type and payload', () => {
      const action = actions.deletePage('testPage');

      expect(action).toHaveProperty('type', t.DELETE_PAGE);
      expect(action.payload).toHaveProperty('pageId', 'testPage');
    });
  });

  describe('deleteSection', () => {
    it('should return an action with the correct type and payload', () => {
      const action = actions.deleteSection('testPage', 'testSection');

      expect(action).toHaveProperty('type', t.DELETE_SECTION);
      expect(action.payload).toHaveProperty('pageId', 'testPage');
      expect(action.payload).toHaveProperty('sectionId', 'testSection');
    });
  });

  describe('deleteListItem', () => {
    it('should return an action with the correct type and payload', () => {
      const action = actions.deleteListItem('listAbc', 4);

      expect(action).toHaveProperty('type', t.DELETE_LIST_ITEM);
      expect(action.payload).toHaveProperty('listName', 'listAbc');
      expect(action.payload).toHaveProperty('itemIndex', 4);
    });
  });

  describe('dragItem', () => {
    it('should dispatch an action with the correct type and payload', () => {
      const action = actions.dragItem(k.SECTIONS, 3, 2, 'abc123');

      expect(action).toHaveProperty('type', t.DRAG_ITEM);
      expect(action.payload).toHaveProperty('itemType', k.SECTIONS);
      expect(action.payload).toHaveProperty('from', 3);
      expect(action.payload).toHaveProperty('to', 2);
      expect(action.payload).toHaveProperty('pageId', 'abc123');
    });
  });
});
