import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';

import * as actions from '@/actions';
import * as selectors from '@/selectors';

import FormFieldBuilder from './FormFieldBuilder';

const mapStateToProps = (state, { name }) => ({
  ...selectors.getFieldListProps(name)(state),
});

const mapDispatchToProps = (dispatch, { fields, name }) => ({
  onAddItem: () => {
    dispatch(actions.addListItem(name));
    fields.push({});
  },
  onDeleteItem: index => dispatch(actions.deleteListItem(name, index)),
});

const FieldList = ({ fieldNames, fields, name }) => (
  <section className='form__list'>
    <label className='form__label'>{name}</label>
    {fields.map((f, index) => (
      <article key={index} className='list-item'>
        {fieldNames.map(fieldName => (<FormFieldBuilder
          key={fieldName}
          fieldName={fieldName}
          prefix={`${f}.`}
        />))}
      </article>
    ))}
  </section>
);

FieldList.propTypes = {
  canAdd: PropTypes.bool,
  canDelete: PropTypes.bool,
  fieldNames: PropTypes.array,
  fields: PropTypes.object,
  name: PropTypes.string,
  onAddItem: PropTypes.func,
  onDeleteItem: PropTypes.func,
};

export default connect(mapStateToProps, mapDispatchToProps)(FieldList);
