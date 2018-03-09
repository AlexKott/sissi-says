import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';

import { ROUTE_LOGIN } from '@/router/routes';

import Modal from './modal/Modal';
import Navigation from '@/components/navigation/Navigation';
import ActionBar from './actionBar/ActionBar';
import Guide from './guide/Guide';

const mapStateToProps = (state) => {
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

export default connect(mapStateToProps)(App);
