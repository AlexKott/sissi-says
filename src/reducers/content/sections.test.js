import reducer, * as selectors from './sections';
import * as t from '../../actions/types';

describe('reducers/content/sections', () => {
  it('should return the initial state', () => {
    const expectedState = {};
    const state = reducer();

    expect(state).toEqual(expectedState);
  });

  it('should add a section', () => {
    const action = { type: t.ADD_SECTION, payload: { sectionId: 'section1', section: 'testContent' }};
    const expectedState = { 'section1': 'testContent' };
    const state = reducer(null, action);

    expect(state).toEqual(expectedState);
  });
});

describe('selectors/content/sections', () => {
  describe('getSectionById', () => {
    it('should return the section with the given id', () => {
      const mockState = { content: { sections: { section1: 'testSection1', section2: 'testSection2' }}};
      const value = selectors.getSectionById(mockState, 'section1');

      expect(value).toBe('testSection1');
    });
  });
});
