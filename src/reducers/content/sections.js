import _merge from 'lodash.merge';

import * as t from '@/actions/types';

const initialState = {};

export default (state = initialState, action = {}) => {
  const { type, payload } = action;

  switch(type) {
    case t.SEND_REQUEST:
      if (payload.dataType === 'content') {
        return payload.responseData.sections || initialState;
      }
      return state;

    case t.ADD_SECTION:
      return {
        ...state,
        [payload.section._id]: payload.section,
      };

    case t.DELETE_SECTION:
      const { [payload.sectionId]: sectionToDelete, ...newState } = state;
      return newState;

    case t.ADD_LIST_ITEM:
      return _merge({}, state, {
        [payload.sectionId]: {
          [payload.listName]: [payload.listItem],
        },
      });

    case t.DELETE_LIST_ITEM:
      return {
        ...state,
        [payload.sectionId]: {
          ...state[payload.sectionId],
          [payload.listName]: state[payload.sectionId][payload.listName]
            .filter((i, index) => index !== payload.itemIndex),
        },
      };

    case t.RESET_SESSION:
      return initialState;

    default:
      return state;
  }
};

export const getContentSections = state => state.content.sections || {};
