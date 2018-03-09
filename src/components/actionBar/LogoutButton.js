import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';

import * as actions from '@/actions/creators';

const mapDispatchToProps = (dispatch) => ({
  onLogout: () => {
    dispatch(actions.resetSession());
    dispatch(actions.redirectToLogin());
  },
});

const LogoutButton = ({ onLogout }) => (
  <button className='button' onClick={onLogout}>Logout</button>
);

LogoutButton.propTypes = {
  onLogout: PropTypes.func,
};

export default connect(null, mapDispatchToProps)(LogoutButton);
