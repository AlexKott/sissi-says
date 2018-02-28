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
  };
};

const App = ({ Component }) => (
  <div className='app'>
    <Modal />
    <Navigation />
    <ActionBar />
    <Component />
  </div>
);

App.propTypes = {
  Component: PropTypes.func,
};

export default connect(mapStateToProps)(App);
