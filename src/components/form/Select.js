import React from 'react';
import PropTypes from 'prop-types';

const Select = ({
  options = [],
  input = {},
}) => (
  <select {...input}>
    {options.map(option => (
      <option key={Math.random().toString(36).substring(2, 9)} value={option.key}>{option.label}</option>
    ))}
  </select>
);

Select.propTypes = {
 options: PropTypes.array,
 input: PropTypes.object,
};

export default Select;
