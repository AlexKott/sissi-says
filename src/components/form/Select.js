import React from 'react';
import PropTypes from 'prop-types';

const Select = ({
  className = '',
  options = [],
  input = {},
}) => (
  <select {...input} className={className}>
    {options.map(option => (
      <option key={option.key} value={option.key}>{option.label}</option>
    ))}
  </select>
);

Select.propTypes = {
 options: PropTypes.array,
 input: PropTypes.object,
};

export default Select;
