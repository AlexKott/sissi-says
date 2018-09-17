import React from 'react';
import PropTypes from 'prop-types';
import { Translate } from 'react-localize-redux';

import * as tr from '@/translations';

const AddButton = ({ onAdd }) => (
  <button
    onClick={onAdd}
    className='button button--nav'
  >
    <Translate id={tr.ADD} />
  </button>
);

AddButton.propTypes = {
  onAdd: PropTypes.func,
};

export default AddButton;
