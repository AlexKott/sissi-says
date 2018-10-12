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
  onAdd,
  onDelete,
}) => (
  <section className='form__element'>
    <label className='form__label'>{listLabel}</label>
    {fields.map((field, index) => (
      <C.FieldListItem
        canDelete={canDelete}
        field={field}
        fieldNames={fieldNames}
        index={index}
        key={index}
        onDelete={onDelete}
      />
    ))}
    {canAdd && (
      <article className='form__list-item'>
        <C.Button onClick={onAdd}><Translate id={tr.ADD_DATA} data={{ data: itemLabel }} /></C.Button>
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
  onAdd: PropTypes.func,
  onDelete: PropTypes.func,
};

export default connect(mapStateToProps, mapDispatchToProps)(FieldList);
