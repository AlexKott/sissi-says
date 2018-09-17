import React from 'react';
import PropTypes from 'prop-types';
import { Droppable } from 'react-beautiful-dnd';

const NavBar = ({
  children,
  level,
  type,
}) => (
  <Droppable droppableId={type} type={type}>
    {(provided) => (
      <nav className={`nav nav--level-${level}`} ref={provided.innerRef} {...provided.droppableProps}>
        {children}
      </nav>
    )}
  </Droppable>
);

NavBar.propTypes = {
  children: PropTypes.array,
  level: PropTypes.string,
  type: PropTypes.string,
};

export default NavBar;
