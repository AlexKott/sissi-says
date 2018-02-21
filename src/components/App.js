import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';

import Modal from './modal/Modal';
import Navigation from '@/components/navigation/Navigation';
import ActionBar from './actionBar/ActionBar';

const mapStateToProps = (state) => {
  const route = state.location.type;
  const Component = state.location.routesMap[route].component;
  return {
    Component,
    route
  };
};

const App = ({ Component, route }) => (
  <div className='app'>
    <Modal />
    <Navigation />
    <ActionBar route={route} />
    <Component />
  </div>
);

App.propTypes = {
  Component: PropTypes.func,
  route: PropTypes.string,
};

export default connect(mapStateToProps)(App);
