import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';

const mapDispatchToProps = (dispatch) => ({
  onPublish: () => {
    // TODO: insert actions from other branch
  },
});

const PublishButton = ({ onPublish }) => (
  <button className='button button--cta' onClick={onPublish}>Publish</button>
);

PublishButton.propTypes = {
  onPublish: PropTypes.func,
};

export default connect(null, mapDispatchToProps)(PublishButton);
