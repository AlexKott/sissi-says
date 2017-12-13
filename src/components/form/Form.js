import React from 'react';
import { reduxForm } from 'redux-form';

import FormFieldBuilder from '../form/FormFieldBuilder';

const Form = ({ className, children, fields }) => (
  <form className={className}>
    {children}
    {fields.map(field => {
      const fieldName = Object.keys(field)[0];
      const fieldStructure = field[fieldName];
      return (<FormFieldBuilder key={fieldName} fieldName={fieldName} fieldStructure={fieldStructure} />)
    })}
  </form>
);

export default reduxForm({
  destroyOnUnmount: false,
})(Form);
