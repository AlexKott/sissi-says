import React from 'react';
import PropTypes from 'prop-types';
import { Translate } from 'react-localize-redux';

import * as C from '@/components';
import * as tr from '@/translations';

const FieldListItem = ({
  canDelete,
  field,
  fieldNames,
  index,
  onDelete,
}) => (
  <article className='form__list-item'>
    {fieldNames.map(fieldName =>
      <C.FormFieldBuilder
        key={fieldName}
        fieldName={fieldName}
        prefix={`${field}.`}
      />
    )}
    {canDelete &&
      <C.Button onClick={() => onDelete(index)}>
        <Translate id={tr.DELETE} />
      </C.Button>
    }
  </article>
);

FieldListItem.propTypes = {
  canDelete: PropTypes.bool,
  field: PropTypes.string,
  fieldNames: PropTypes.array,
  index: PropTypes.number,
  onDelete: PropTypes.func,
};

export default FieldListItem;
