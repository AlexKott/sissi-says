import * as t from '@/actions/types';
import { getFieldByName } from './fields';

// Mock data: makes test fail
const initialState = {
  fields: ['metaTitle', 'metaDescription'],
};

export default (state = initialState, action = {}) => {
  const { type, payload } = action;

  if (type === t.FETCH_DATA_SUCCESS && payload.type === 'structure') {
    return payload.data.meta;
  }

  return state;
}

export function getMetaFieldNames(state) {
  return state.structure.meta.fields;
}

export function getMetaFields(state, selectFieldByName = getFieldByName) {
  const fieldNames = getMetaFieldNames(state);
  return fieldNames.map(fieldName => selectFieldByName(state, fieldName));
}
