import React from 'react';
import PropTypes from 'prop-types';

import { ROUTE_INDEX } from '@/router/routes';

import LogoutButton from './LogoutButton';
import MainButton from './MainButton';
import PublishButton from './PublishButton';

const ActionBar = ({ route }) => (
  <div className='action-bar'>
    <PublishButton />
    <LogoutButton />
    {route !== ROUTE_INDEX && <MainButton />}
  </div>
);

ActionBar.propTypes = {
  route: PropTypes.string,
};

export default ActionBar;
