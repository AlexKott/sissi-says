import { createSelector } from 'reselect';

import * as c from '@/constants';
import * as s from '@/reducers/selectors';
import { getCurrentItemWithParent } from './item';

export const getPropsForEditor = createSelector(
  [
    getCurrentItemWithParent,
    s.getMaxAmountOfPages,
  ],
  ({ item, parent }, maxAmountOfPages) => {
    const canDelete = !item.structure.isProtected
      && parent !== null
      && parent.structure.minItems < parent.content._items.length;

    let viewLevel;
    if (item.type === c.SECTIONS && maxAmountOfPages > 1) {
      viewLevel = 3;
    } else if (item.type === c.GLOBAL) {
      viewLevel = 1;
    } else {
      viewLevel = 2;
    }

    return {
      canDelete,
      fieldNames: item.structure.fields,
      formName: item.id ? `${item.type}-${item.id}` : item.type,
      initialValues: item.content,
      viewLevel,
    };
  }
);
