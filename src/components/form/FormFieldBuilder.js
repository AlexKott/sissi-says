import React from 'react';
import { connect } from 'react-redux';
import { Field } from 'redux-form';

const mapStateToProps = (state, ownProps) => {
  let component;
  let type;
  let options;

  switch(ownProps.fieldStructure.type) {
    case 'string':
      component = 'input';
      type = 'text';
      break;

    case 'text':
      component = 'textarea';
      break;

    case 'choice':
      component = 'select';
      options = ownProps.fieldStructure.choices;
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
  fieldName,
  fieldStructure,
  fieldProps,
}) => (
  <label>
    {fieldStructure.label}:
    <Field
      name={fieldName}
      {...fieldProps}
    />
  </label>
);

export default connect(mapStateToProps)(FormFieldBuilder);
