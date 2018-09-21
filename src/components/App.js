import React from 'react';
import PropTypes from 'prop-types';
import { compose } from 'redux';
import { connect } from 'react-redux';
import { withLocalize, getActiveLanguage } from 'react-localize-redux';

import * as selectors from '@/selectors';
import { ROUTE_LOGIN } from '@/router';

import ActionBar from './actionBar/ActionBar';
import Alert from './Alert';
import Editor from './editor/Editor';
import Guide from './guide/Guide';
import Login from './login/Login';
import Navigation from '@/components/navigation/Navigation';

const mapStateToProps = (state, { setActiveLanguage }) => {
  const settingsLanguage = selectors.getSettingsLanguage(state);
  const activeLanguage = getActiveLanguage(state.localize);
  if (settingsLanguage && activeLanguage && activeLanguage.code !== settingsLanguage) {
    setActiveLanguage(settingsLanguage);
  }

  return {
    route: selectors.getCurrentRoute(state),
  };
};

const App = ({ route }) => (
  <div className='app'>
    {route === ROUTE_LOGIN
      ? <Login />
      : [
          <Navigation key='navigation' />,
          <Editor key='editor' />,
          <ActionBar key='actionbar' />,
          <Guide key='guide' />,
        ]
    }
    <Alert />
  </div>
);

App.propTypes = {
  route: PropTypes.string,
};

export default compose(
  withLocalize,
  connect(mapStateToProps)
)(App);
