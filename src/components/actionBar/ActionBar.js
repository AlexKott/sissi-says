import React from 'react';
import PropTypes from 'prop-types';
import { NavLink } from 'redux-first-router-link';

import { ROUTE_INDEX } from '@/router/routes';

import LogoutButton from './LogoutButton';
import PublishButton from './PublishButton';

const ActionBar = ({ route }) => (
  <div className='action-bar'>
    <PublishButton />
    <LogoutButton />
    <NavLink
      to={{ type: ROUTE_INDEX }}
      className='button'
      activeClassName='hidden'
      exact={true}
    >Index</NavLink>
  </div>
);

ActionBar.propTypes = {
  route: PropTypes.string,
};

export default ActionBar;
