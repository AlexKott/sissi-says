import React from 'react';
import PropTypes from 'prop-types';
import { compose } from 'redux';
import { connect } from 'react-redux';
import { withLocalize, getActiveLanguage } from 'react-localize-redux';

import { ROUTE_LOGIN } from '@/router/routes';

import * as selectors from '@/reducers/selectors';

import Modal from './modal/Modal';
import Navigation from '@/components/navigation/Navigation';
import ActionBar from './actionBar/ActionBar';
import Guide from './guide/Guide';

const mapStateToProps = (state, { setActiveLanguage }) => {
  const appLanguage = selectors.getLanguage(state);
  const activeLanguage = getActiveLanguage(state.localize);
  if (appLanguage && activeLanguage.code !== appLanguage) {
    setActiveLanguage(appLanguage);
  }

  const route = state.location.type;
  const Component = state.location.routesMap[route].component;
  return {
    Component,
    route,
  };
};

const App = ({ Component, route }) => (
  <div className='app'>
    <Navigation />
    <Component />
    {route !== ROUTE_LOGIN && <ActionBar />}
    <Guide />
    <Modal />
  </div>
);

App.propTypes = {
  Component: PropTypes.func,
  route: PropTypes.string,
};

export default compose(
  withLocalize,
  connect(mapStateToProps)
)(App);
