import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { destroy } from 'redux-form';

import * as actions from '@/actions/creators';

const mapDispatchToProps = (dispatch) => ({
  onLogout: () => {
    dispatch(actions.resetSession());
    dispatch(actions.redirectToLogin());
    dispatch(destroy('login'));
  },
});

const LogoutButton = ({ onLogout }) => (
  <button className='button button--logout' onClick={onLogout}>Logout</button>
);

LogoutButton.propTypes = {
  onLogout: PropTypes.func,
};

export default connect(null, mapDispatchToProps)(LogoutButton);
