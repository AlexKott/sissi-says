import { createSelector } from 'reselect';

import { getCurrentItemWithParent } from './item';
import { getCurrentViewLevel } from './location';

export const getPropsForEditor = createSelector(
  [
    getCurrentItemWithParent,
    getCurrentViewLevel,
  ],
  ({ item, parent }, viewLevel) => {
    const canDelete = !item.structure.isProtected
      && parent !== null
      && parent.structure.minItems < parent.content._items.length;

    return {
      canDelete,
      fieldNames: item.structure.fields,
      formName: item.id ? `${item.type}-${item.id}` : item.type,
      initialValues: item.content,
      viewLevel,
    };
  }
);
