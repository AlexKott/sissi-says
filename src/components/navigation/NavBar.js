import React from 'react';
import PropTypes from 'prop-types';
import { NavLink } from 'redux-first-router-link';

const NavBar = ({
  selectedElement = '',
  type = '',
  elements = [],
  routeArray = [],
}) => (
  <nav className={`nav nav--${type}`}>
    {elements.map(element => (
      <NavLink
        key={element.id}
        to={[...routeArray, element.id]}
        className={`nav__element nav__element--${type}`}
        activeClassName='nav__element--selected'
      >{`New ${type}`}</NavLink>
    ))}
  </nav>
);

NavBar.propTypes = {
  selectedElement: PropTypes.string,
  type: PropTypes.string,
  elements: PropTypes.array,
  routeArray: PropTypes.array,
};

export default NavBar;
