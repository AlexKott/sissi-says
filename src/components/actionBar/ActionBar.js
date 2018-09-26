import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { Translate } from 'react-localize-redux';

import * as selectors from '@/selectors';
import * as tr from '@/translations';
import { ROUTE_INDEX } from '@/router';

import GuideButton from './GuideButton';
import LogoutButton from './LogoutButton';
import PublishButton from './PublishButton';

const mapStateToProps = state => ({
  isIndex: selectors.getCurrentRoute(state) === ROUTE_INDEX,
});

const ActionBar = ({ isIndex }) => (
  <aside className='action-bar'>
    <PublishButton />
    <LogoutButton />
    {isIndex && (
      <p className='guide__teaser'>
        <span className='guide__teaser-rotator'><Translate id={tr.GUIDE_TEASER} /></span>
      </p>
    )}
    <GuideButton />
  </aside>
);

ActionBar.propTypes = {
  isIndex: PropTypes.bool,
};

export default connect(mapStateToProps)(ActionBar);
