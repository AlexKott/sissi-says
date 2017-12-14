import { getFieldByName } from './fields';

// Mock data: makes test fail
const initialState = {
  fields: ['metaTitle', 'metaDescription'],
};

export default (state = initialState, action = {}) => {
  return state;
}

export function getMetaFieldNames(state) {
  return state.structure.meta.fields;
}

export function getMetaFields(state, selectFieldByName = getFieldByName) {
  const fieldNames = getMetaFieldNames(state);
  return fieldNames.map(fieldName => selectFieldByName(state, fieldName));
}
