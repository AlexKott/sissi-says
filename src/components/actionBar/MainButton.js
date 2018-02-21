import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';

import * as actions from '@/actions/creators';

const mapDispatchToProps = (dispatch) => ({
  onNavigate: () => {
    dispatch(actions.redirectToIndex());
  },
});

const MainButton = ({ onNavigate }) => (
  <button className='button' onClick={onNavigate}>Home</button>
);

MainButton.propTypes = {
  onNavigate: PropTypes.func,
};

export default connect(null, mapDispatchToProps)(MainButton);
