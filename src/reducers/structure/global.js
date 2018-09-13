import * as t from '@/actions/types';
import { getFieldByName } from './fields';

const initialState = {};

export default (state = initialState, action = {}) => {
  const { type, payload } = action;

  if (type === t.FETCH_DATA_SUCCESS && payload.dataType === 'structure') {
    return payload.data.global;

  } else if (type === t.RESET_SESSION) {
    return initialState;
  }

  return state;
}

export function getGlobalFieldNames(state) {
  return state.structure.global.fields || [];
}

export function getGlobalFields(state, selectFieldByName = getFieldByName) {
  const fieldNames = getGlobalFieldNames(state);
  return fieldNames.map(fieldName => selectFieldByName(state, fieldName));
}

export const getMaxAmountOfPages = state => state.structure.global.maxItems;
export const getMinAmountOfPages = state => state.structure.global.minItems;
