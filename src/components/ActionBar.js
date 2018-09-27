import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { Translate } from 'react-localize-redux';

import * as actions from '@/actions';
import * as C from '@/components';
import * as selectors from '@/selectors';
import * as tr from '@/translations';
import { ROUTE_INDEX } from '@/router';

const mapStateToProps = state => ({
  isIndex: selectors.getCurrentRoute(state) === ROUTE_INDEX,
});

const mapDispatchToProps = dispatch => ({
  onLogout: () => {
    dispatch(actions.resetSession());
    dispatch(actions.redirectToLogin());
  },
  onPublish: () => dispatch(actions.buildPage()),
});

const ActionBar = ({
  isIndex,
  onLogout,
  onPublish,
}) => (
  <aside className='action-bar'>
    <C.Button classes='button--cta' onClick={onPublish} >
      <Translate id={tr.PUBLISH} />
    </C.Button>

    <C.Button onClick={onLogout}>
      <Translate id={tr.LOGOUT} />
    </C.Button>

    {isIndex && (
      <p className='guide__teaser'>
        <span className='guide__teaser-rotator'><Translate id={tr.GUIDE_TEASER} /></span>
      </p>
    )}
    <C.GuideButton />
  </aside>
);

ActionBar.propTypes = {
  isIndex: PropTypes.bool,
  onLogout: PropTypes.func,
  onPublish: PropTypes.func,
};

export default connect(mapStateToProps, mapDispatchToProps)(ActionBar);
