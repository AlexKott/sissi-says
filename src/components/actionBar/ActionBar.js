import React from 'react';
import { NavLink } from 'redux-first-router-link';
import { Translate } from 'react-localize-redux';

import * as tr from '@/translations';
import { ROUTE_INDEX } from '@/router';

import GuideButton from './GuideButton';
import LogoutButton from './LogoutButton';
import PublishButton from './PublishButton';

const ActionBar = () => (
  <aside className='action-bar'>
    <PublishButton />
    <LogoutButton />
    <NavLink
      to={{ type: ROUTE_INDEX }}
      className='button'
      activeClassName='hidden'
      exact={true}
    ><Translate id={tr.INDEX} /></NavLink>
    {/* TODO: show teaser only on index */}
    <p className='guide__teaser'>
      <span className='guide__teaser-rotator'><Translate id={tr.GUIDE_TEASER} /></span>
    </p>
    <GuideButton />
  </aside>
);

export default ActionBar;
