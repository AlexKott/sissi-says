import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { Field } from 'redux-form';

import Select from './Select';

const mapStateToProps = (state, { fieldStructure = {} }) => {
  let component;
  let type = '';
  let options = [];

  switch(fieldStructure.type) {
    case 'string':
      component = 'input';
      type = 'text';
      break;

    case 'text':
      component = 'textarea';
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
  };
};

const FormFieldBuilder = ({
  fieldName = '',
  fieldStructure = {},
  fieldProps = {},
}) => (
  <label>
    {fieldStructure.label}:
    <Field
      name={fieldName}
      {...fieldProps}
    />
  </label>
);

FormFieldBuilder.propTypes = {
  fieldName: PropTypes.string,
  fieldStructure: PropTypes.object,
  fieldProps: PropTypes.object,
};

export default connect(mapStateToProps)(FormFieldBuilder);
