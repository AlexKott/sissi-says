import * as t from '@/actions/types';
import { getFieldByName } from './fields';

const initialState = {};

export default (state = initialState, action = {}) => {
  const { type, payload } = action;

  if (type === t.FETCH_DATA_SUCCESS && payload.dataType === 'structure') {
    return payload.data.meta;

  } else if (type === t.RESET_SESSION) {
    return initialState;
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
