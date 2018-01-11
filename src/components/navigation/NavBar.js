import React from 'react';
import PropTypes from 'prop-types';
import { NavLink } from 'redux-first-router-link';

function getNavLink(selectedElement, elementId, routeArray) {
  if (selectedElement === elementId) {
    const shortArray = routeArray.slice(0, -1);
    return [...shortArray];
  } else {
    return [...routeArray, elementId];
  }
}

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
        to={getNavLink(selectedElement, element.id, routeArray)}
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
