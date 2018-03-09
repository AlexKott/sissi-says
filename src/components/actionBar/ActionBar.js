import React from 'react';
import PropTypes from 'prop-types';
import { NavLink } from 'redux-first-router-link';

import { ROUTE_INDEX } from '@/router/routes';

import GuideButton from './GuideButton';
import LogoutButton from './LogoutButton';
import PublishButton from './PublishButton';

const ActionBar = ({ onBuild }) => (
  <aside className='action-bar'>
    <PublishButton onPublish={onBuild} />
    <LogoutButton />
    <NavLink
      to={{ type: ROUTE_INDEX }}
      className='button'
      activeClassName='hidden'
      exact={true}
    >Index</NavLink>
    <GuideButton />
  </aside>
);

ActionBar.propTypes = {
  onBuild: PropTypes.func,
};

export default ActionBar;
