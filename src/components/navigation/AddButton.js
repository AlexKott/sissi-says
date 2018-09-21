import React from 'react';
import PropTypes from 'prop-types';
import { Translate } from 'react-localize-redux';

import * as tr from '@/translations';

const AddButton = ({ onClick }) => (
  <button
    onClick={onClick}
    className='button button--nav'
  >
    <Translate id={tr.ADD} />
  </button>
);

AddButton.propTypes = {
  onClick: PropTypes.func,
};

export default AddButton;
