import * as t from '@/actions/types';
import * as k from '@/constants/keywords';

const initialState = {};

export default (state = initialState, action = {}) => {
  const { type, payload } = action;

  if (type === t.SEND_REQUEST && payload.dataType === k.STRUCTURE) {
    return payload.responseData.fields;

  } else if (type === t.RESET_SESSION) {
    return initialState;
  }

  return state;
}

export function getFieldByName(state, fieldName) {
  const field = state.structure.fields[fieldName] || {};
  return { [fieldName]: field };
}

export function getListFieldNames(state, listName) {
  return state.structure.fields[listName].fields;
}

export function getMaxListItems(state, listName) {
  return state.structure.fields[listName].maxItems;
}

export function getMinListItems(state, listName) {
  return state.structure.fields[listName].minItems;
}

export const getFields = state => state.structure.fields;
