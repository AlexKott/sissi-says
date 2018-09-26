import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { Translate } from 'react-localize-redux';

import * as actions from '@/actions';
import * as C from '@/components';
import * as selectors from '@/selectors';
import * as tr from '@/translations';

const mapStateToProps = (state, { name }) => ({
  ...selectors.getPropsForFieldList(name)(state),
});

const mapDispatchToProps = (dispatch, { fields, name }) => ({
  onAdd: () => {
    dispatch(actions.addListItem(name));
    fields.push({});
  },
  onDelete: index => {
    dispatch(actions.deleteListItem(name, index));
    fields.remove(index);
  },
});

const FieldList = ({
  canAdd,
  canDelete,
  fieldNames,
  fields,
  itemLabel,
  listLabel,
  name,
  onAdd,
  onDelete,
}) => (
  <section className='form__list'>
    <label className='form__label'>{listLabel}</label>
    {fields.map((f, index) => (
      <article key={index} className='list-item'>
        {fieldNames.map(fieldName =>
          <C.FormFieldBuilder
            key={fieldName}
            fieldName={fieldName}
            prefix={`${f}.`}
          />
        )}
        {canDelete &&
          <C.Button onClick={() => onDelete(index)}>
            <Translate id={tr.DELETE} />
          </C.Button>
        }
      </article>
    ))}
    {canAdd && (
      <article className='list-item'>
        <C.Button onClick={onAdd}>+ {itemLabel}</C.Button>
      </article>
    )}
  </section>
);

FieldList.propTypes = {
  canAdd: PropTypes.bool,
  canDelete: PropTypes.bool,
  fieldNames: PropTypes.array,
  fields: PropTypes.object,
  itemLabel: PropTypes.string,
  listLabel: PropTypes.string,
  name: PropTypes.string,
  onAdd: PropTypes.func,
  onDelete: PropTypes.func,
};

export default connect(mapStateToProps, mapDispatchToProps)(FieldList);
