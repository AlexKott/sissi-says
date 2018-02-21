import reducer, * as selectors from './sections';
import * as t from '@/actions/types';

describe('reducers/content/sections', () => {
  it('should return the initial state', () => {
    const expectedState = {};
    const state = reducer();

    expect(state).toEqual(expectedState);
  });

  it('should return the fetched sections', () => {
    const action = {
      type: t.FETCH_DATA_SUCCESS,
      payload: { dataType: 'content', data: { sections: ['section1', 'section2']}},
    };
    const expectedState = ['section1', 'section2'];
    const state = reducer(undefined, action);

    expect(state).toEqual(expectedState);
  });

  it('should add a section', () => {
    const action = {
      type: t.ADD_SECTION,
      payload: { sectionId: 'section1', section: 'testContent' },
    };
    const expectedState = { 'section1': 'testContent' };
    const state = reducer(undefined, action);

    expect(state).toEqual(expectedState);
  });

  it('should delete a section', () => {
    const mockState = {
      section1: { test: 'test' },
      section2: { test: 'test' },
      section3: { test: 'test' },
    };
    const action = {
      type: t.DELETE_SECTION,
      payload: { sectionId: 'section2' },
    };
    const expectedState = {
      section1: { test: 'test' },
      section3: { test: 'test' },
    };
    const state = reducer(mockState, action);

    expect(state).toEqual(expectedState);
  });

  it('should reset the state', () => {
    const action = {
      type: t.RESET_SESSION,
    };
    const state = reducer({ sectionData: 'test' }, action);

    expect(state).toEqual({});
  });
});

describe('selectors/content/sections', () => {
  describe('getAllSections', () => {
    it('should return all sections', () => {
      const mockState = {
        content: {
          sections: {
            section1: 'testSection1',
            section2: 'testSection2',
          }
        }
      };
      const value = selectors.getAllSections(mockState);

      expect(value).toEqual({ section1: 'testSection1', section2: 'testSection2' });
    });
  });

  describe('getSectionById', () => {
    it('should return the section with the given id', () => {
      const mockState = {
        content: {
          sections: {
            section1: 'testSection1',
            section2: 'testSection2',
          }
        }
      };
      const value = selectors.getSectionById(mockState, 'section1');

      expect(value).toBe('testSection1');
    });
  });

  describe('getInitialSectionValues', () => {
    it('should return the filtered data for the specified section', () => {
      const mockState = {
        content: {
          sections: {
            test1: { sectionType: 'test1', otherData: 'test' },
          },
        },
      };
      const value = selectors.getInitialSectionValues(mockState, 'test1');

      expect(value).toEqual({ otherData: 'test' });
    });
  });
});
