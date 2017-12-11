import React from 'react';
import { connect } from 'react-redux';
import { redirect } from 'redux-first-router';

import * as selectors from '../../reducers/selectors';
import * as routes from '../../router/routes';

const mapStateToProps = (state, ownProps) => {
  let elements = [];
  let selectedElement = '';

  if (ownProps.type === 'page') {
    elements = selectors.getAllPages(state);
    selectedElement = ownProps.selectedPage;
  } else if (ownProps.type === 'section') {
    elements = selectors.getSectionsForPage(state, ownProps.selectedPage);
    selectedElement = ownProps.selectedSection;
  }
  return {
    elements,
    selectedElement,
  };
};

const mapDispatchToProps = (dispatch, ownProps) => {
  let onSelectElement;

  if (ownProps.type === 'page') {
    onSelectElement =
      (elementId) => dispatch(redirect({ type: routes.ROUTE_PAGE, payload: { pageId: elementId }}));
  } else if (ownProps.type === 'section') {
    onSelectElement =
      (elementId) => dispatch(redirect({ type: routes.ROUTE_SECTION, payload: { sectionId: elementId }}));
  }

  return {
    onSelectElement,
  };
};

const NavBar = ({
  type,
  selectedElement,
  elements,
  onSelectElement,
}) => (
  <nav>
    {elements.map(element => (
      <button
        key={element.id}
        onClick={() => onSelectElement(element.id)}
      >{element.title || `new ${type}`}</button>
    ))}
  </nav>
);

export default connect(mapStateToProps, mapDispatchToProps)(NavBar);
