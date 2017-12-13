import React from 'react';
import PropTypes from 'prop-types';
import { reduxForm } from 'redux-form';

import FormFieldBuilder from './FormFieldBuilder';

const Form = ({
  children,
  className = '',
  fields = [],
}) => (
  <form className={className}>
    {children}
    {fields.map(field => {
      const fieldName = Object.keys(field)[0];
      const fieldStructure = field[fieldName];
      return <FormFieldBuilder key={fieldName} fieldName={fieldName} fieldStructure={fieldStructure} />;
    })}
  </form>
);

Form.propTypes = {
  children: PropTypes.node,
  className: PropTypes.string,
  fields: PropTypes.array,
}

export default reduxForm({
  destroyOnUnmount: false,
})(Form);
