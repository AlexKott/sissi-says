import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { Field } from 'redux-form';

import Select from './Select';

const mapStateToProps = (state, { fieldStructure = {} }) => {
  let component;
  let type = '';
  let options = [];
  let fieldClassName = '';

  switch(fieldStructure.type) {
    case 'string':
      component = 'input';
      type = 'text';
      break;

    case 'password':
      component = 'input';
      type = 'password';
      break;

    case 'text':
      component = 'textarea';
      fieldClassName = 'form__field--textarea';
      break;

    case 'choice':
      component = Select;
      options = fieldStructure.choices;
      break;

    default:
      component = 'input';
      type = 'text';
  }

  return {
    fieldProps: { component, type, options },
    fieldClassName,
  };
};

const FormFieldBuilder = ({
  fieldName = '',
  fieldClassName = '',
  fieldStructure = {},
  fieldProps = {},
}) => (
  <label className='form__element'>
    <span className='form__label'>{fieldStructure.label}:</span>
    <Field
      name={fieldName}
      className={`form__field ${fieldClassName}`}
      {...fieldProps}
    />
  </label>
);

FormFieldBuilder.propTypes = {
  fieldName: PropTypes.string,
  fieldClassName: PropTypes.string,
  fieldStructure: PropTypes.object,
  fieldProps: PropTypes.object,
};

export default connect(mapStateToProps)(FormFieldBuilder);
