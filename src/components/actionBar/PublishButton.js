import React from 'react';
import PropTypes from 'prop-types';

const PublishButton = ({ onPublish }) => (
  <button className='button button--cta' onClick={onPublish}>Publish</button>
);

PublishButton.propTypes = {
  onPublish: PropTypes.func,
};

export default PublishButton;
