import _testState from '@/reducers/_testState';

import * as selectors from './fields';

describe('selectors/form', () => {
  const mockState = _testState;

  describe('getFieldWithName', () => {
    it('should return the field with an added "name" parameter', () => {
      const result = selectors.getFieldWithName('title')(mockState);

      expect(result).toHaveProperty('name', 'title');
      expect(result).toHaveProperty('placeholder', 'Your title');
    });
  });

  describe('getFieldsForPageType', () => {
    it('should return an array of field objects for the given page type', () => {
      const value = selectors.getFieldsForPageType('standard')(mockState);

      expect(value.length).toBe(2);
      expect(value[0]).toHaveProperty('_name', 'title');
      expect(value[1]).toHaveProperty('_name', 'path');
    });
  });

  describe('getFieldsForSectionType', () => {
    it('should return an array of field objects for the given section type', () => {
      const value = selectors.getFieldsForSectionType('photo')(mockState);

      expect(value.length).toBe(1);
      expect(value[0]).toHaveProperty('_name', 'image');
    });
  });
});
