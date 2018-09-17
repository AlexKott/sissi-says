import React from 'react';
import PropTypes from 'prop-types';
import { NavLink } from 'redux-first-router-link';
import { Draggable } from 'react-beautiful-dnd';

const NavItem = ({
  id,
  index,
  linkArray = ['coming', 'soon'],
  title = 'coming soon',
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

export default NavItem;
