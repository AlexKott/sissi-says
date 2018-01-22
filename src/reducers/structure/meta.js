import * as t from '@/actions/types';
import { getFieldByName } from './fields';

export default (state = {}, action = {}) => {
  const { type, payload } = action;

  if (type === t.FETCH_DATA_SUCCESS && payload.dataType === 'structure') {
    return payload.data.meta;
  }

  return state;
}

export function getMetaFieldNames(state) {
  return state.structure.meta.fields || [];
}

export function getMetaFields(state, selectFieldByName = getFieldByName) {
  const fieldNames = getMetaFieldNames(state);
  return fieldNames.map(fieldName => selectFieldByName(state, fieldName));
}
