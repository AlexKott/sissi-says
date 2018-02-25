import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { NavLink } from 'redux-first-router-link';

import * as selectors from '@/reducers/selectors';
import * as actions from '@/actions/creators';

function getNavLink(selectedElement, elementId, routeArray) {
  if (selectedElement === elementId) {
    const shortArray = routeArray.slice(0, -1);
    return shortArray;
  } else {
    return [...routeArray, elementId];
  }
}

const mapStateToProps = (state, ownProps) => {
  let canAdd = true;

  if (ownProps.type === 'page') {
    canAdd = selectors.getCanAddPage(state);
  } else if (ownProps.type === 'section') {
    const pageId = ownProps.routeArray[1];
    canAdd = selectors.getCanAddSection(state, pageId);
  }

  return {
    canAdd,
  };
}

const mapDispatchToProps = (dispatch, ownProps) => {
  let onAdd;

  if (ownProps.type === 'page') {
    onAdd = () => dispatch(actions.addPage());
  } else if (ownProps.type === 'section') {
    const pageId = ownProps.routeArray[1];
    onAdd = () => dispatch(actions.addSection(pageId));
  }

  return {
    onAdd,
  };
}

const NavBar = ({
  canAdd,
  selectedElement = '',
  type = '',
  elements = [],
  routeArray = [],
  onAdd,
}) => (
  <nav className={`nav nav--${type}`}>
    {elements.map(element => (
      <NavLink
        key={element.id}
        to={getNavLink(selectedElement, element.id, routeArray)}
        className={`nav__element nav__element--${type}`}
        activeClassName='nav__element--selected'
      >{element.title ? element.title : `New ${type}`}</NavLink>
    ))}
    {canAdd && <button
        onClick={onAdd}
        className={`nav__element button__nav button__nav--${type}`}
    >Add</button>}
  </nav>
);

NavBar.propTypes = {
  canAdd: PropTypes.bool,
  selectedElement: PropTypes.string,
  type: PropTypes.string,
  elements: PropTypes.array,
  routeArray: PropTypes.array,
  onAdd: PropTypes.func,
};

export default connect(mapStateToProps, mapDispatchToProps)(NavBar);
