import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { Translate } from 'react-localize-redux';

import * as actions from '@/actions';
import * as tr from '@/translations';

const mapDispatchToProps = (dispatch) => ({
  onPublish: () => dispatch(actions.buildPage()),
});

const PublishButton = ({ onPublish }) => (
  <button className='button button--cta' onClick={onPublish}><Translate id={tr.PUBLISH} /></button>
);

PublishButton.propTypes = {
  onPublish: PropTypes.func,
};

export default connect(null, mapDispatchToProps)(PublishButton);
