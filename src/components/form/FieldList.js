import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { Translate } from 'react-localize-redux';

import * as actions from '@/actions';
import * as selectors from '@/selectors';
import * as tr from '@/translations';

import FormFieldBuilder from './FormFieldBuilder';

const mapStateToProps = (state, { name }) => ({
  ...selectors.getPropsForFieldList(name)(state),
});

const mapDispatchToProps = (dispatch, { fields, name }) => ({
  onAdd: () => {
    dispatch(actions.addListItem(name));
    fields.push({});
  },
  onDelete: index => dispatch(actions.deleteListItem(name, index)),
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
          <FormFieldBuilder
            key={fieldName}
            fieldName={fieldName}
            prefix={`${f}.`}
          />
        )}
        {canDelete &&
          <button
            key={`delete-${index}`}
            type='button'
            onClick={() => onDelete(index)}
            className='button'
          >
            <Translate id={tr.DELETE} />
          </button>
        }
      </article>
    ))}
    {canAdd && (
      <article className='list-item'>
        <button
          type='button'
          onClick={onAdd}
          className='button'
        >
          + {itemLabel}
        </button>
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
