import React from 'react';
import PropTypes from 'prop-types';
import { reduxForm } from 'redux-form';

import FormFieldBuilder from './FormFieldBuilder';

const Form = ({
  children,
  className = '',
  fields = [],
  onSave,
}) => (
  <form className='form'>
    {children}
    {fields.map(field => {
      const fieldName = Object.keys(field)[0];
      const fieldStructure = field[fieldName];
      return <FormFieldBuilder key={fieldName} fieldName={fieldName} fieldStructure={fieldStructure} />;
    })}
    <button onClick={onSave} className='button'>Save</button>
  </form>
);

Form.propTypes = {
  children: PropTypes.node,
  className: PropTypes.string,
  fields: PropTypes.array,
  onSave: PropTypes.func,
}

export default reduxForm({
  destroyOnUnmount: false,
})(Form);
