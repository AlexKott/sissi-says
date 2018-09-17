import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { NavLink } from 'redux-first-router-link';
import { Draggable } from 'react-beautiful-dnd';

import * as selectors from '@/selectors';

const mapStateToProps = (state, ownProps) => ({
  ...selectors.getPropsForNavItem(ownProps.id, ownProps.type)(state),
});

const NavItem = ({
  id,
  index,
  linkArray,
  title,
  type,
}) => (
  <Draggable draggableId={id} type={type} index={index}>
    {(provided) => (
      <div>
        <div
          ref={provided.innerRef}
          {...provided.draggableProps}
          {...provided.dragHandleProps}
        >
          <NavLink
            to={linkArray}
            className='nav__element'
            activeClassName='nav__element--selected'
          >{title}</NavLink>
        </div>
        {provided.placeholder}
      </div>
    )}
  </Draggable>
);

NavItem.propTypes = {
  id: PropTypes.string,
  type: PropTypes.string,
};

export default connect(mapStateToProps)(NavItem);
